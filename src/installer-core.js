/**
 * plugin-guardian · 安装器核心模块 (installer-core.js)
 *
 * 职责：
 * 1. 跨平台调用系统原生文件选择对话框（选取本地 .tgz 包）
 * 2. 探测可用 pnpm 运行时（优先宿主内置，备选全局）
 * 3. 执行安装流水线：安装前健康快照 -> pnpm add -> 依赖比对与 bundles 注册 -> 安装后快照
 */

import fs from 'node:fs';
import path from 'node:path';
import { exec, execSync } from 'node:child_process';
import {
	readProfileManifest,
	writeProfileManifestAtomic,
	createSnapshot,
	GUARDIAN_BUNDLE_NAME,
} from './guardian-core.js';
import { globalActionMutex } from './utils/mutex.js';

/**
 * 跨平台调起系统原生文件选择器选取本地 .tgz
 */
export function chooseLocalTgzFile() {
	return new Promise((resolve) => {
		if (process.platform === 'darwin') {
			// macOS 原生 AppleScript 对话框
			const cmd = `osascript -e 'POSIX path of (choose file of type {"tgz", "tar.gz", "gz"} with prompt "请选择 DSH 插件安装包 (.tgz)")'`;
			exec(cmd, (err, stdout) => {
				if (err || !stdout.trim()) {
					return resolve({ ok: false, error: '用户取消选择或选取失败' });
				}
				const selectedPath = stdout.trim();
				if (!fs.existsSync(selectedPath)) {
					return resolve({ ok: false, error: '选取的本地文件不存在' });
				}
				const fileName = path.basename(selectedPath);
				const spec = `file:${selectedPath}`;
				resolve({ ok: true, filePath: selectedPath, fileName, spec });
			});
		} else if (process.platform === 'win32') {
			// Windows PowerShell 原生 OpenFileDialog
			const psCmd = `powershell -NoProfile -Command "Add-Type -AssemblyName System.Windows.Forms; $f = New-Object System.Windows.Forms.OpenFileDialog; $f.Filter = 'TGZ Files (*.tgz;*.tar.gz)|*.tgz;*.tar.gz|All Files (*.*)|*.*'; $f.Title = '选择 DSH 插件离线包 (.tgz)'; if ($f.ShowDialog() -eq 'OK') { Write-Output $f.FileName }"`;
			exec(psCmd, (err, stdout) => {
				if (err || !stdout.trim()) {
					return resolve({ ok: false, error: '用户取消选择或选取失败' });
				}
				const selectedPath = stdout.trim();
				if (!fs.existsSync(selectedPath)) {
					return resolve({ ok: false, error: '选取的本地文件不存在' });
				}
				const fileName = path.basename(selectedPath);
				const spec = `file:${selectedPath.replace(/\\/g, '/')}`;
				resolve({ ok: true, filePath: selectedPath, fileName, spec });
			});
		} else {
			resolve({ ok: false, error: '当前平台不支持直接唤起原生对话框，请手动输入路径' });
		}
	});
}

/**
 * 寻找可用的 pnpm 解释器命令
 */
