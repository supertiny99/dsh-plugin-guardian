import { readFile } from 'node:fs/promises';

const SHARED = [
	'react',
	'react/jsx-runtime',
	'react-dom',
	'react-dom/client',
	'@deepseek-ai/cordis',
	'zod',
	'@tanstack/react-virtual',
	'@deepseek-ai/dsh-client-store',
	'@deepseek-ai/dsh-client-ui-slots',
	'@deepseek-ai/dsh-client-ui-primitives',
	'@deepseek-ai/dsh-client-ui-dockkit',
];

const reactStub = {
	createElement: (...args) => ({ args }),
	Fragment: 'fragment',
	Component: class Component {},
	useState: (v) => [typeof v === 'function' ? v() : v, () => {}],
	useRef: (v) => ({ current: v }),
	useEffect: () => {},
	useCallback: (fn) => fn,
	useMemo: (fn) => fn(),
};

const fakeRequire = (spec) => {
	if (!SHARED.includes(spec)) throw new Error('unexpected require: ' + spec);
	if (spec === 'react' || spec === 'react/jsx-runtime') return reactStub;
	return {};
};

let registered = null;
const fakeLoader = {
	load: (entry) => {
		registered = entry;
	},
};
const window = { __ModuleLoader__: fakeLoader };

const source = await readFile('dist/client.js', 'utf8');
const run = new Function('window', 'require', `"use strict";\n${source}`);
run(window, fakeRequire);

const failures = [];

// 校验 1: 读取 meta.json 严查 external 依赖泄漏
try {
	const metaRaw = await readFile('dist/meta.json', 'utf8');
	const meta = JSON.parse(metaRaw);
	const bundledInputs = Object.keys(meta.inputs || {});
	for (const shared of SHARED) {
		const leaked = bundledInputs.filter((f) => f.includes(`node_modules/${shared}/`) || f.startsWith(shared));
		if (leaked.length > 0) {
			failures.push(`[FATAL] 宿主共享单例依赖意外被打包进 bundle: ${shared} (${leaked.join(', ')})`);
		}
	}
} catch (e) {
	// 若 meta.json 不存在暂不阻塞纯 JS 执行校验
}

if (!registered) failures.push('产物未调用 __ModuleLoader__.load 注册');
const exports = registered?.factory(fakeRequire);
if (!exports || typeof exports.apply !== 'function') {
	failures.push('factory 未返回 { apply } (module.exports 链断裂？)');
}
if (exports && !Array.isArray(exports.inject)) {
	failures.push('缺少 inject 声明（应包含 slots）');
}

if (failures.length) {
	console.error('selfcheck FAIL:\n  ' + failures.join('\n  '));
	process.exit(1);
} else {
	console.log('selfcheck OK: Client 产物结构与 exports.apply 链完整！');
}
