/**
 * plugin-guardian · 精选插件推荐表 (catalog.js)
 *
 * 预置官方与社区经过严格实测的稳定插件，降低用户查找与盲输门槛。
 */

export const FEATURED_CATALOG = [
	{
		id: 'dsh-pet',
		name: 'dsh-pet',
		title: '桌面大肥鱼',
		category: '桌面互动',
		author: 'pc2005-cloud',
		description: '吃白饭的蓝色大肥鱼桌面伴侣，支持零食互动、魔方把玩、状态碎碎念与悬浮挂件。',
		spec: 'dsh-pet',
		badge: '社区热门',
	},
	{
		id: 'whale-pet',
		name: 'dsh-plugin-whale-pet',
		title: '桌面小鲸鱼',
		category: '个性趣味',
		author: 'deepseek-ai',
		description: '官方桌面趣味互动挂件，伴随编码与对话状态做出可爱微表情。',
		spec: 'dsh-plugin-whale-pet',
		badge: '官方精选',
	},
	{
		id: 'media-desk',
		name: 'dsh-media-desk',
		title: '多媒体工作台',
		category: '多模态',
		author: 'deepseek-ai',
		description: '多媒体附件速览、文件快速检视与模型辅助多模态工具。',
		spec: 'dsh-media-desk',
		badge: '官方精选',
	},
	{
		id: 'dsh-tui',
		name: '@deepseek-harness-tui/dsh-tui',
		title: '终端工作台 (TUI)',
		category: '开发流',
		author: 'ccchimneyyy',
		description: '面向终端用户的沉浸式命令行界面，支持会话浏览、实时交互与工具流监控。',
		spec: '@deepseek-harness-tui/dsh-tui',
		badge: '终端神器',
	},
	{
		id: 'changelog-viewer',
		name: '@supertiny99/dsh-changelog-viewer',
		title: '更新日志 (Changelog)',
		category: '系统工具',
		author: 'supertiny99',
		description: 'DSH 官方版本更新日志浏览与更新前置确认：聚合 Releases 时间线、中英双语与 Markdown 详情，新版本更新前先看变更再决定下载。',
		spec: 'file:/Users/supertiny/Myproject/dsh/plugin/changelog-viewer/supertiny99-dsh-changelog-viewer-0.1.0.tgz',
		badge: '官方精选',
	},
];

/**
 * 根据当前 profile 已安装依赖与已激活 bundles 丰富 catalog 状态
 */
export function getEnrichedCatalog(manifest = {}) {
	const dependencies = manifest.dependencies || {};
	const bundles = manifest.dsh?.profile?.bundles || [];

	return FEATURED_CATALOG.map((item) => {
		const isInstalled = !!dependencies[item.name];
		const isActive = bundles.includes(item.name);
		const installedSpec = dependencies[item.name] || null;

		return {
			...item,
			isInstalled,
			isActive,
			installedSpec,
		};
	});
}
