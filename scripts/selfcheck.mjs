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
