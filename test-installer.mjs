/**
 * test-installer.mjs · 安装器与精选市场单元及链路自动化测试
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import { getEnrichedCatalog } from './src/catalog.js';
import { normalizeSpec, resolvePnpmExecutor } from './src/installer-core.js';
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
} finally {
	fs.rmSync(tmpProfile, { recursive: true, force: true });
}

console.log('\n🎉 安装器核心逻辑与安全链 100% 验证通过！');
