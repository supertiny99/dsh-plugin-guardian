/**
 * dsh-plugin-guardian · 安全路由包装器 (safe-route.js)
 *
 * 职责：
 * 1. 统一捕获所有同步与异步 Promise rejection，绝不让未处理异常抛向 Cordis 宿主；
 * 2. 统一 API 返回格式规范：{ ok: boolean, data?: any, error?: string, code?: string }；
 * 3. 记录打标日志，生产环境隐藏敏感内部堆栈。
 */

export function safeJson(res, statusCode, body) {
	try {
		if (res.headersSent) return;
		res.writeHead(statusCode, {
			'content-type': 'application/json; charset=utf-8',
			'cache-control': 'no-store',
		});
		res.end(JSON.stringify(body));
	} catch (e) {
		console.error('[plugin-guardian] safeJson write error:', e);
	}
}

/**
 * 包装 Host API 处理器
 * @param {Function} handler 业务逻辑函数 (req, res, url, pathname) => Promise<any>
 * @param {string} routeName 路由标识，用于日志
 */
export function wrapHandler(handler, routeName = 'unknown') {
	return async (req, res, url, pathname) => {
		try {
			const result = await handler(req, res, url, pathname);
			// 如果 handler 已经手动响应，则直接返回
			if (res.headersSent) return;
			// 否则以标准 200 成功结构返回
			return safeJson(res, 200, result !== undefined ? result : { ok: true });
		} catch (err) {
			console.error(`[plugin-guardian][Error][${routeName}]`, err?.stack || err?.message || err);
			if (!res.headersSent) {
				return safeJson(res, 200, {
					ok: false,
					error: err?.message || '内部服务处理失败',
					code: err?.code || 'INTERNAL_ERROR',
					route: routeName,
				});
			}
		}
	};
}
