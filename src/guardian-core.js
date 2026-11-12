/**
 * dsh-plugin-guardian · 核心引擎模块 (guardian-core.js)
 * 
 * 职责：
 * 1. 探测与读取 profile 状态（bundles、dependencies、cordis.patch.yml）
 * 2. 快照自动维护与持久化（.plugin-guardian/snapshots/）
 * 3. 事故检测（对比当前 bundles 与 latest-healthy 快照）
 * 4. 原子安全写回 package.json（支持排除坏插件的一键恢复）
 * 5. 扫描并挽回官方 sanitizeProfile 产生的 cordis.patch.yml.bak-*
 * 6. 生成免依赖的脱机应急脚本（restore-plugins.command）
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { getInstalledPackagesMeta } from './version-service.js';

export const GUARDIAN_BUNDLE_NAME = '@supertiny99/dsh-plugin-guardian';
export const LEGACY_GUARDIAN_NAME = 'dsh-plugin-guardian';
export const OFFICIAL_PREFIX = '@deepseek-ai/';

export const REASON_TEXT_MAP = {
	startup_auto: '宿主启动自动记录',
	manual: '用户手动创建',
	after_recovery: '灾难恢复后自动备份',
	manual_activate: '手动激活插件',
	manual_deactivate: '手动关闭插件',
	pre_install: '安装前快照',
	after_install: '安装插件后记录',
	pre_uninstall: '卸载前快照',
	after_uninstall: '卸载插件后记录',
	clean_retained: '清理后保留快照',
};

/**
 * 将快照触发操作/原因转义为中文描述
 */
export function translateReason(reason) {
	if (!reason) return '日常快照';
	return REASON_TEXT_MAP[reason] || reason;
}

/**
 * 确定当前 profile 目录
 */
export function resolveProfileDir(customDir) {
	if (customDir && fs.existsSync(customDir)) return path.resolve(customDir);
	if (process.env.DSH_PROFILE_DIR && fs.existsSync(process.env.DSH_PROFILE_DIR)) {
		return path.resolve(process.env.DSH_PROFILE_DIR);
	}
	// 默认回退至 desktop profile
	return path.join(os.homedir(), '.dsh', 'profiles', 'desktop');
}

/**
 * 判断是否为第三方 bundle
 */
export function isThirdPartyBundle(bundleName) {
	if (!bundleName) return false;
	return !bundleName.startsWith(OFFICIAL_PREFIX);
}

/**
 * 获取快照存储目录，若不存在则递归创建
 */
export function ensureSnapshotDir(profileDir) {
	const dir = path.join(profileDir, '.plugin-guardian', 'snapshots');
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true, mode: 0o755 });
	}
	return dir;
}

/**
 * 读取 profile 的 package.json
 */
export function readProfileManifest(profileDir) {
	const pkgPath = path.join(profileDir, 'package.json');
	if (!fs.existsSync(pkgPath)) {
		throw new Error(`Profile package.json not found: ${pkgPath}`);
	}
	const content = fs.readFileSync(pkgPath, 'utf8');
	return JSON.parse(content);
}

/**
 * 安全写入 package.json（临时文件 + rename 原子写 + Windows EBUSY 退避重试）
 */
export function writeProfileManifestAtomic(profileDir, manifest) {
	const pkgPath = path.join(profileDir, 'package.json');
	const tmpPath = path.join(profileDir, `package.json.tmp-${Date.now()}-${process.pid}`);
	const content = JSON.stringify(manifest, null, 2) + '\n';
	fs.writeFileSync(tmpPath, content, { encoding: 'utf8', mode: 0o644 });

	let retries = 5;
	while (retries > 0) {
		try {
			fs.renameSync(tmpPath, pkgPath);
			break;
		} catch (err) {
			retries--;
			if ((err.code === 'EBUSY' || err.code === 'EPERM') && retries > 0) {
				// 针对 Windows 下文件被防病毒或宿主临时占用做微小退避同步等待
				const waitMs = (5 - retries) * 50;
				const end = Date.now() + waitMs;
				while (Date.now() < end) {}
			} else {
				try {
					fs.unlinkSync(tmpPath);
				} catch {}
				throw err;
			}
		}
	}
}

