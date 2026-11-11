/**
 * test-host.mjs · Host 端核心逻辑自动化自测试
 * 
 * 覆盖：
 * 1. 快照生成与持久化（latest-healthy.json 维护）
 * 2. 模拟官方崩溃全盘禁用事故（sanitizeProfile 重置）
 * 3. 事故检测算法（isIncident 与 disabledFromHealthy 提取）
 * 4. 一键全量恢复与 package.json 原子写回
 * 5. 排除坏插件针对性恢复
 * 6. 丢失配置 (.bak) 挽回
 * 7. 脱机应急脚本执行与还原
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import {
	createSnapshot,
	listSnapshots,
	getGuardianStatus,
	deleteSnapshot,
	cleanOldSnapshots,
	restoreBundles,
	toggleBundleState,
	restorePatch,
	generateOfflineScript,
	GUARDIAN_BUNDLE_NAME,
} from './src/guardian-core.js';

console.log('🧪 开始运行 Plugin Guardian Host 端单元与全链路自测...\n');

// 创建临时隔离 profile
const tmpProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'dsh-guardian-test-'));
console.log(`📁 临时测试 profile 目录: ${tmpProfile}`);

function cleanup() {
	try {
		fs.rmSync(tmpProfile, { recursive: true, force: true });
	} catch {}
}

process.on('exit', cleanup);

try {
	// 1. 初始化一个健康的 profile
	const healthyBundles = [
		'@deepseek-ai/dsh-base',
		'@deepseek-ai/dsh-web-app',
		'@supertiny99/dsh-usage-dashboard',
		'@supertiny99/dsh-zcode-workbench',
		'dsh-ui-gallery',
		GUARDIAN_BUNDLE_NAME,
	];
	const initialPkg = {
		name: 'dsh-profile-test',
		private: true,
		dsh: {
			profile: {
				bundles: [...healthyBundles],
			},
		},
		dependencies: {
			'@supertiny99/dsh-usage-dashboard': '0.1.1',
			'@supertiny99/dsh-zcode-workbench': '0.1.2',
			'dsh-ui-gallery': '0.1.13',
			[GUARDIAN_BUNDLE_NAME]: 'link:./plugin-guardian',
		},
	};
	fs.writeFileSync(path.join(tmpProfile, 'package.json'), JSON.stringify(initialPkg, null, 2));

	const initialPatch = `- id: custom-model\n  name: "@deepseek-ai/dsh-llm"\n  config:\n    key: secret-value\n`;
	fs.writeFileSync(path.join(tmpProfile, 'cordis.patch.yml'), initialPatch);

	// 2. 测试快照创建
	console.log('Step 1: 测试创建健康快照...');
	const snap1 = createSnapshot(tmpProfile, 'initial_test');
	assert.equal(snap1.bundles.length, healthyBundles.length);
	assert.equal(snap1.thirdPartyBundles.length, 4);

	const { snapshots: snaps } = listSnapshots(tmpProfile);
	assert.equal(snaps.length, 1);
	console.log('  ✔ 快照持久化与列表返回正常');

	// 验证 latest-healthy.json 存在
	const healthySnapPath = path.join(tmpProfile, '.plugin-guardian', 'snapshots', 'latest-healthy.json');
	assert.ok(fs.existsSync(healthySnapPath));
	const healthyData = JSON.parse(fs.readFileSync(healthySnapPath, 'utf8'));
	assert.deepEqual(healthyData.thirdPartyBundles.sort(), [
		'@supertiny99/dsh-usage-dashboard',
		'@supertiny99/dsh-zcode-workbench',
		'dsh-ui-gallery',
		GUARDIAN_BUNDLE_NAME,
	].sort());
	console.log('  ✔ latest-healthy.json 成功维护');

	// 3. 模拟官方崩溃事故：触发 sanitizeProfile
	console.log('\nStep 2: 模拟 DSH 崩溃全盘禁用事故 (sanitizeProfile)...');
	// 官方重置 bundles 为仅官方包，且只留 guardian
	const sanitizedPkg = {
		...initialPkg,
		dsh: {
			profile: {
				bundles: ['@deepseek-ai/dsh-base', '@deepseek-ai/dsh-web-app', GUARDIAN_BUNDLE_NAME],
			},
		},
	};
	fs.writeFileSync(path.join(tmpProfile, 'package.json'), JSON.stringify(sanitizedPkg, null, 2));

	// 官方把 patch 重命名为 .bak 并留一个空 patch
	const bakFileName = `cordis.patch.yml.bak-${Date.now()}`;
	fs.renameSync(path.join(tmpProfile, 'cordis.patch.yml'), path.join(tmpProfile, bakFileName));
	fs.writeFileSync(path.join(tmpProfile, 'cordis.patch.yml'), '[]\n');

	// 4. 调用 getGuardianStatus 检查事故判定
	console.log('Step 3: 测试事故检测算法...');
	const status = getGuardianStatus(tmpProfile);
	assert.equal(status.isIncident, true, '应当检测到事故发生');
	assert.equal(status.disabledFromHealthy.length, 3, '应精准检出被禁用的 3 个第三方插件');
	assert.ok(status.disabledFromHealthy.includes('@supertiny99/dsh-usage-dashboard'));
	assert.ok(status.disabledFromHealthy.includes('@supertiny99/dsh-zcode-workbench'));
	assert.ok(status.disabledFromHealthy.includes('dsh-ui-gallery'));
	assert.equal(status.patchNeedsRecovery, true, '应当检测到 patch 需要恢复');
	assert.equal(status.bakFiles.length, 1);
	console.log('  ✔ 事故检测准确命中：isIncident=true，检出 3 个被停用插件，发现 patch.bak');

	// 5. 测试一键全量恢复
	console.log('\nStep 4: 测试一键全量恢复与配置挽回...');
	const restoreResult = restoreBundles(tmpProfile, status.disabledFromHealthy, true);
	assert.equal(restoreResult.ok, true);

	const restoredPkg = JSON.parse(fs.readFileSync(path.join(tmpProfile, 'package.json'), 'utf8'));
	assert.deepEqual(
		restoredPkg.dsh.profile.bundles.sort(),
		healthyBundles.sort(),
		'package.json 中的 bundles 应当已全部恢复'
	);

	const restoredPatch = fs.readFileSync(path.join(tmpProfile, 'cordis.patch.yml'), 'utf8');
	assert.equal(restoredPatch, initialPatch, 'cordis.patch.yml 应当已从 bak 成功恢复');
	console.log('  ✔ 全量恢复成功：bundles 与 patch 均还原！');

	// 6. 测试排除坏插件恢复
	console.log('\nStep 5: 测试排除特定坏插件恢复...');
	// 再次模拟事故
	fs.writeFileSync(path.join(tmpProfile, 'package.json'), JSON.stringify(sanitizedPkg, null, 2));
	// 假设 'dsh-ui-gallery' 是坏插件，用户取消勾选它
	const selectedWithoutBadPlugin = ['@supertiny99/dsh-usage-dashboard', '@supertiny99/dsh-zcode-workbench'];
	restoreBundles(tmpProfile, selectedWithoutBadPlugin, false);

	const pkgAfterExclusion = JSON.parse(fs.readFileSync(path.join(tmpProfile, 'package.json'), 'utf8'));
	const currentThird = pkgAfterExclusion.dsh.profile.bundles.filter((b) => !b.startsWith('@deepseek-ai/'));
	assert.ok(!currentThird.includes('dsh-ui-gallery'), '坏插件应当被排除');
	assert.ok(currentThird.includes('@supertiny99/dsh-usage-dashboard'), '好插件应当正常恢复');
	assert.ok(currentThird.includes('@supertiny99/dsh-zcode-workbench'), '好插件应当正常恢复');
	assert.ok(currentThird.includes(GUARDIAN_BUNDLE_NAME), '管家自身必须保留');
	console.log('  ✔ 排除坏插件针对性恢复验证通过！');

	// 7. 测试脱机应急脚本生成与执行
	console.log('\nStep 6: 测试脱机应急恢复脚本生成与运行...');
	// 再次破坏
	fs.writeFileSync(path.join(tmpProfile, 'package.json'), JSON.stringify(sanitizedPkg, null, 2));
	const scriptInfo = generateOfflineScript(tmpProfile);
	assert.ok(fs.existsSync(scriptInfo.scriptPath));

	// 脱机执行该脚本
	console.log('  -> 脱机运行 command 脚本...');
	execSync(`bash "${scriptInfo.scriptPath}"`, {
		input: '\n', // 模拟回车
		stdio: 'pipe',
	});

	const pkgAfterOfflineScript = JSON.parse(fs.readFileSync(path.join(tmpProfile, 'package.json'), 'utf8'));
	assert.deepEqual(
		pkgAfterOfflineScript.dsh.profile.bundles.sort(),
		healthyBundles.sort(),
		'脱机脚本执行后 bundles 必须完整还原'
	);
	console.log('  ✔ 脱机应急脚本成功脱机将整个 profile 复原！');

	// 8. 测试快照删除与清理
	console.log('\nStep 7: 测试快照手动删除与批量清理...');
	// 先多建几个快照
	createSnapshot(tmpProfile, 'test_snap_2');
	createSnapshot(tmpProfile, 'test_snap_3');
	createSnapshot(tmpProfile, 'test_snap_4');

	const { snapshots: snapsBeforeClean, totalSizeText } = listSnapshots(tmpProfile);
	console.log(`  -> 当前共有 ${snapsBeforeClean.length} 份快照，总大小: ${totalSizeText}`);
	assert.ok(snapsBeforeClean.length >= 4);

	// 删除单个快照
	const toDeleteId = snapsBeforeClean[0].id;
	const delRes = deleteSnapshot(tmpProfile, toDeleteId);
	assert.equal(delRes.ok, true);
	const { snapshots: snapsAfterDel } = listSnapshots(tmpProfile);
	assert.equal(snapsAfterDel.length, snapsBeforeClean.length - 1);
	console.log(`  ✔ 单个快照 ${toDeleteId} 成功删除！`);

	// 一键清理，只保留 2 份
	const cleanRes = cleanOldSnapshots(tmpProfile, 2);
	assert.equal(cleanRes.ok, true);
	const { snapshots: snapsAfterClean } = listSnapshots(tmpProfile);
	assert.equal(snapsAfterClean.length, 2);
	console.log(`  ✔ 一键清理成功，保留了 ${snapsAfterClean.length} 份最新快照！`);

	// 9. 测试手动关闭与手动激活插件功能
	console.log('\nStep 8: 测试手动关闭与手动激活指定插件...');
	// 9.1 手动关闭 dsh-ui-gallery
	const closeRes = toggleBundleState(tmpProfile, 'dsh-ui-gallery', false);
	assert.equal(closeRes.ok, true);
	const pkgAfterClose = JSON.parse(fs.readFileSync(path.join(tmpProfile, 'package.json'), 'utf8'));
	assert.ok(!pkgAfterClose.dsh.profile.bundles.includes('dsh-ui-gallery'), 'ui-gallery 应当已被手动关闭移出 bundles');
	console.log('  ✔ 手动关闭插件成功：已从 bundles 移除');

	// 9.2 手动重新激活 dsh-ui-gallery
	const activateRes = toggleBundleState(tmpProfile, 'dsh-ui-gallery', true);
	assert.equal(activateRes.ok, true);
	const pkgAfterActivate = JSON.parse(fs.readFileSync(path.join(tmpProfile, 'package.json'), 'utf8'));
	assert.ok(pkgAfterActivate.dsh.profile.bundles.includes('dsh-ui-gallery'), 'ui-gallery 应当已重新被手动激活加入 bundles');
	console.log('  ✔ 手动激活插件成功：已加入 bundles');

	// 9.3 测试保护插件管家自身不可关闭
	assert.throws(
		() => toggleBundleState(tmpProfile, GUARDIAN_BUNDLE_NAME, false),
		/不可手动关闭/,
		'关闭插件管家自身应当被拒绝抛错'
	);
	console.log('  ✔ 插件管家自身保护逻辑生效：拒绝关闭自身');

	console.log('\n🎉 全部 9 项 Host 核心逻辑测试通过！100% 达成预期！');
} catch (err) {
	console.error('❌ 测试失败:', err);
	process.exit(1);
}
