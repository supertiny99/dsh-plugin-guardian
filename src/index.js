/**
 * dsh-plugin-guardian · Host 侧入口 (index.js)
 *
 * 职责：
 * 1. 注入 webServer 注册 /plugin-guardian/* 路由
 * 2. 启动时执行健康自动快照与应急脚本就绪
 * 3. 响应前端关于状态、快照、恢复、配置挽回与脚本导出的请求
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
import { chooseLocalTgzFile, executePluginInstall } from './installer-core.js';
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
					const json = (code, value) => {
						res.writeHead(code, {
							'content-type': 'application/json; charset=utf-8',
							'cache-control': 'no-store',
						});
						res.end(JSON.stringify(value));
					};

					try {
						const url = new URL(req.url, 'http://127.0.0.1');
						const pathname = url.pathname.replace(/^\/plugin-guardian/, '') || '/';

						// 1. 获取管家整体状态与事故检测
						if (pathname === '/status' && req.method === 'GET') {
							const status = getGuardianStatus(profileDir);
							return json(200, { ok: true, ...status });
						}

						// 2. 手动创建快照
						if (pathname === '/snapshot' && req.method === 'POST') {
							const body = await parseBody(req);
							const snap = createSnapshot(profileDir, body.reason || 'manual');
							return json(200, { ok: true, snapshot: snap });
						}

						// 3. 列出所有快照
						if (pathname === '/snapshots' && req.method === 'GET') {
							const result = listSnapshots(profileDir);
							return json(200, { ok: true, ...result });
						}

						// 3.1 删除单个快照
						if (pathname === '/delete-snapshot' && req.method === 'POST') {
							const body = await parseBody(req);
							if (!body.id) {
								return json(400, { ok: false, error: 'Snapshot id is required' });
							}
							const res = deleteSnapshot(profileDir, body.id);
							return json(res.ok ? 200 : 404, res);
						}

						// 3.2 一键清理多余旧快照（保留最新 2 份）
						if (pathname === '/clean-snapshots' && req.method === 'POST') {
							const body = await parseBody(req);
							const res = cleanOldSnapshots(profileDir, body.keepCount || 2);
							return json(200, res);
						}

						// 4. 执行插件恢复
						if (pathname === '/restore' && req.method === 'POST') {
							const body = await parseBody(req);
							const selected = body.bundles;
							if (!Array.isArray(selected)) {
								return json(400, { ok: false, error: 'bundles array is required' });
							}
							const result = restoreBundles(profileDir, selected, !!body.restorePatch);
							return json(200, result);
						}

						// 4.1 手动启用或停用单个插件
						if (pathname === '/toggle-bundle' && req.method === 'POST') {
							const body = await parseBody(req);
							if (!body.bundle) {
								return json(400, { ok: false, error: 'bundle is required' });
							}
							try {
								const result = toggleBundleState(profileDir, body.bundle, !!body.enabled);
								return json(200, result);
							} catch (e) {
								return json(400, { ok: false, error: e.message });
							}
						}

						// 5. 挽回 patch.bak 配置
						if (pathname === '/restore-patch' && req.method === 'POST') {
							const body = await parseBody(req);
							const status = getGuardianStatus(profileDir);
							const targetBak = body.fileName || status.bakFiles?.[0]?.fileName;
							if (!targetBak) {
								return json(400, { ok: false, error: 'No bak file found to restore' });
							}
							const result = restorePatch(profileDir, targetBak);
							return json(200, result);
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
							return json(200, { ok: true, target: result.scriptPath, fileName: result.fileName });
						}

						// 7. 获取精选插件目录及安装状态
						if (pathname === '/catalog' && req.method === 'GET') {
							const manifest = readProfileManifest(profileDir);
							const catalog = getEnrichedCatalog(manifest);
							return json(200, { ok: true, catalog });
						}

						// 8. 唤起系统文件选择框选取本地 .tgz
						if (pathname === '/choose-file' && req.method === 'POST') {
							const result = await chooseLocalTgzFile();
							return json(result.ok ? 200 : 400, result);
						}

						// 9. 执行插件安装（安装前强制健康快照）
						if (pathname === '/install' && req.method === 'POST') {
							const body = await parseBody(req);
							if (!body.spec) {
								return json(400, { ok: false, error: 'spec is required' });
							}
							try {
								const result = await executePluginInstall(profileDir, body.spec);
								return json(200, result);
							} catch (e) {
								return json(500, { ok: false, error: e.message });
							}
						}

						return json(404, { ok: false, error: 'Not Found' });
					} catch (err) {
						return json(500, { ok: false, error: err.message });
					}
				},
			})
		);
	});
}