/**
 * 读取当前的 cordis.patch.yml
 */
export function readPatchContent(profileDir) {
	const patchPath = path.join(profileDir, 'cordis.patch.yml');
	if (!fs.existsSync(patchPath)) return null;
	try {
		return fs.readFileSync(patchPath, 'utf8');
	} catch {
		return null;
	}
}

/**
 * 扫描目录下的 cordis.patch.yml.bak-* 备份文件
 */
export function scanPatchBackups(profileDir) {
	try {
		const files = fs.readdirSync(profileDir);
		const bakFiles = files
			.filter((f) => f.startsWith('cordis.patch.yml.bak'))
			.map((f) => {
				const fullPath = path.join(profileDir, f);
				const stat = fs.statSync(fullPath);
				return {
					fileName: f,
					path: fullPath,
					size: stat.size,
					mtimeMs: stat.mtimeMs,
					mtimeString: stat.mtime.toLocaleString(),
				};
			})
			.sort((a, b) => b.mtimeMs - a.mtimeMs);
		return bakFiles;
	} catch {
		return [];
	}
}

/**
 * 快照数据规范化（向下兼容老版本缺少 schemaVersion 或字段的快照）
 */
export function normalizeSnapshot(rawSnapshot) {
	if (!rawSnapshot || typeof rawSnapshot !== 'object') return null;
	const bundles = Array.isArray(rawSnapshot.bundles) ? [...rawSnapshot.bundles] : [];
	const thirdPartyBundles = Array.isArray(rawSnapshot.thirdPartyBundles)
		? [...rawSnapshot.thirdPartyBundles]
		: bundles.filter(isThirdPartyBundle);

	return {
		schemaVersion: 1,
		id: rawSnapshot.id || `snap-legacy-${Date.now()}`,
		timestamp: typeof rawSnapshot.timestamp === 'number' ? rawSnapshot.timestamp : Date.now(),
		timeString: rawSnapshot.timeString || new Date(rawSnapshot.timestamp || Date.now()).toLocaleString(),
		reason: rawSnapshot.reason || 'manual',
		reasonText: rawSnapshot.reasonText || translateReason(rawSnapshot.reason),
		bundles,
		thirdPartyBundles,
		dependencies: rawSnapshot.dependencies && typeof rawSnapshot.dependencies === 'object' ? { ...rawSnapshot.dependencies } : {},
		patchContent: typeof rawSnapshot.patchContent === 'string' ? rawSnapshot.patchContent : '',
		hasPatch: !!rawSnapshot.hasPatch,
		totalBundles: bundles.length,
	};
}

let lastSnapshotTimestamp = 0;

/**
 * 创建新快照（毫秒防碰撞保护 + Schema Versioning）
 */
export function createSnapshot(profileDir, reason = 'manual') {
	const snapshotDir = ensureSnapshotDir(profileDir);
	const manifest = readProfileManifest(profileDir);
	const bundles = manifest.dsh?.profile?.bundles || [];
	const thirdPartyBundles = bundles.filter(isThirdPartyBundle);
	const patchContent = readPatchContent(profileDir);
	
	let now = Date.now();
	if (now <= lastSnapshotTimestamp) {
		now = lastSnapshotTimestamp + 1;
	}
	lastSnapshotTimestamp = now;

	const snapshot = normalizeSnapshot({
		schemaVersion: 1,
		id: `snap-${now}`,
		timestamp: now,
		timeString: new Date(now).toLocaleString(),
		reason,
		reasonText: translateReason(reason),
		bundles: [...bundles],
		thirdPartyBundles: [...thirdPartyBundles],
		dependencies: { ...(manifest.dependencies || {}) },
		patchContent: patchContent || '',
		hasPatch: !!patchContent,
		totalBundles: bundles.length,
	});

	const snapPath = path.join(snapshotDir, `${snapshot.id}.json`);
	fs.writeFileSync(snapPath, JSON.stringify(snapshot, null, 2), 'utf8');

	// 仅在以下情况更新 latest-healthy.json：
	// 1. 当前含有第三方插件，且
	// 2. 是用户主动打快照(manual)，或者尚未存在健康快照，或者当前第三方插件数不少于历史健康快照
	// 避免在故障排查/排除部分插件期间意外冲掉原有的完整全量健康快照
	const existingHealthy = getLatestHealthySnapshot(profileDir);
	const shouldUpdateHealthy =
		thirdPartyBundles.length > 0 &&
		(reason === 'manual' ||
			!existingHealthy ||
			thirdPartyBundles.length >= (existingHealthy.thirdPartyBundles?.length || 0));

	if (shouldUpdateHealthy) {
		const healthyPath = path.join(snapshotDir, 'latest-healthy.json');
		fs.writeFileSync(healthyPath, JSON.stringify(snapshot, null, 2), 'utf8');
	}

	// 轮转保留最近 20 份快照
	rotateSnapshots(snapshotDir, 20);

	return snapshot;
}