export function resolvePnpmExecutor() {
	// 1. 尝试宿主自带的 pnpm.mjs
	const hostPnpmMjs = '/Applications/DeepSeek Harness.app/Contents/Resources/runtime/primary-runtime/dependencies/pnpm/bin/pnpm.mjs';
	if (fs.existsSync(hostPnpmMjs)) {
		return { type: 'node_script', script: hostPnpmMjs };
	}

	// 2. 尝试系统 PATH 中的 pnpm
	try {
		const whichPnpm = execSync('which pnpm', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
		if (whichPnpm && fs.existsSync(whichPnpm)) {
			return { type: 'binary', command: 'pnpm' };
		}
	} catch {}

	// 3. 兜底尝试 npm
	return { type: 'binary', command: 'npm' };
}

/**
 * 执行规范化 spec
 */
export function normalizeSpec(rawSpec) {
	if (!rawSpec || typeof rawSpec !== 'string') {
		throw new Error('插件 spec 不能为空');
	}
	const trimmed = rawSpec.trim();
	// 如果是本地绝对路径但缺少协议前缀，自动追加 file:
	if (trimmed.startsWith('/') || /^[a-zA-Z]:[\\/]/.test(trimmed)) {
		return `file:${trimmed}`;
	}
	return trimmed;
}

/**
 * 执行安装流水线
 * @param {string} profileDir Profile 根目录
 * @param {string} rawSpec 用户输入的 spec (npm 包名 / file:... / github:...)
 */
export async function executePluginInstall(profileDir, rawSpec) {
	return await globalActionMutex.runExclusive(
		`install:${rawSpec}`,
		async () => {
			const spec = normalizeSpec(rawSpec);
		const pkgPath = path.join(profileDir, 'package.json');
		let originalManifestContent = null;
		if (fs.existsSync(pkgPath)) {
			originalManifestContent = fs.readFileSync(pkgPath, 'utf8');
		}

		// 步骤 1: 读取安装前的 manifest
		const beforeManifest = readProfileManifest(profileDir);
		const beforeDeps = Object.keys(beforeManifest.dependencies || {});

		// 步骤 2: 强制执行安装前健康快照 (Pre-install Snapshot)
		const preSnap = createSnapshot(profileDir, 'pre_install');

		// 步骤 3: 确定执行器并调用包管理工具执行安装
		const executor = resolvePnpmExecutor();
		let installCmd = '';

		if (executor.type === 'node_script') {
			// 使用宿主 node 执行内置 pnpm.mjs add <spec>
			installCmd = `node "${executor.script}" add "${spec}"`;
		} else if (executor.command === 'pnpm') {
			installCmd = `pnpm add "${spec}"`;
		} else {
			installCmd = `npm install "${spec}" --save`;
		}

		// 执行安装（超时 120 秒）
		let outputLog = '';
		try {
			outputLog = await new Promise((resolve, reject) => {
				exec(
					installCmd,
					{
						cwd: profileDir,
						timeout: 120_000,
						env: {
							...process.env,
							PATH: `/usr/local/bin:/usr/bin:/bin:/opt/homebrew/bin:${process.env.PATH || ''}`,
						},
					},
					(err, stdout, stderr) => {
						const fullLog = (stdout || '') + '\n' + (stderr || '');
						if (err) {
							const errorMsg = `安装命令执行失败: ${err.message}\n${fullLog}`;
							return reject(new Error(errorMsg));
						}
						resolve(fullLog);
					}
				);
			});

			// 步骤 4: 读取安装后的 manifest，找出新增加的包名
			const afterManifest = readProfileManifest(profileDir);
			const afterDeps = Object.keys(afterManifest.dependencies || {});
			const newDeps = afterDeps.filter((d) => !beforeDeps.includes(d));

			let installedPkgName = null;
			if (newDeps.length > 0) {
				installedPkgName = newDeps[0];
			} else {
				// 若已存在依赖更新，从 spec 推导包名
				const cleanSpec = spec.replace(/^file:/, '').replace(/^github:[^/]+\//, '');
				const match = cleanSpec.match(/^(@[^/]+\/[^@]+|[^@]+)/);
				if (match) installedPkgName = match[1];
			}

			// 步骤 5: 将新安装的包自动写入 dsh.profile.bundles（默认激活）
			if (installedPkgName) {
				afterManifest.dsh = afterManifest.dsh || {};
				afterManifest.dsh.profile = afterManifest.dsh.profile || {};
				afterManifest.dsh.profile.bundles = afterManifest.dsh.profile.bundles || [];

				if (!afterManifest.dsh.profile.bundles.includes(installedPkgName)) {
					afterManifest.dsh.profile.bundles.push(installedPkgName);
					writeProfileManifestAtomic(profileDir, afterManifest);
				}
			}

			// 步骤 6: 记录安装后快照
			createSnapshot(profileDir, 'after_install');

			return {
				ok: true,
				spec,
				installedPackage: installedPkgName,
				preSnapshotId: preSnap?.id,
				needRestart: true,
				log: outputLog,
			};
		} catch (installErr) {
			console.warn(`[plugin-guardian][Installer] 安装 [${spec}] 失败，正在执行事务回滚...`, installErr.message);
			if (originalManifestContent) {
				try {
					fs.writeFileSync(pkgPath, originalManifestContent, 'utf8');
					console.log('[plugin-guardian][Installer] 事务回滚成功：已还原安装前 package.json');
				} catch (rollbackErr) {
					console.error('[plugin-guardian][Installer] 事务回滚异常:', rollbackErr);
				}
			}
			throw installErr;
		}
	}, 130_000);
}

/**
 * 执行插件彻底卸载流水线（带事务排他锁）
 * @param {string} profileDir Profile 根目录
 * @param {string} pkgName 要卸载的包名（如 "dsh-pet"）
 */
export async function executePluginUninstall(profileDir, pkgName) {
	return await globalActionMutex.runExclusive(`uninstall:${pkgName}`, async () => {
		if (!pkgName || typeof pkgName !== 'string') {
			throw new Error('卸载目标包名不能为空');
		}
		const targetPkg = pkgName.trim();

		// 1. 安全保护：核心底座与插件管家自身严禁卸载
		if (
			targetPkg === GUARDIAN_BUNDLE_NAME ||
			targetPkg === 'dsh-plugin-guardian' ||
			targetPkg.startsWith('@deepseek-ai/')
		) {
			throw new Error(`安全保护：禁止卸载核心组件或插件管家自身 (${targetPkg})`);
		}

		// 2. 卸载前强制健康快照 (Pre-uninstall Snapshot)
		const preSnap = createSnapshot(profileDir, 'pre_uninstall');

		// 3. 更新 package.json：从 bundles 中移除，从 dependencies 中移除
		const manifest = readProfileManifest(profileDir);
		let bundlesModified = false;
		let depsModified = false;

		if (manifest.dsh?.profile?.bundles && Array.isArray(manifest.dsh.profile.bundles)) {
			const beforeCount = manifest.dsh.profile.bundles.length;
			manifest.dsh.profile.bundles = manifest.dsh.profile.bundles.filter((b) => b !== targetPkg);
			if (manifest.dsh.profile.bundles.length !== beforeCount) {
				bundlesModified = true;
			}
		}

		if (manifest.dependencies && manifest.dependencies[targetPkg]) {
			delete manifest.dependencies[targetPkg];
			depsModified = true;
		}

		if (bundlesModified || depsModified) {
			writeProfileManifestAtomic(profileDir, manifest);
		}

		// 4. 清理 node_modules 中的包文件/软链目录
		const targetDir = path.join(profileDir, 'node_modules', ...targetPkg.split('/'));
		try {
			if (fs.existsSync(targetDir)) {
				fs.rmSync(targetDir, { recursive: true, force: true });
			}
		} catch (e) {
			// 容忍非致命清理失败
		}

		// 5. 记录卸载后快照
		createSnapshot(profileDir, 'after_uninstall');

		return {
			ok: true,
			uninstalledPackage: targetPkg,
			preSnapshotId: preSnap?.id,
			needRestart: true,
		};
	});
}
