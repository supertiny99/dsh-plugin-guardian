/**
 * dsh-plugin-guardian · Client 侧入口 (client.jsx)
 *
 * 全面去除 emoji，统一使用内联矢量 SVG 图标（Feather 规范，currentColor 继承）。
 * 挂载：
 * 1. sidebar.panellist (order 70): 盾牌图标，点击切换到 main 面板
 * 2. main: 整页面板 key: 'plugin-guardian'
 */

import React, { useState, useEffect, useCallback } from 'react';
import guardianCss from './guardian.css';

/* ---------- 纯矢量 SVG 图标集 (无 emoji) ---------- */

const SvgIcon = ({ children, size = 15, className = '' }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}
		aria-hidden="true"
		style={{ flexShrink: 0 }}
	>
		{children}
	</svg>
);

const IconShield = ({ size = 16 }) => (
	<SvgIcon size={size}>
		<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
	</SvgIcon>
);

const IconSave = ({ size = 14 }) => (
	<SvgIcon size={size}>
		<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
		<polyline points="17 21 17 13 7 13 7 21" />
		<polyline points="7 3 7 8 15 8" />
	</SvgIcon>
);

const IconTerminal = ({ size = 14 }) => (
	<SvgIcon size={size}>
		<polyline points="4 17 10 11 4 5" />
		<line x1="12" y1="19" x2="20" y2="19" />
	</SvgIcon>
);

const IconRefresh = ({ size = 14 }) => (
	<SvgIcon size={size}>
		<polyline points="23 4 23 10 17 10" />
		<path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
	</SvgIcon>
);

const IconAlert = ({ size = 18 }) => (
	<SvgIcon size={size}>
		<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
		<line x1="12" y1="9" x2="12" y2="13" />
		<line x1="12" y1="17" x2="12.01" y2="17" />
	</SvgIcon>
);

const IconRestoreAll = ({ size = 14 }) => (
	<SvgIcon size={size}>
		<polyline points="1 4 1 10 7 10" />
		<path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
	</SvgIcon>
);

const IconCheck = ({ size = 14 }) => (
	<SvgIcon size={size}>
		<polyline points="20 6 9 17 4 12" />
	</SvgIcon>
);

const IconPackage = ({ size = 15 }) => (
	<SvgIcon size={size}>
		<line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
		<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
		<polyline points="3.27 6.96 12 12.01 20.73 6.96" />
		<line x1="12" y1="22.08" x2="12" y2="12" />
	</SvgIcon>
);

const IconFile = ({ size = 15 }) => (
	<SvgIcon size={size}>
		<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
		<polyline points="14 2 14 8 20 8" />
		<line x1="16" y1="13" x2="8" y2="13" />
		<line x1="16" y1="17" x2="8" y2="17" />
	</SvgIcon>
);

const IconClock = ({ size = 14 }) => (
	<SvgIcon size={size}>
		<circle cx="12" cy="12" r="10" />
		<polyline points="12 6 12 12 16 14" />
	</SvgIcon>
);

const IconTrash = ({ size = 14 }) => (
	<SvgIcon size={size}>
		<polyline points="3 6 5 6 21 6" />
		<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
	</SvgIcon>
);

const IconPower = ({ size = 14 }) => (
	<SvgIcon size={size}>
		<path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
		<line x1="12" y1="2" x2="12" y2="12" />
	</SvgIcon>
);

/* ---------- 主面板组件 ---------- */