/**
 * 轮转删除过旧快照
 */
function rotateSnapshots(snapshotDir, maxRetain = 20) {
	try {
		const files = fs.readdirSync(snapshotDir);
		const snaps = files
			.filter((f) => f.startsWith('snap-') && f.endsWith('.json'))
			.sort()
			.reverse();
		if (snaps.length > maxRetain) {
			for (const oldSnap of snaps.slice(maxRetain)) {
				try {
					fs.unlinkSync(path.join(snapshotDir, oldSnap));
				} catch {}
			}
		}
	} catch {}
}

/**
 * 获取快照列表与存储占用统计
 */
export function listSnapshots(profileDir) {
	const snapshotDir = ensureSnapshotDir(profileDir);
	try {
		const files = fs.readdirSync(snapshotDir);
		const list = [];
		let totalBytes = 0;

		for (const f of files) {
			if (f.startsWith('snap-') && f.endsWith('.json')) {
				try {
					const fullPath = path.join(snapshotDir, f);
					const stat = fs.statSync(fullPath);
					totalBytes += stat.size;
					const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
					list.push({
						id: data.id,
						timestamp: data.timestamp,
						timeString: data.timeString,
						reason: data.reason,
						reasonText: translateReason(data.reason),
						size: stat.size,
						sizeText: (stat.size / 1024).toFixed(1) + ' KB',
						thirdPartyCount: data.thirdPartyBundles?.length || 0,
						totalBundles: data.totalBundles || data.bundles?.length || 0,
						thirdPartyBundles: data.thirdPartyBundles || [],
					});
				} catch {}
			}
		}

		const sorted = list.sort((a, b) => b.timestamp - a.timestamp);
		return {
			snapshots: sorted,
			totalBytes,
			totalSizeText: (totalBytes / 1024).toFixed(1) + ' KB',
		};
	} catch {
		return { snapshots: [], totalBytes: 0, totalSizeText: '0 KB' };
	}
}

/**
 * 手动删除指定快照
 */
export function deleteSnapshot(profileDir, snapId) {
	if (!snapId || !snapId.startsWith('snap-')) {
		throw new Error('Invalid snapshot id');
	}
	const snapshotDir = ensureSnapshotDir(profileDir);
	const filePath = path.join(snapshotDir, `${snapId}.json`);
	if (fs.existsSync(filePath)) {
		fs.unlinkSync(filePath);
		return { ok: true, deleted: snapId };
	}
	return { ok: false, error: 'Snapshot not found' };
}

/**
 * 一键清理多余旧快照（保留最新的 keepCount 份，默认保留 2 份）
 */
export function cleanOldSnapshots(profileDir, keepCount = 2) {
	const snapshotDir = ensureSnapshotDir(profileDir);
	const { snapshots } = listSnapshots(profileDir);
	let deletedCount = 0;

	if (snapshots.length > keepCount) {
		const toDelete = snapshots.slice(keepCount);
		for (const item of toDelete) {
			try {
				const p = path.join(snapshotDir, `${item.id}.json`);
				if (fs.existsSync(p)) {
					fs.unlinkSync(p);
					deletedCount++;
				}
			} catch {}
		}
	}
	return { ok: true, deletedCount, retained: Math.min(snapshots.length, keepCount) };
}

