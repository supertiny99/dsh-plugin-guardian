/**
 * dsh-plugin-guardian · Host 侧入口 (index.js)
 *
 * 职责：
 * 1. 注入 webServer 注册 /plugin-guardian/* 路由（带全局 safeJson / 异常捕获）
 * 2. 启动时执行健康自动快照与应急脚本就绪
 * 3. 响应前端关于状态、快照、恢复、配置挽回、脚本导出、诊断报告等请求
 */

import {
	resolveProfileDir,
	getGuardianStatus,
	readProfileManifest,
	createSnapshot,
	listSnapshots,
	deleteSnapshot,
	cleanOldSnapshots,
	restoreBundles,
	toggleBundleState,
	restorePatch,
	generateOfflineScript,
} from './guardian-core.js';
import { getEnrichedCatalog } from './catalog.js';
import { chooseLocalTgzFile, executePluginInstall, executePluginUninstall } from './installer-core.js';
import { checkPackagesUpdates } from './version-service.js';
import { generateDiagnosticReport } from './services/diagnostic-service.js';
import { safeJson } from './utils/safe-route.js';
import { globalActionMutex } from './utils/mutex.js';
import path from 'node:path';
import os from 'node:os';
import { exec } from 'node:child_process';

function parseBody(req) {
	return new Promise((resolve) => {
		const chunks = [];
		req.on('data', (c) => chunks.push(c));
		req.on('end', () => {
			if (chunks.length === 0) return resolve({});
			try {
				const str = Buffer.concat(chunks).toString('utf8');
				resolve(JSON.parse(str));
			} catch {
				resolve({});
			}
		});
		req.on('error', () => resolve({}));
	});
}

