import React from 'react';

/**
 * 插件管家专用 ErrorBoundary 容错边界组件
 * 遇到子组件意外抛错时，降级展示友好错误卡片与一键刷新/应急后台恢复通道，杜绝整页白屏
 */
export class GuardianErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}

	componentDidCatch(error, errorInfo) {
		console.error('[Plugin Guardian Client ErrorBoundary]', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback(this.state.error, () => this.setState({ hasError: false, error: null }));
			}

			return React.createElement(
				'div',
				{
					style: {
						padding: '24px',
						margin: '16px',
						border: '1px solid var(--dsw-alias-border-danger, #ef4444)',
						borderRadius: '8px',
						background: 'var(--dsw-alias-bg-subtle, #1a1a1a)',
						color: 'var(--dsw-alias-text-primary, #fff)',
					},
				},
				React.createElement(
					'div',
					{ style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' } },
					React.createElement(
						'span',
						{ style: { fontSize: '18px', fontWeight: 600, color: 'var(--dsw-alias-text-danger, #ef4444)' } },
						'⚠️ 插件管家渲染捕获到异常'
					)
				),
				React.createElement(
					'p',
					{ style: { fontSize: '13px', color: 'var(--dsw-alias-text-secondary, #999)', marginBottom: '16px' } },
					'当前渲染模块出现意外错误：',
					this.state.error?.message || '未知错误',
					'。核心防灾快照与数据不受影响。'
				),
				React.createElement(
					'div',
					{ style: { display: 'flex', gap: '12px' } },
					React.createElement(
						'button',
						{
							className: 'pg-btn pg-btn-primary',
							onClick: () => {
								this.setState({ hasError: false, error: null });
								window.location.reload();
							},
						},
						'刷新重试'
					),
					React.createElement(
						'button',
						{
							className: 'pg-btn',
							onClick: () => {
								navigator.clipboard?.writeText(this.state.error?.stack || this.state.error?.message || '');
								alert('已复制错误堆栈信息至剪贴板');
							},
						},
						'复制错误信息'
					)
				)
			);
		}

		return this.props.children;
	}
}