/**
 * 读取最近一份健康快照
 */
export function getLatestHealthySnapshot(profileDir) {
	const snapshotDir = ensureSnapshotDir(profileDir);
	const healthyPath = path.join(snapshotDir, 'latest-healthy.json');
	if (fs.existsSync(healthyPath)) {
		try {
			return normalizeSnapshot(JSON.parse(fs.readFileSync(healthyPath, 'utf8')));
		} catch {}
	}
	// 若无 latest-healthy，取最近一份有第三方的 snap
	const { snapshots: all } = listSnapshots(profileDir);
	for (const item of all) {
		if (item.thirdPartyCount > 0) {
			try {
				const full = JSON.parse(fs.readFileSync(path.join(snapshotDir, `${item.id}.json`), 'utf8'));
				return normalizeSnapshot(full);
			} catch {}
		}
	}
	return null;
}

/**
 * 获取插件管家完整状态（前端主接口）
 */
export function getGuardianStatus(profileDir) {
	const manifest = readProfileManifest(profileDir);
	const currentBundles = manifest.dsh?.profile?.bundles || [];
	const currentThirdParty = currentBundles.filter(isThirdPartyBundle);
	const dependencies = manifest.dependencies || {};
	const allInstalledThirdParty = Object.keys(dependencies).filter(isThirdPartyBundle);

	const latestHealthy = getLatestHealthySnapshot(profileDir);
	const { snapshots, totalBytes, totalSizeText } = listSnapshots(profileDir);
	const bakFiles = scanPatchBackups(profileDir);
	const currentPatch = readPatchContent(profileDir);

	// 事故检测：
	// 1. 如果有 latest-healthy 记录过第三方插件，但当前第三方插件数量为 0 或显著减少
	// 2. 并且存在快照中的第三方插件在当前 bundles 缺失
	let isIncident = false;
	let disabledFromHealthy = [];

	if (latestHealthy && latestHealthy.thirdPartyBundles?.length > 0) {
		const healthyList = latestHealthy.thirdPartyBundles;
		disabledFromHealthy = healthyList.filter((b) => !currentBundles.includes(b));
		if (disabledFromHealthy.length > 0 && currentThirdParty.length <= 1) {
			isIncident = true;
		}
	}

	// 另外计算：dependencies 里已安装，但当前 bundles 未启用的插件
	const inactiveInstalled = allInstalledThirdParty.filter((pkg) => !currentBundles.includes(pkg));

	// 配置缺失检测：当前 patch 几乎为空，但有 bak 文件存在
	const currentPatchTrimmed = (currentPatch || '').trim();
	const patchNeedsRecovery = (currentPatchTrimmed === '' || currentPatchTrimmed === '[]') && bakFiles.length > 0;

	// 读取所有已安装第三方插件的 package.json 获取版本号
	const installedMeta = getInstalledPackagesMeta(profileDir, allInstalledThirdParty);

	return {
		profileDir,
		currentBundles,
		currentThirdParty,
		allInstalledThirdParty,
		inactiveInstalled,
		installedMeta,
		isIncident,
		disabledFromHealthy,
		latestHealthy: latestHealthy
			? {
					id: latestHealthy.id,
					timestamp: latestHealthy.timestamp,
					timeString: latestHealthy.timeString,
					reason: latestHealthy.reason,
					reasonText: translateReason(latestHealthy.reason),
					thirdPartyBundles: latestHealthy.thirdPartyBundles,
			  }
			: null,
		snapshotsCount: snapshots.length,
		snapshotsTotalSize: totalSizeText,
		snapshotsTotalBytes: totalBytes,
		recentSnapshots: snapshots.slice(0, 10),
		bakFiles,
		patchNeedsRecovery,
		currentPatchSize: currentPatch ? currentPatch.length : 0,
	};
}

