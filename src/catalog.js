/**
 * plugin-guardian · 精选插件推荐表 (catalog.js)
 *
 * 预置官方与社区经过严格实测的稳定插件，降低用户查找与盲输门槛。
 */

export const FEATURED_CATALOG = [
	{
		id: 'usage-dashboard',
		name: '@supertiny99/dsh-usage-dashboard',
		title: '用量面板',
		category: '效率统计',
		author: 'supertiny99',
		description: 'Token 消耗统计、会话趋势图、模型四桶用量分布与工具调用 Top5 排行。',
		spec: '@supertiny99/dsh-usage-dashboard',
		badge: '精选推荐',
	},
	{
		id: 'zcode-workbench',
		name: '@supertiny99/dsh-zcode-workbench',
		title: 'ZCode 工作台',
		category: '开发流',
		author: 'supertiny99',
		description: '聚合本地 70+ ZCode 项目动态、任务列表与完整历史会话只读回放。',
		spec: '@supertiny99/dsh-zcode-workbench',
		badge: '研发利器',
	},
	{
		id: 'ui-gallery',
		name: 'dsh-ui-gallery',
		title: '组件画廊',
		category: '开发样板',
		author: 'supertiny',
		description: 'DSH 官方 ui-primitives 70+ React 原子组件活体演示与 external 模块参考。',
		spec: 'dsh-ui-gallery',
		badge: '开发者必备',
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
