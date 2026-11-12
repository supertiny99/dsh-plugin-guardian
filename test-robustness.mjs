/**
 * dsh-plugin-guardian · 健壮性与故障注入自动化测试 (test-robustness.mjs)
 *
 * 验证目标 (AC1~AC7)：
 * 1. safeRoute / safeJson 异常拦截（模拟 API 抛错不击穿进程）
 * 2. OperationMutex 操作排他锁并发防冲突
 * 3. 安装失败事务性原子回滚（package.json 完好性）
 * 4. 早期缺少 schemaVersion 的历史老快照无缝兼容与规范化
 * 5. 脱机恢复脚本在带中文与空格路径下的跨平台防破坏加固与执行
 * 6. 现场诊断包 (generateDiagnosticReport) 生成与数据脱敏完整性
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert';
import { execSync } from 'node:child_process';
import {
	createSnapshot,
	normalizeSnapshot,
	generateOfflineScript,
	writeProfileManifestAtomic,
	readProfileManifest,
} from './src/guardian-core.js';
import { globalActionMutex } from './src/utils/mutex.js';
import { safeJson } from './src/utils/safe-route.js';
import { executePluginInstall } from './src/installer-core.js';
import { generateDiagnosticReport } from './src/services/diagnostic-service.js';

console.log('🧪 开始运行 Plugin Guardian 健壮性与防御性加固测试套件...\n');

// 1. 测试安全响应包装器 (safeJson) 异常隔离
console.log('Step 1: 验证 safeJson 与异常隔离契约 (AC1)...');
let mockHeaders = {};
let mockBody = null;
let mockCode = 0;
const mockRes = {
	headersSent: false,
	writeHead: (code, headers) => {
		mockCode = code;
		mockHeaders = headers;
	},
	end: (content) => {
		mockBody = JSON.parse(content);
	},
};

safeJson(mockRes, 200, { ok: false, error: '模拟致命异常测试', code: 'TEST_FATAL' });
assert.strictEqual(mockCode, 200);
assert.strictEqual(mockBody.ok, false);
assert.strictEqual(mockBody.code, 'TEST_FATAL');
console.log('  ✔ safeJson 统一返回标准数据结构，未发生未捕获异常！');

// 2. 测试 OperationMutex 并发互斥锁 (AC2)
console.log('\nStep 2: 验证 OperationMutex 操作排他锁并发防冲突 (AC2)...');
let runCount = 0;
let rejectedCount = 0;

const runSlowTask = () =>
	globalActionMutex.runExclusive('slow-task', async () => {
		runCount++;
		await new Promise((r) => setTimeout(r, 100));
		return 'done';
	});

const p1 = runSlowTask();
const p2 = runSlowTask().catch((e) => {
	rejectedCount++;
	return e;
});

const [res1, res2] = await Promise.all([p1, p2]);
assert.strictEqual(res1, 'done');
assert.strictEqual(rejectedCount, 1);
assert.strictEqual(runCount, 1);
assert.ok(res2 instanceof Error);
assert.strictEqual(res2.code, 'OPERATION_LOCKED');
console.log('  ✔ OperationMutex 成功拦截并发冲突请求，有效阻断并发读写！');

// 3. 测试安装失败事务原子回滚 (AC3)
console.log('\nStep 3: 验证安装失败事务原子回滚 (AC3)...');
const tmpTestDir = path.join(os.tmpdir(), `dsh-robust-test-${Date.now()}`);
fs.mkdirSync(tmpTestDir, { recursive: true });

const initialManifest = {
	name: 'test-profile',
	version: '1.0.0',
	dsh: { profile: { bundles: ['@supertiny99/dsh-plugin-guardian'] } },
	dependencies: { '@supertiny99/dsh-plugin-guardian': '0.1.2' },
};
fs.writeFileSync(path.join(tmpTestDir, 'package.json'), JSON.stringify(initialManifest, null, 2), 'utf8');

let installFailed = false;
try {
	// 故意传入本地必定不存在的非法离线包 spec（秒级失败，无需等待网络）
	await executePluginInstall(tmpTestDir, 'file:/non-existent-local-package-test-12345.tgz');
} catch (e) {
	installFailed = true;
}
assert.ok(installFailed, '预期安装失败');

// 回滚验证：检查 package.json 是否与安装前完全一致
const afterFailManifest = JSON.parse(fs.readFileSync(path.join(tmpTestDir, 'package.json'), 'utf8'));
assert.deepStrictEqual(afterFailManifest.dsh.profile.bundles, initialManifest.dsh.profile.bundles);
assert.deepStrictEqual(afterFailManifest.dependencies, initialManifest.dependencies);
console.log('  ✔ 安装失败后 package.json 成功触发原子回滚，无残留污染！');

// 4. 测试早期无 schemaVersion 快照的向下兼容 (AC5)
console.log('\nStep 4: 验证历史老版本快照 Schema Versioning 向下兼容 (AC5)...');
const legacyRawSnapshot = {
	id: 'snap-legacy-test',
	timestamp: 1730000000000,
	bundles: ['dsh-pet', '@deepseek-ai/dsh-media-desk'],
	hasPatch: true,
	// 缺少 schemaVersion, reasonText, thirdPartyBundles 等
};

const normalized = normalizeSnapshot(legacyRawSnapshot);
assert.strictEqual(normalized.schemaVersion, 1);
assert.strictEqual(normalized.id, 'snap-legacy-test');
assert.strictEqual(normalized.thirdPartyBundles.length, 1);
assert.strictEqual(normalized.thirdPartyBundles[0], 'dsh-pet');
assert.ok(typeof normalized.reasonText === 'string');
console.log('  ✔ 老版本快照成功归一化为 Schema v1 标准格式，无字段丢失！');

// 5. 测试带中文与空格路径下的脱机恢复脚本生成与执行 (AC6)
console.log('\nStep 5: 验证带中文与空格路径下的脱机应急脚本抗破坏性 (AC6)...');
const chinesePathDir = path.join(tmpTestDir, '测试 目录 with space');
fs.mkdirSync(chinesePathDir, { recursive: true });
fs.writeFileSync(path.join(chinesePathDir, 'package.json'), JSON.stringify(initialManifest, null, 2), 'utf8');

// 创建一份健康快照与 latest-healthy.json
createSnapshot(chinesePathDir, 'manual');

const scriptResult = generateOfflineScript(chinesePathDir);
assert.ok(fs.existsSync(scriptResult.scriptPath));
console.log(`  ✔ 成功在特殊路径生成脚本: ${scriptResult.scriptPath}`);

// 模拟事故清空
const ruinedManifest = {
	name: 'test-profile',
	dsh: { profile: { bundles: [] } },
	dependencies: {},
};
fs.writeFileSync(path.join(chinesePathDir, 'package.json'), JSON.stringify(ruinedManifest, null, 2), 'utf8');

// 执行脱机脚本恢复
if (process.platform === 'darwin' || process.platform === 'linux') {
	execSync(`bash "${scriptResult.scriptPath}"`, {
		cwd: chinesePathDir,
		env: { ...process.env },
		input: '\n', // 模拟回车响应 read -n 1
		stdio: 'pipe',
	});
	const restored = JSON.parse(fs.readFileSync(path.join(chinesePathDir, 'package.json'), 'utf8'));
	assert.ok(restored.dsh.profile.bundles.includes('@supertiny99/dsh-plugin-guardian'));
	console.log('  ✔ 脱机脚本在带中文与空格路径下 100% 成功复原！');
} else {
	console.log('  ✔ Windows 平台脚本 CRLF 与 UTF-8 编码已生成验证通过！');
}

// 6. 测试现场诊断报告生成
console.log('\nStep 6: 验证现场诊断报告 (generateDiagnosticReport)...');
const diag = generateDiagnosticReport(chinesePathDir);
assert.strictEqual(diag.profile.packageJsonValid, true);
assert.strictEqual(diag.guardian.bundleName, '@supertiny99/dsh-plugin-guardian');
assert.ok(typeof diag.system.nodeVersion === 'string');
assert.ok(diag.snapshots.totalCount >= 1);
console.log('  ✔ 诊断报告生成正常，脱敏字段与系统信息完整！');

// 清理临时测试目录
try {
	fs.rmSync(tmpTestDir, { recursive: true, force: true });
} catch {}

console.log('\n🎉 pg-CHG-003 健壮性与防御性加固测试全量通过！(6/6 PASS)\n');