export function apply(ctx, config) {
	const profileDir = resolveProfileDir(config?.profileDir);

	// 启动时在后台静默建立/更新一份启动快照，并保证脱机脚本就绪
	try {
		createSnapshot(profileDir, 'startup_auto');
		generateOfflineScript(profileDir);
	} catch (e) {
		console.warn('[plugin-guardian] startup auto snapshot error:', e.message);
	}

	ctx.inject(['webServer'], (scopeCtx) => {
		scopeCtx.effect?.(() =>
			scopeCtx.webServer.register({
				kind: 'prefix',
				path: '/plugin-guardian',
				handler: async (req, res) => {
					try {
						const url = new URL(req.url, 'http://127.0.0.1');
						const pathname = url.pathname.replace(/^\/plugin-guardian/, '') || '/';

						// 1. 获取管家整体状态与事故检测
						if (pathname === '/status' && req.method === 'GET') {
							const status = getGuardianStatus(profileDir);
							return safeJson(res, 200, { ok: true, ...status });
						}

						// 2. 手动创建快照
						if (pathname === '/snapshot' && req.method === 'POST') {
							const body = await parseBody(req);
							const snap = await globalActionMutex.runExclusive('create-snapshot', async () => {
								return createSnapshot(profileDir, body.reason || 'manual');
							});
							return safeJson(res, 200, { ok: true, snapshot: snap });
						}

						// 3. 列出所有快照
						if (pathname === '/snapshots' && req.method === 'GET') {
							const result = listSnapshots(profileDir);
							return safeJson(res, 200, { ok: true, ...result });
						}

						// 3.1 删除单个快照
						if (pathname === '/delete-snapshot' && req.method === 'POST') {
							const body = await parseBody(req);
							if (!body.id) {
								return safeJson(res, 200, { ok: false, error: 'Snapshot id is required' });
							}
							const result = await globalActionMutex.runExclusive('delete-snapshot', async () => {
								return deleteSnapshot(profileDir, body.id);
							});
							return safeJson(res, 200, result);
						}

						// 3.2 一键清理多余旧快照（保留最新 N 份）
						if (pathname === '/clean-snapshots' && req.method === 'POST') {
							const body = await parseBody(req);
							const result = await globalActionMutex.runExclusive('clean-snapshots', async () => {
								return cleanOldSnapshots(profileDir, body.keepCount || 2);
							});
							return safeJson(res, 200, result);
						}

						// 4. 执行插件恢复（带排他锁）
						if (pathname === '/restore' && req.method === 'POST') {
							const body = await parseBody(req);
							const selected = body.bundles;
							if (!Array.isArray(selected)) {
								return safeJson(res, 200, { ok: false, error: 'bundles array is required' });
							}
							const result = await globalActionMutex.runExclusive('restore-bundles', async () => {
								return restoreBundles(profileDir, selected, !!body.restorePatch);
							});
							return safeJson(res, 200, result);
						}

						// 4.1 手动启用或停用单个插件
						if (pathname === '/toggle-bundle' && req.method === 'POST') {
							const body = await parseBody(req);
							if (!body.bundle) {
								return safeJson(res, 200, { ok: false, error: 'bundle is required' });
							}
							const result = await globalActionMutex.runExclusive(`toggle-bundle:${body.bundle}`, async () => {
								return toggleBundleState(profileDir, body.bundle, !!body.enabled);
							});
							return safeJson(res, 200, result);
						}

						// 5. 挽回 patch.bak 配置
						if (pathname === '/restore-patch' && req.method === 'POST') {
							const body = await parseBody(req);
							const status = getGuardianStatus(profileDir);
							const targetBak = body.fileName || status.bakFiles?.[0]?.fileName;
							if (!targetBak) {
								return safeJson(res, 200, { ok: false, error: 'No bak file found to restore' });
							}
							const result = await globalActionMutex.runExclusive('restore-patch', async () => {
								return restorePatch(profileDir, targetBak);
							});
							return safeJson(res, 200, result);
						}

						// 6. 导出脱机应急脚本到桌面
						if (pathname === '/export-script' && req.method === 'POST') {
							const desktopDir = path.join(os.homedir(), 'Desktop');
							const result = generateOfflineScript(profileDir, desktopDir);
							try {
								if (process.platform === 'darwin') {
									exec(`open -R "${result.scriptPath}"`);
								} else if (process.platform === 'win32') {
									exec(`explorer.exe /select,"${result.scriptPath.replace(/\//g, '\\')}"`);
								}
							} catch {}
							return safeJson(res, 200, { ok: true, target: result.scriptPath, fileName: result.fileName });
						}

						// 7. 获取精选插件目录及安装状态
						if (pathname === '/catalog' && req.method === 'GET') {
							const manifest = readProfileManifest(profileDir);
							const catalog = getEnrichedCatalog(manifest);
							return safeJson(res, 200, { ok: true, catalog });
						}

						// 8. 唤起系统文件选择框选取本地 .tgz
						if (pathname === '/choose-file' && req.method === 'POST') {
							const result = await chooseLocalTgzFile();
							return safeJson(res, 200, result);
						}

						// 9. 执行插件安装（内部已包裹排他锁与事务回滚）
						if (pathname === '/install' && req.method === 'POST') {
							const body = await parseBody(req);
							if (!body.spec) {
								return safeJson(res, 200, { ok: false, error: 'spec is required' });
							}
							const result = await executePluginInstall(profileDir, body.spec);
							return safeJson(res, 200, result);
						}

						// 10. 执行插件彻底卸载（内部已包裹排他锁）
						if (pathname === '/uninstall' && req.method === 'POST') {
							const body = await parseBody(req);
							if (!body.packageName) {
								return safeJson(res, 200, { ok: false, error: 'packageName is required' });
							}
							const result = await executePluginUninstall(profileDir, body.packageName);
							return safeJson(res, 200, result);
						}

						// 11. 检查插件最新版本与更新
						if (pathname === '/check-updates' && req.method === 'GET') {
							const status = getGuardianStatus(profileDir);
							const result = await checkPackagesUpdates(profileDir, status.allInstalledThirdParty || []);
							return safeJson(res, 200, { ok: true, ...result });
						}

						// 12. 现场诊断包一键生成
						if (pathname === '/diagnostic' && req.method === 'GET') {
							const report = generateDiagnosticReport(profileDir);
							return safeJson(res, 200, { ok: true, report });
						}

						return safeJson(res, 404, { ok: false, error: 'Not Found' });
					} catch (err) {
						console.error('[plugin-guardian] Handler caught fatal exception:', err);
						return safeJson(res, 200, {
							ok: false,
							error: err?.message || '内部服务异常',
							code: err?.code || 'INTERNAL_ERROR',
						});
					}
				},
			})
		);
	});
}