/**
 * 执行恢复：将选中的 bundles 写回 package.json
 * @param {string} profileDir
 * @param {string[]} selectedBundles 用户选中的第三方插件
 * @param {boolean} restorePatch 是否同步恢复最新的 patch.bak
 */
export function restoreBundles(profileDir, selectedBundles, restorePatchFlag = false) {
	if (!Array.isArray(selectedBundles)) {
		throw new Error('selectedBundles must be an array');
	}

	const manifest = readProfileManifest(profileDir);
	const existingBundles = manifest.dsh?.profile?.bundles || [];

	// 保留所有的官方 bundles
	const officialBundles = existingBundles.filter((b) => !isThirdPartyBundle(b));

	// 确保 GUARDIAN_BUNDLE_NAME 也保留在恢复列表中
	const thirdPartySet = new Set(selectedBundles);
	thirdPartySet.add(GUARDIAN_BUNDLE_NAME);

	const newBundles = [...officialBundles, ...Array.from(thirdPartySet)];

	manifest.dsh = manifest.dsh || {};
	manifest.dsh.profile = manifest.dsh.profile || {};
	manifest.dsh.profile.bundles = newBundles;

	writeProfileManifestAtomic(profileDir, manifest);

	let patchRestored = null;
	if (restorePatchFlag) {
		const bak = scanPatchBackups(profileDir)[0];
		if (bak) {
			restorePatch(profileDir, bak.fileName);
			patchRestored = bak.fileName;
		}
	}

	// 恢复后立即创建一份新快照
	createSnapshot(profileDir, 'after_recovery');

	return {
		ok: true,
		restoredBundles: newBundles,
		thirdPartyRestored: Array.from(thirdPartySet),
		patchRestored,
		needRestart: true,
	};
}

/**
 * 手动启用或关闭指定插件
 * @param {string} profileDir
 * @param {string} bundleName 插件包名
 * @param {boolean} enabled 是否激活
 */
export function toggleBundleState(profileDir, bundleName, enabled) {
	if (!bundleName) {
		throw new Error('bundleName is required');
	}

	// 保护插件管家自身，防止在自身面板中关闭自己导致无法再次进入
	if (!enabled && (bundleName === GUARDIAN_BUNDLE_NAME || bundleName === LEGACY_GUARDIAN_NAME)) {
		throw new Error('插件管家为系统守护组件，不可手动关闭');
	}

	const manifest = readProfileManifest(profileDir);
	const existingBundles = manifest.dsh?.profile?.bundles || [];
	let newBundles = [...existingBundles];

	if (enabled) {
		if (!newBundles.includes(bundleName)) {
			newBundles.push(bundleName);
		}
	} else {
		newBundles = newBundles.filter((b) => b !== bundleName);
	}

	// 始终保证 GUARDIAN_BUNDLE_NAME 处于开启状态
	if (!newBundles.includes(GUARDIAN_BUNDLE_NAME) && !newBundles.includes(LEGACY_GUARDIAN_NAME)) {
		newBundles.push(GUARDIAN_BUNDLE_NAME);
	}

	manifest.dsh = manifest.dsh || {};
	manifest.dsh.profile = manifest.dsh.profile || {};
	manifest.dsh.profile.bundles = newBundles;

	writeProfileManifestAtomic(profileDir, manifest);

	// 创建快照记录此次手动变更
	createSnapshot(profileDir, enabled ? 'manual_activate' : 'manual_deactivate');

	return {
		ok: true,
		bundle: bundleName,
		enabled,
		currentBundles: newBundles,
		needRestart: true,
	};
}


/**
 * 挽回指定的 cordis.patch.yml.bak 文件
 */
