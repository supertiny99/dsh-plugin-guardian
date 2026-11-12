/**
 * dsh-plugin-guardian · 现场诊断报告生成服务 (diagnostic-service.js)
 *
 * 职责：
 * 生成当前环境状态、Profiles 完整度、快照统计与脱敏信息的诊断快照，便于排障。
 */

import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';
import {
	readProfileManifest,
	listSnapshots,
	isThirdPartyBundle,
	scanPatchBackups,
	readPatchContent,
	GUARDIAN_BUNDLE_NAME,
} from '../guardian-core.js';

export function generateDiagnosticReport(profileDir) {
	let pkg = null;
	let pkgError = null;
	try {
		pkg = readProfileManifest(profileDir);
	} catch (e) {
		pkgError = e.message;
	}

	const { snapshots, totalBytes, totalSizeText } = listSnapshots(profileDir);
	const bakFiles = scanPatchBackups(profileDir);
	const patchContent = readPatchContent(profileDir);

	const allBundles = pkg?.dsh?.profile?.bundles || [];
	const thirdPartyBundles = allBundles.filter(isThirdPartyBundle);
	const dependencies = Object.keys(pkg?.dependencies || {});

	return {
		timestamp: new Date().toISOString(),
		timeString: new Date().toLocaleString(),
		system: {
			platform: process.platform,
			arch: process.arch,
			nodeVersion: process.version,
			osRelease: os.release(),
			homedir: os.homedir(),
		},
		profile: {
			profileDir,
			exists: fs.existsSync(profileDir),
			packageJsonValid: !!pkg,
			packageJsonError: pkgError,
			totalBundlesCount: allBundles.length,
			thirdPartyBundlesCount: thirdPartyBundles.length,
			thirdPartyBundles,
			dependenciesCount: dependencies.length,
			installedPackages: dependencies,
			hasPatch: !!patchContent,
			patchSize: patchContent ? patchContent.length : 0,
			bakFilesCount: bakFiles.length,
			latestBakFile: bakFiles[0]?.fileName || null,
		},
		snapshots: {
			totalCount: snapshots.length,
			totalSizeText,
			latestSnapshotId: snapshots[0]?.id || null,
			latestReason: snapshots[0]?.reason || null,
		},
		guardian: {
			bundleName: GUARDIAN_BUNDLE_NAME,
			inBundles: allBundles.includes(GUARDIAN_BUNDLE_NAME),
		},
	};
}