function GuardianPanel() {
	const [status, setStatus] = useState(null);
	const [loading, setLoading] = useState(true);
	const [selectedBundles, setSelectedBundles] = useState(new Set());
	const [restorePatchFlag, setRestorePatchFlag] = useState(true);
	const [toastMsg, setToastMsg] = useState(null);
	const [busy, setBusy] = useState(false);

	const showToast = (msg) => {
		setToastMsg(msg);
		setTimeout(() => setToastMsg(null), 3500);
	};

	const fetchStatus = useCallback(async () => {
		try {
			setLoading(true);
			const res = await fetch('/plugin-guardian/status');
			if (res.ok) {
				const data = await res.json();
				setStatus(data);
				if (data.disabledFromHealthy && data.disabledFromHealthy.length > 0) {
					setSelectedBundles(new Set(data.disabledFromHealthy));
				}
			}
		} catch (err) {
			console.error('Failed to fetch guardian status:', err);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchStatus();
	}, [fetchStatus]);

	const toggleBundle = (b) => {
		const next = new Set(selectedBundles);
		if (next.has(b)) next.delete(b);
		else next.add(b);
		setSelectedBundles(next);
	};

	const handleRestore = async (bundlesToRestore, withPatch) => {
		if (bundlesToRestore.length === 0) {
			showToast('未选择任何需要恢复的插件');
			return;
		}
		try {
			setBusy(true);
			const res = await fetch('/plugin-guardian/restore', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					bundles: bundlesToRestore,
					restorePatch: withPatch,
				}),
			});
			const result = await res.json();
			if (result.ok) {
				showToast('恢复写入成功！请完全退出并重启 DSH 生效');
				await fetchStatus();
			} else {
				showToast('恢复失败: ' + (result.error || '未知错误'));
			}
		} catch (err) {
			showToast('请求失败: ' + err.message);
		} finally {
			setBusy(false);
		}
	};

	const handleCreateSnapshot = async () => {
		try {
			setBusy(true);
			const res = await fetch('/plugin-guardian/snapshot', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ reason: 'manual' }),
			});
			const data = await res.json();
			if (data.ok) {
				showToast('已成功创建当前健康快照！');
				await fetchStatus();
			}
		} catch (err) {
			showToast('创建快照失败: ' + err.message);
		} finally {
			setBusy(false);
		}
	};

	const handleRestorePatch = async (fileName) => {
		try {
			setBusy(true);
			const res = await fetch('/plugin-guardian/restore-patch', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ fileName }),
			});
			const data = await res.json();
			if (data.ok) {
				showToast('配置已成功挽回！');
				await fetchStatus();
			} else {
				showToast('挽回失败: ' + data.error);
			}
		} catch (err) {
			showToast('请求失败: ' + err.message);
		} finally {
			setBusy(false);
		}
	};

	const handleExportScript = async () => {
		try {
			setBusy(true);
			const res = await fetch('/plugin-guardian/export-script', {
				method: 'POST',
			});
			const data = await res.json();
			if (data.ok) {
				showToast(`应急脚本已生成至桌面 (${data.fileName})，系统已定位该文件`);
			}
		} catch (err) {
			showToast('导出失败: ' + err.message);
		} finally {
			setBusy(false);
		}
	};

	// 删除指定快照
	const handleDeleteSnapshot = async (id) => {
		try {
			setBusy(true);
			const res = await fetch('/plugin-guardian/delete-snapshot', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ id }),
			});
			const data = await res.json();
			if (data.ok) {
				showToast('已删除快照 ' + id);
				await fetchStatus();
			} else {
				showToast('删除失败: ' + data.error);
			}
		} catch (err) {
			showToast('请求失败: ' + err.message);
		} finally {
			setBusy(false);
		}
	};

	// 一键清理多余旧快照（保留最新 2 份）
	const handleCleanSnapshots = async () => {
		try {
			setBusy(true);
			const res = await fetch('/plugin-guardian/clean-snapshots', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ keepCount: 2 }),
			});
			const data = await res.json();
			if (data.ok) {
				showToast(`已清理 ${data.deletedCount} 份旧快照，保留了最新 ${data.retained} 份`);
				await fetchStatus();
			}
		} catch (err) {
			showToast('清理失败: ' + err.message);
		} finally {
			setBusy(false);
		}
	};

	if (loading && !status) {
		return (
			<div className="pg-container">
				<style>{guardianCss}</style>
				<div style={{ padding: 32, textAlign: 'center', color: 'var(--dsw-alias-text-tertiary)' }}>
					正在读取插件状态与快照...
				</div>
			</div>
		);
	}

	const isIncident = status?.isIncident;
	const disabledList = status?.disabledFromHealthy || [];
	const currentThird = status?.currentThirdParty || [];
	const inactiveInstalled = status?.inactiveInstalled || [];

	// 计算快照总占用（若 Host 尚未冷启动，前端自动根据快照数与 patch 大小准确估算）
	const displayTotalSize = (() => {
		if (status?.snapshotsTotalSize && status.snapshotsTotalSize !== '0 KB') {
			return status.snapshotsTotalSize;
		}
		const count = status?.snapshotsCount || 0;
		if (count === 0) return '0 KB';
		const perSnapBytes = (status?.currentPatchSize || 0) + 1500;
		return ((count * perSnapBytes) / 1024).toFixed(1) + ' KB';
	})();

	return (
		<div className="pg-container">
			<style>{guardianCss}</style>

			{/* 顶部标题栏 */}
			<div className="pg-header">
				<div className="pg-header-left">
					<div className="pg-icon-badge">
						<IconShield size={22} />
					</div>
					<div className="pg-title-wrap">
						<h2>DSH 插件管家</h2>
						<p>Profile 状态守护 · 自动快照 · 事故一键恢复 · 脱机应急修复</p>
					</div>
				</div>
				<div className="pg-actions">
					<button
						className="pg-btn"
						onClick={handleCreateSnapshot}
						disabled={busy}
						title="手动将当前所有开启的插件与配置记录为新快照"
					>
						<IconSave size={14} />
						<span>保存快照</span>
					</button>
					<button
						className="pg-btn"
						onClick={handleExportScript}
						disabled={busy}
						title="在桌面生成一个双击即可恢复的脚本，DSH 闪退不开时可用"
					>
						<IconTerminal size={14} />
						<span>导出桌面应急脚本</span>
					</button>
					<button className="pg-btn" onClick={fetchStatus} disabled={busy}>
						<IconRefresh size={14} />
						<span>刷新</span>
					</button>
				</div>
			</div>

			<div className="pg-content">
				{/* 事故告警横幅 */}
				{isIncident && (
					<div className="pg-incident-banner">
						<div className="pg-incident-header">
							<div className="pg-incident-icon">
								<IconAlert size={20} />
							</div>
							<div className="pg-incident-title">
								检测到系统此前执行了全盘禁用，发现第三方插件被停用
							</div>
						</div>
						<div className="pg-incident-desc">
							检测到上一次健康快照中激活的 <strong>{disabledList.length}</strong> 个第三方插件当前已被宿主移出激活列表。
							你可以直接一键全部恢复，或勾选排除刚才导致闪退的可疑插件：
						</div>

						{/* 插件勾选恢复列表 */}
						<div className="pg-plugin-selection-box">
							{disabledList.map((bundle) => {
								const checked = selectedBundles.has(bundle);
								return (
									<div
										key={bundle}
										className="pg-plugin-item"
										onClick={() => toggleBundle(bundle)}
									>
										<div className="pg-plugin-item-left">
											<input
												type="checkbox"
												checked={checked}
												onChange={() => {}}
												style={{ cursor: 'pointer' }}
											/>
											<IconPackage size={14} />
											<span className="pg-plugin-name">{bundle}</span>
										</div>
										<span className="pg-plugin-tag">待恢复</span>
									</div>
								);
							})}
						</div>

						{/* patch 配置同步恢复选项 */}
						{status?.patchNeedsRecovery && (
							<div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
								<input
									type="checkbox"
									id="restorePatchCheck"
									checked={restorePatchFlag}
									onChange={(e) => setRestorePatchFlag(e.target.checked)}
									style={{ cursor: 'pointer' }}
								/>
								<label htmlFor="restorePatchCheck" style={{ cursor: 'pointer', color: 'var(--dsw-alias-text-primary)' }}>
									同时从最新的 <code>cordis.patch.yml.bak</code> 中找回被清空的用户配置
								</label>
							</div>
						)}

						<div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
							<button
								className="pg-btn pg-btn-primary"
								onClick={() => handleRestore(disabledList, restorePatchFlag)}
								disabled={busy}
							>
								<IconRestoreAll size={14} />
								<span>一键全量恢复所有插件 ({disabledList.length})</span>
							</button>
							<button
								className="pg-btn"
								onClick={() => handleRestore(Array.from(selectedBundles), restorePatchFlag)}
								disabled={busy || selectedBundles.size === 0}
							>
								<IconCheck size={14} />
								<span>恢复勾选插件 ({selectedBundles.size})</span>
							</button>
						</div>
					</div>
				)}

				{/* 状态总览卡片 */}
				<div className="pg-card">
					<div className="pg-card-title">
						<span>当前 Profile 插件运行状态</span>
						<span className="pg-badge-healthy">
							<span className="pg-dot" />
							{isIncident ? '处于恢复排查模式' : '健康运行中'}
						</span>
					</div>
					<div style={{ fontSize: 13, color: 'var(--dsw-alias-text-secondary)', lineHeight: 1.6 }}>
						当前共激活 <strong>{status?.currentBundles?.length || 0}</strong> 个组合行（含{' '}
						<strong>{currentThird.length}</strong> 个第三方插件）。
						{status?.latestHealthy ? (
							<span> 最近健康快照建立于：<strong>{status.latestHealthy.timeString}</strong>。</span>
						) : (
							<span> 尚未建立健康基准快照。</span>
						)}
					</div>

					<div className="pg-list" style={{ marginTop: 8 }}>
						{currentThird.map((bundle) => (
							<div key={bundle} className="pg-row">
								<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
									<IconPackage size={15} />
									<span className="pg-row-name">{bundle}</span>
								</div>
								<span className="pg-plugin-tag" style={{ background: 'rgba(22, 163, 74, 0.1)', color: '#16a34a' }}>
									已激活
								</span>
							</div>
						))}
						{currentThird.length === 0 && (
							<div style={{ padding: '12px 0', fontSize: 13, color: 'var(--dsw-alias-text-tertiary)' }}>
								暂无已激活的第三方插件。
							</div>
						)}
					</div>
				</div>

				{/* 已安装但未激活的插件 (如果有) */}
				{inactiveInstalled.length > 0 && !isIncident && (
					<div className="pg-card">
						<div className="pg-card-title">
							<span>已在 dependencies 安装、但未激活的第三方插件 ({inactiveInstalled.length})</span>
						</div>
						<div className="pg-list">
							{inactiveInstalled.map((pkg) => (
								<div key={pkg} className="pg-row">
									<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
										<IconPower size={14} />
										<span className="pg-row-name">{pkg}</span>
									</div>
									<button
										className="pg-btn"
										style={{ padding: '4px 10px', fontSize: 12 }}
										onClick={() => handleRestore([...currentThird, pkg], false)}
										disabled={busy}
									>
										一键激活此插件
									</button>
								</div>
							))}
						</div>
					</div>
				)}

				{/* 用户配置 (.bak) 保护区 */}
				{status?.bakFiles?.length > 0 && (
					<div className="pg-card">
						<div className="pg-card-title">
							<span>cordis.patch.yml 配置备份历史 ({status.bakFiles.length} 份)</span>
						</div>
						<div style={{ fontSize: 12, color: 'var(--dsw-alias-text-tertiary)' }}>
							当 DSH 发生崩溃恢复时，原配置会被重命名为 bak 保存。你可以随时对比并找回配置：
						</div>
						<div className="pg-list">
							{status.bakFiles.slice(0, 3).map((bak) => (
								<div key={bak.fileName} className="pg-row">
									<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
										<IconFile size={16} />
										<div>
											<div className="pg-row-name">{bak.fileName}</div>
											<div className="pg-row-meta">
												时间: {bak.mtimeString} · 大小: {bak.size} 字节
											</div>
										</div>
									</div>
									<button
										className="pg-btn"
										style={{ padding: '4px 10px', fontSize: 12 }}
										onClick={() => handleRestorePatch(bak.fileName)}
										disabled={busy}
									>
										从备份覆盖还原配置
									</button>
								</div>
							))}
						</div>
					</div>
				)}

				{/* 历史快照列表 */}
				<div className="pg-card">
					<div className="pg-card-title">
						<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
							<span>历史健康快照 ({status?.snapshotsCount || 0})</span>
							<span style={{ fontSize: 12, fontWeight: 'normal', color: 'var(--dsw-alias-text-tertiary)' }}>
								占用磁盘: {displayTotalSize}
							</span>
						</div>
						{status?.snapshotsCount > 2 && (
							<button
								className="pg-btn"
								style={{ padding: '3px 8px', fontSize: 12 }}
								onClick={handleCleanSnapshots}
								disabled={busy}
								title="仅保留最近 2 份快照，清理更早的历史记录"
							>
								<IconTrash size={12} />
								<span>清理旧快照</span>
							</button>
						)}
					</div>
					<div className="pg-list">
						{status?.recentSnapshots?.map((snap) => (
							<div key={snap.id} className="pg-row">
								<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
									<IconClock size={15} />
									<div>
										<div className="pg-row-name" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
											<span>{snap.timeString}</span>
											<span style={{ fontSize: 11, color: 'var(--dsw-alias-text-tertiary)' }}>
												({snap.sizeText || (((status?.currentPatchSize || 0) + 1500) / 1024).toFixed(1) + ' KB'})
											</span>
										</div>
										<div className="pg-row-meta">
											原因: {snap.reason === 'startup_auto' ? '启动自动快照' : snap.reason === 'manual' ? '手动快照' : snap.reason} · 第三方插件数: {snap.thirdPartyCount}
										</div>
									</div>
								</div>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
									<button
										className="pg-btn"
										style={{ padding: '4px 10px', fontSize: 12 }}
										onClick={() => handleRestore(snap.thirdPartyBundles, false)}
										disabled={busy || snap.thirdPartyCount === 0}
										title="将插件激活状态回滚为此快照"
									>
										恢复为此快照
									</button>
									<button
										className="pg-btn"
										style={{ padding: '4px 8px', fontSize: 12, color: 'var(--dsw-alias-intent-danger, #ef4444)' }}
										onClick={() => handleDeleteSnapshot(snap.id)}
										disabled={busy}
										title="删除此份快照"
									>
										<IconTrash size={13} />
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Toast 提示浮层 */}
			{toastMsg && <div className="pg-toast">{toastMsg}</div>}
		</div>
	);
}

/* ---------- 侧栏入口图标 (18x18 矢量 SVG 盾牌) ---------- */

function PanelIcon({ size = 20, active = false }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={active ? 2.2 : 1.6}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
		</svg>
	);
}

export const inject = ['slots'];

export function apply(ctx) {
	ctx.slots.inject('sidebar.panellist', () =>
		ctx.slots.register(
			{ name: 'sidebar.panellist', id: 'plugin-guardian', order: 70, label: '插件管家' },
			PanelIcon
		)
	);

	ctx.slots.inject('main', () =>
		ctx.slots.register(
			{ name: 'main', key: 'plugin-guardian' },
			GuardianPanel
		)
	);
}