export function restorePatch(profileDir, bakFileName) {
	const bakPath = path.join(profileDir, bakFileName);
	if (!fs.existsSync(bakPath)) {
		throw new Error(`Backup patch file not found: ${bakPath}`);
	}
	const content = fs.readFileSync(bakPath, 'utf8');
	const targetPath = path.join(profileDir, 'cordis.patch.yml');
	const tmpPath = path.join(profileDir, `cordis.patch.yml.tmp-${Date.now()}`);

	fs.writeFileSync(tmpPath, content, { encoding: 'utf8', mode: 0o644 });
	fs.renameSync(tmpPath, targetPath);

	return { ok: true, restoredFile: bakFileName, size: content.length };
}

/**
 * 生成脱机一键应急恢复脚本
 * 跨平台支持：Windows 生成 .bat，macOS 生成 .command，Linux 生成 .sh
 */
export function generateOfflineScript(profileDir, outputDir = null) {
	const targetDir = outputDir || profileDir;
	const isWin = process.platform === 'win32';
	const scriptFileName = isWin ? 'restore-plugins.bat' : 'restore-plugins.command';
	const scriptPath = path.join(targetDir, scriptFileName);

	let scriptContent = '';

	if (isWin) {
		// Windows 批处理脚本 (.bat) — 强制使用 CRLF 换行与 UTF-8 代码页
		const lines = [
			'@echo off',
			'chcp 65001 >nul',
			'echo ==================================================',
			'echo    DSH 插件管家 · 脱机应急恢复 (Windows)',
			'echo ==================================================',
			'',
			`set "PROFILE_DIR=${profileDir.replace(/\//g, '\\')}"`,
			'set "SNAPSHOT_FILE=%PROFILE_DIR%\\.plugin-guardian\\snapshots\\latest-healthy.json"',
			'set "PKG_FILE=%PROFILE_DIR%\\package.json"',
			'set "PATCH_FILE=%PROFILE_DIR%\\cordis.patch.yml"',
			'',
			'if not exist "%SNAPSHOT_FILE%" (',
			'    echo [X] 错误: 未找到最近的健康快照: "%SNAPSHOT_FILE%"',
			'    echo 请检查快照文件是否存在。',
			'    pause',
			'    exit /b 1',
			')',
			'',
			'node -e "const fs = require(\'fs\'); const path = require(\'path\'); const pDir = process.env.PROFILE_DIR; const sFile = process.env.SNAPSHOT_FILE; const pkgFile = process.env.PKG_FILE; const patchFile = process.env.PATCH_FILE; const snap = JSON.parse(fs.readFileSync(sFile, \'utf8\')); const pkg = JSON.parse(fs.readFileSync(pkgFile, \'utf8\')); const healthyBundles = snap.bundles || (snap.data && snap.data.bundles) || []; pkg.dsh = pkg.dsh || {}; pkg.dsh.profile = pkg.dsh.profile || {}; pkg.dsh.profile.bundles = healthyBundles; fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2) + \'\\n\'); console.log(\'[OK] 已成功恢复 \' + healthyBundles.length + \' 个插件组合行至 package.json\'); try { const baks = fs.readdirSync(pDir).filter(f => f.startsWith(\'cordis.patch.yml.bak\')).sort().reverse(); if (baks.length > 0) { fs.copyFileSync(path.join(pDir, baks[0]), patchFile); console.log(\'[OK] 已恢复配置: \' + baks[0] + \' -> cordis.patch.yml\'); } } catch (e) {}"',
			'',
			'if %errorlevel% equ 0 (',
			'    echo --------------------------------------------------',
			'    echo [OK] 恢复大功告成！',
			'    echo 现在请启动/重新打开 DeepSeek Harness 桌面应用即可生效。',
			') else (',
			'    echo [X] 恢复遇到错误，请检查上述提示。',
			')',
			'',
			'echo ==================================================',
			'echo 按任意键退出窗口...',
			'pause >nul',
			'',
		];
		scriptContent = lines.join('\r\n');
	} else {
		// macOS / Linux 脚本 (.command / .sh) — 强制严格双引号与 chmod 0o755，带 Python3 兜底
		scriptContent = `#!/bin/bash
# ==============================================================================
# DSH 插件管家 · 脱机应急恢复脚本
# 双击此脚本，即可脱机一键恢复上次健康的插件激活列表与配置
# ==============================================================================

set -e

export PROFILE_DIR="${profileDir}"
export SNAPSHOT_FILE="$PROFILE_DIR/.plugin-guardian/snapshots/latest-healthy.json"
export PKG_FILE="$PROFILE_DIR/package.json"
export PATCH_FILE="$PROFILE_DIR/cordis.patch.yml"

echo "=================================================="
echo "   DSH 插件管家 · 脱机应急恢复"
echo "=================================================="

if [ ! -f "$SNAPSHOT_FILE" ]; then
    echo "❌ 错误: 未找到最近的健康快照: $SNAPSHOT_FILE"
    echo "按任意键退出..."
    read -n 1
    exit 1
fi

if command -v node >/dev/null 2>&1; then
    node -e "
const fs = require('fs');
const snap = JSON.parse(fs.readFileSync(process.env.SNAPSHOT_FILE, 'utf8'));
const pkg = JSON.parse(fs.readFileSync(process.env.PKG_FILE, 'utf8'));

const healthyBundles = snap.bundles || (snap.data && snap.data.bundles) || [];
if (!healthyBundles || !healthyBundles.length) {
    console.error('❌ 快照中没有 bundle 数据');
    process.exit(1);
}

pkg.dsh = pkg.dsh || {};
pkg.dsh.profile = pkg.dsh.profile || {};
pkg.dsh.profile.bundles = healthyBundles;

fs.writeFileSync(process.env.PKG_FILE, JSON.stringify(pkg, null, 2) + '\\n');
console.log('✅ 已成功恢复 ' + healthyBundles.length + ' 个插件组合行至 package.json');

try {
    const files = fs.readdirSync(process.env.PROFILE_DIR);
    const baks = files.filter(f => f.startsWith('cordis.patch.yml.bak')).sort().reverse();
    if (baks.length > 0) {
        const latestBak = baks[0];
        fs.copyFileSync(require('path').join(process.env.PROFILE_DIR, latestBak), process.env.PATCH_FILE);
        console.log('✅ 已恢复配置: ' + latestBak + ' -> cordis.patch.yml');
    }
} catch (e) {
    console.warn('⚠️ 检查 patch.bak 略过:', e.message);
}
"
elif command -v python3 >/dev/null 2>&1; then
    python3 -c "
import json, os, glob
with open(os.environ['SNAPSHOT_FILE'], 'r', encoding='utf-8') as sf:
    snap = json.load(sf)
with open(os.environ['PKG_FILE'], 'r', encoding='utf-8') as pf:
    pkg = json.load(pf)
if 'dsh' not in pkg: pkg['dsh'] = {}
if 'profile' not in pkg['dsh']: pkg['dsh']['profile'] = {}
bundles = snap.get('bundles') or (snap.get('data') or {}).get('bundles') or []
pkg['dsh']['profile']['bundles'] = bundles
with open(os.environ['PKG_FILE'], 'w', encoding='utf-8') as pf:
    json.dump(pkg, pf, indent=2, ensure_ascii=False)
    pf.write('\n')
print('✅ [Python3 兜底] 已成功恢复 ' + str(len(bundles)) + ' 个插件组合行至 package.json')
"
fi

if [ $? -eq 0 ]; then
    echo "--------------------------------------------------"
    echo "🎉 恢复大功告成！"
    echo "现在请启动/重新打开 DeepSeek Harness 桌面应用即可生效。"
    osascript -e 'display notification "已成功恢复上次健康的插件激活列表与配置！" with title "DSH 插件管家"' 2>/dev/null || true
else
    echo "❌ 恢复过程中遇到错误，请检查上述日志。"
fi

echo "=================================================="
echo "按任意键退出窗口..."
read -n 1
`;
	}

	fs.writeFileSync(scriptPath, scriptContent, { encoding: 'utf8', mode: 0o755 });
	try {
		fs.chmodSync(scriptPath, 0o755);
	} catch {}

	return { scriptPath, fileName: scriptFileName, ok: true, platform: process.platform };
}
