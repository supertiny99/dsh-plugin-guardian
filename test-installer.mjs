/**
 * test-installer.mjs · 安装器与精选市场单元及链路自动化测试
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import { getEnrichedCatalog } from './src/catalog.js';
import { normalizeSpec, resolvePnpmExecutor, executePluginUninstall } from './src/installer-core.js';
import {
	createSnapshot,
	listSnapshots,
	getGuardianStatus,
	restoreBundles,
	writeProfileManifestAtomic,
	GUARDIAN_BUNDLE_NAME,
} from './src/guardian-core.js';

console.log('🧪 开始运行 Plugin Guardian 安装器核心单元测试...\n');

// 1. 测试 Catalog 状态丰富逻辑
console.log('Step 1: 测试精选 Catalog 状态比对...');
const mockManifest = {
	dependencies: {
		'dsh-plugin-whale-pet': '^0.2.9',
	},
	dsh: {
		profile: {
			bundles: [
				'@deepseek-ai/dsh-base',
				'@deepseek-ai/dsh-web-app',
				'dsh-plugin-whale-pet',
				GUARDIAN_BUNDLE_NAME,
			],
		},
	},
};

const enriched = getEnrichedCatalog(mockManifest);
assert.ok(enriched.length >= 4, 'Catalog 应当包含常用推荐插件');
const whaleItem = enriched.find((it) => it.id === 'whale-pet');
assert.equal(whaleItem.isInstalled, true, '已装插件应当被识别为 isInstalled');
assert.equal(whaleItem.isActive, true, '已激活插件应当被识别为 isActive');

const petItem = enriched.find((it) => it.id === 'dsh-pet');
assert.equal(petItem.isInstalled, false, '未安装插件应当 isInstalled: false');
assert.equal(petItem.isActive, false, '未激活插件应当 isActive: false');
console.log('  ✔ Catalog 比对逻辑正确！');

// 2. 测试 normalizeSpec
console.log('\nStep 2: 测试 normalizeSpec 格式转换...');
assert.equal(normalizeSpec('@supertiny99/dsh-usage-dashboard'), '@supertiny99/dsh-usage-dashboard');
assert.equal(normalizeSpec('/Users/test/my-plugin.tgz'), 'file:/Users/test/my-plugin.tgz');
assert.equal(normalizeSpec('file:/Users/test/my-plugin.tgz'), 'file:/Users/test/my-plugin.tgz');
assert.equal(normalizeSpec('  dsh-ui-gallery  '), 'dsh-ui-gallery');
console.log('  ✔ normalizeSpec 路径与 spec 规范化通过！');

// 3. 测试 pnpm 执行器探测
console.log('\nStep 3: 测试 pnpm 执行器探测...');
const executor = resolvePnpmExecutor();
assert.ok(executor.script || executor.command, '应当探测到宿主 pnpm.mjs 或系统 pnpm/npm');
console.log(`  ✔ 成功探测到包管理执行器: ${executor.type || executor.command}`);

// 4. 测试安装前强制快照与回滚兜底模拟
console.log('\nStep 4: 测试安装前快照 (pre_install) 与故障回滚...');
const tmpProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'dsh-installer-test-'));

try {
	fs.writeFileSync(path.join(tmpProfile, 'package.json'), JSON.stringify(mockManifest, null, 2));

	// 模拟执行安装前快照
	const preSnap = createSnapshot(tmpProfile, 'pre_install');
	assert.equal(preSnap.reason, 'pre_install');

	// 模拟安装了一个有 Bug 的插件 'bad-plugin'
	const manifestAfterBadInstall = {
		...mockManifest,
		dependencies: {
			...mockManifest.dependencies,
			'bad-plugin': '1.0.0',
		},
		dsh: {
			profile: {
				bundles: [...mockManifest.dsh.profile.bundles, 'bad-plugin'],
			},
		},
	};
	writeProfileManifestAtomic(tmpProfile, manifestAfterBadInstall);

	// 模拟由于 bad-plugin 引发崩溃，用户使用 pre_install 快照恢复
	const { snapshots } = listSnapshots(tmpProfile);
	const targetPreSnap = snapshots.find((s) => s.reason === 'pre_install');
	assert.ok(targetPreSnap, '快照列表中必须找到 pre_install 快照');

	// 执行恢复至安装前快照
	restoreBundles(tmpProfile, targetPreSnap.thirdPartyBundles, false);

	const restoredManifest = JSON.parse(fs.readFileSync(path.join(tmpProfile, 'package.json'), 'utf8'));
	assert.ok(!restoredManifest.dsh.profile.bundles.includes('bad-plugin'), 'bad-plugin 必须被彻底移除');
	assert.ok(restoredManifest.dsh.profile.bundles.includes('dsh-plugin-whale-pet'));
	assert.ok(restoredManifest.dsh.profile.bundles.includes(GUARDIAN_BUNDLE_NAME));
	console.log('  ✔ 安装前安全快照与一键回滚验证通过！');

	// 5. 测试插件安全彻底卸载 (executePluginUninstall)
	console.log('\nStep 5: 测试插件彻底卸载流水线 (executePluginUninstall)...');
	// 5.1 安全防护：禁止卸载核心组件或管家自身
	await assert.rejects(
		async () => executePluginUninstall(tmpProfile, GUARDIAN_BUNDLE_NAME),
		/安全保护/,
		'应当拦截对管家自身的卸载'
	);
	await assert.rejects(
		async () => executePluginUninstall(tmpProfile, '@deepseek-ai/dsh-base'),
		/安全保护/,
		'应当拦截对核心底座的卸载'
	);

	// 5.2 正常卸载测试：卸载 dsh-plugin-whale-pet
	const uninstallResult = await executePluginUninstall(tmpProfile, 'dsh-plugin-whale-pet');
	assert.equal(uninstallResult.ok, true, '卸载执行应当成功');
	assert.equal(uninstallResult.uninstalledPackage, 'dsh-plugin-whale-pet');

	const afterUninstallManifest = JSON.parse(fs.readFileSync(path.join(tmpProfile, 'package.json'), 'utf8'));
	assert.ok(!afterUninstallManifest.dsh.profile.bundles.includes('dsh-plugin-whale-pet'), 'bundles 中应彻底移除');
	assert.equal(afterUninstallManifest.dependencies?.['dsh-plugin-whale-pet'], undefined, 'dependencies 中应彻底删除');

	const { snapshots: snapsAfterUninstall } = listSnapshots(tmpProfile);
	const preUninstSnap = snapsAfterUninstall.find((s) => s.reason === 'pre_uninstall');
	assert.ok(preUninstSnap, '快照列表中必须包含 pre_uninstall 快照');
	const afterUninstSnap = snapsAfterUninstall.find((s) => s.reason === 'after_uninstall');
	assert.ok(afterUninstSnap, '快照列表中必须包含 after_uninstall 快照');
	console.log('  ✔ 插件卸载前强制快照、配置剔除与卸载后记录全链路验证通过！');

	// 6. 测试版本比对与元数据扫描逻辑 (version-service)
	console.log('\nStep 6: 测试插件版本元数据与更新检测逻辑 (version-service)...');
	const { isNewerVersion, getInstalledPackagesMeta } = await import('./src/version-service.js');
	assert.equal(isNewerVersion('0.4.7', '0.4.8'), true);
	assert.equal(isNewerVersion('0.4.8', '0.4.8'), false);
	assert.equal(isNewerVersion('1.0.0', '0.9.9'), false);
	assert.equal(isNewerVersion('0.2.1-rc.1', '0.2.2'), true);

	// 模拟写入 mock 插件 package.json
	const mockPkgDir = path.join(tmpProfile, 'node_modules', 'mock-pkg');
	fs.mkdirSync(mockPkgDir, { recursive: true });
	fs.writeFileSync(path.join(mockPkgDir, 'package.json'), JSON.stringify({ version: '1.2.3', description: 'Mock Plugin' }));
	const scannedMeta = getInstalledPackagesMeta(tmpProfile, ['mock-pkg', 'missing-pkg']);
	assert.equal(scannedMeta['mock-pkg'].version, '1.2.3');
	assert.equal(scannedMeta['missing-pkg'].version, null);
	console.log('  ✔ 版本语义比对与本地 node_modules 扫描验证通过！');
} finally {
	fs.rmSync(tmpProfile, { recursive: true, force: true });
}

console.log('\n🎉 安装、卸载、版本与安全防护全链路 100% 验证通过！');
