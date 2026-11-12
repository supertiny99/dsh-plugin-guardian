/**
 * plugin-guardian · 插件版本与更新检查服务 (version-service.js)
 *
 * 职责：
 * 1. 扫描当前 Profile node_modules 读取各插件的真实安装版本与描述
 * 2. 异步比对 npm 注册表最新版本（带 30 分钟缓存与 3.5s 超时保护）
 * 3. 识别可更新包，为前端呈现版本号与「可更新至 vX.Y.Z」提供数据支撑
 */

import fs from 'node:fs';
import path from 'node:path';

// 内存缓存：{ [pkgName]: { latest: string, checkedAt: number } }
const UPDATE_CACHE = new Map();
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 分钟缓存

/**
 * 读取当前 Profile 已安装插件的本地真实元数据（版本号、描述）
 */
export function getInstalledPackagesMeta(profileDir, packageNames = []) {
	const result = {};
	for (const pkg of packageNames) {
		const pkgJsonPath = path.join(profileDir, 'node_modules', ...pkg.split('/'), 'package.json');
		try {
			if (fs.existsSync(pkgJsonPath)) {
				const pkgData = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
				result[pkg] = {
					version: pkgData.version || null,
					description: pkgData.description || null,
				};
			} else {
				result[pkg] = { version: null };
			}
		} catch {
			result[pkg] = { version: null };
		}
	}
	return result;
}

/**
 * 比较两个 semver 版本号，若 v2 > v1 返回 true
 */
export function isNewerVersion(current, latest) {
	if (!current || !latest) return false;
	if (current === latest) return false;
	const cParts = current.replace(/^[^\d]*/, '').split('.').map((n) => parseInt(n, 10) || 0);
	const lParts = latest.replace(/^[^\d]*/, '').split('.').map((n) => parseInt(n, 10) || 0);
	for (let i = 0; i < Math.max(cParts.length, lParts.length); i++) {
		const c = cParts[i] || 0;
		const l = lParts[i] || 0;
		if (l > c) return true;
		if (l < c) return false;
	}
	return false;
}

/**
 * 异步查询指定公共包在 npm registry 上的最新版本
 */
export async function queryNpmLatestVersion(packageName) {
	// 忽略本地 link 包与内部作用域
	if (packageName.startsWith('@local/')) return null;

	const now = Date.now();
	const cached = UPDATE_CACHE.get(packageName);
	if (cached && now - cached.checkedAt < CACHE_TTL_MS) {
		return cached.latest;
	}

	try {
		const url = `https://registry.npmjs.org/${encodeURIComponent(packageName).replace('%40', '@')}/latest`;
		const res = await fetch(url, {
			signal: AbortSignal.timeout(3500),
			headers: { 'User-Agent': 'dsh-plugin-guardian-update-check' },
		});
		if (res.ok) {
			const data = await res.json();
			const latest = data.version || null;
			if (latest) {
				UPDATE_CACHE.set(packageName, { latest, checkedAt: now });
				return latest;
			}
		}
	} catch {
		// 网络不可用或超时静默忽略
	}
	return null;
}

/**
 * 批量检查更新状态
 */
export async function checkPackagesUpdates(profileDir, packageNames = []) {
	const localMeta = getInstalledPackagesMeta(profileDir, packageNames);
	const updates = {};

	await Promise.all(
		packageNames.map(async (pkg) => {
			const currentVer = localMeta[pkg]?.version;
			if (!currentVer) return;
			const latestVer = await queryNpmLatestVersion(pkg);
			if (latestVer && isNewerVersion(currentVer, latestVer)) {
				updates[pkg] = {
					currentVersion: currentVer,
					latestVersion: latestVer,
					hasUpdate: true,
				};
			}
		})
	);

	return { localMeta, updates };
}
