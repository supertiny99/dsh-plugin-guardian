/**
 * test-update-upgrade.mjs · 插件更新升级与假更新拦截单元测试 (pg-CHG-004)
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import { executePluginInstall } from './src/installer-core.js';
import { getInstalledPackagesMeta, queryNpmLatestVersion } from './src/version-service.js';

console.log('🧪 开始运行 Plugin Guardian 更新与升级流加固测试 (pg-CHG-004)...\n');

const tmpProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'dsh-update-test-'));

try {
	// 准备初始 Profile
	const initialManifest = {
		name: 'dsh-profile-test',
		private: true,
		dsh: {
			profile: {
				bundles: ['@deepseek-ai/dsh-base'],
			},
		},
		dependencies: {},
	};
	fs.writeFileSync(path.join(tmpProfile, 'package.json'), JSON.stringify(initialManifest, null, 2), 'utf8');

	// Step 1: 测试全新安装 (New Install)
	console.log('Step 1: 测试全新安装记录版本...');
	const resInstall = await executePluginInstall(tmpProfile, '@supertiny99/dsh-usage-dashboard@0.1.1');
	assert.equal(resInstall.ok, true, '全新安装应当成功');
	assert.equal(resInstall.isNewInstall, true, '应当标记为全新安装');
	assert.equal(resInstall.upgraded, false, '全新安装不应视为升级');
	assert.equal(resInstall.toVersion, '0.1.1', '安装后版本应当为 0.1.1');
	assert.equal(resInstall.needRestart, true, '全新安装需要重启');
	console.log('  ✔ 全新安装版本记录与状态识别验证通过！');

	// Step 2: 测试真实版本升级 (Upgrade 0.1.1 -> 0.2.0)
	console.log('\nStep 2: 测试真实版本升级检测 (0.1.1 -> 0.2.0)...');
	const resUpgrade = await executePluginInstall(tmpProfile, '@supertiny99/dsh-usage-dashboard@0.2.0');
	assert.equal(resUpgrade.ok, true, '版本升级应当成功');
	assert.equal(resUpgrade.isNewInstall, false, '已存在包不应标记为全新安装');
	assert.equal(resUpgrade.upgraded, true, '应当明确识别为升级 (upgraded: true)');
	assert.equal(resUpgrade.fromVersion, '0.1.1', '旧版本应当为 0.1.1');
	assert.equal(resUpgrade.toVersion, '0.2.0', '新版本应当为 0.2.0');
	assert.equal(resUpgrade.needRestart, true, '升级成功后必须提示重启');
	console.log('  ✔ 真实版本升级与 fromVersion/toVersion 识别验证通过！');

	// Step 3: 测试未发生变化的假更新拦截 (No-Op Detection)
	console.log('\nStep 3: 测试未发生变化的重复安装拦截 (Already up-to-date)...');
	const resNoOp = await executePluginInstall(tmpProfile, '@supertiny99/dsh-usage-dashboard@0.2.0');
	assert.equal(resNoOp.ok, true, '重复安装调用成功返回');
	assert.equal(resNoOp.upgraded, false, '相同版本安装不应标记为 upgraded');
	assert.equal(resNoOp.isNoOp, true, '应当明确识别为无物理变化的无操作 (isNoOp: true)');
	assert.equal(resNoOp.needRestart, false, '未发生版本变化无需提示重启');
	console.log('  ✔ 假更新与已是最新版本拦截验证通过！');

	// Step 4: 测试已安装包裸名输入智能自动决议最新版本
	console.log('\nStep 4: 测试已安装包裸名安装自动补齐最新版本...');
	// 使用独立目录测试裸包名自动决议
	const step4Profile = fs.mkdtempSync(path.join(os.tmpdir(), 'dsh-step4-test-'));
	try {
		fs.writeFileSync(
			path.join(step4Profile, 'package.json'),
			JSON.stringify({
				name: 'step4-profile',
				private: true,
				dependencies: { '@supertiny99/dsh-usage-dashboard': '0.1.1' },
			}, null, 2),
			'utf8'
		);
		const nodeModulesPkg = path.join(step4Profile, 'node_modules', '@supertiny99', 'dsh-usage-dashboard');
		fs.mkdirSync(nodeModulesPkg, { recursive: true });
		fs.writeFileSync(path.join(nodeModulesPkg, 'package.json'), JSON.stringify({ name: '@supertiny99/dsh-usage-dashboard', version: '0.1.1' }));

		// 传入裸包名（不带版本号）
		const resAutoUpgrade = await executePluginInstall(step4Profile, '@supertiny99/dsh-usage-dashboard');
		assert.equal(resAutoUpgrade.ok, true, '裸包名升级应当成功');
		assert.equal(resAutoUpgrade.upgraded, true, '裸包名应当自动查到远端最新版并成功升级');
		assert.equal(resAutoUpgrade.fromVersion, '0.1.1', '升级前版本为 0.1.1');
		assert.equal(resAutoUpgrade.toVersion, '0.2.0', '升级后版本为 0.2.0');
		assert.ok(resAutoUpgrade.spec.includes('@0.2.0'), '安装 spec 应当自动补全版本号');
		console.log('  ✔ 已装插件输入裸包名自动决议为最新版本验证通过！');
	} finally {
		fs.rmSync(step4Profile, { recursive: true, force: true });
	}

	// Step 5: 验证前端 client.jsx 更新按钮传参已消除裸名
	console.log('\nStep 5: 静态审查 client.jsx 更新传参规范性...');
	const clientCode = fs.readFileSync(path.join(process.cwd(), 'src', 'client.jsx'), 'utf8');
	assert.ok(
		clientCode.includes('handleInstallPlugin(`${bundle}@${upInfo.latestVersion}`)'),
		'已激活列表必须使用带版本号的 spec 调用 handleInstallPlugin'
	);
	assert.ok(
		clientCode.includes('handleInstallPlugin(`${pkg}@${upInfo.latestVersion}`)'),
		'未开启列表必须使用带版本号的 spec 调用 handleInstallPlugin'
	);
	assert.ok(
		!clientCode.includes('onClick={() => handleInstallPlugin(bundle)}'),
		'禁止出现向 handleInstallPlugin 传递裸 bundle 的情况'
	);
	assert.ok(
		!clientCode.includes('onClick={() => handleInstallPlugin(pkg)}'),
		'禁止出现向 handleInstallPlugin 传递裸 pkg 的情况'
	);
	console.log('  ✔ 前端更新调用带版本号静态审查 100% 合规！');

	console.log('\n🎉 全部 5 项更新与升级流加固测试 100% 通过！');
} finally {
	fs.rmSync(tmpProfile, { recursive: true, force: true });
}
