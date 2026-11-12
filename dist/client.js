window.__ModuleLoader__.load({id:"@supertiny99/dsh-plugin-guardian",factory:(require)=>{const module={exports:{}};const exports=module.exports;
var za=Object.create;var I=Object.defineProperty;var Na=Object.getOwnPropertyDescriptor;var Sa=Object.getOwnPropertyNames;var _a=Object.getPrototypeOf,Ca=Object.prototype.hasOwnProperty;var Ia=(t,i)=>{for(var o in i)I(t,o,{get:i[o],enumerable:!0})},aa=(t,i,o,c)=>{if(i&&typeof i=="object"||typeof i=="function")for(let l of Sa(i))!Ca.call(t,l)&&l!==o&&I(t,l,{get:()=>i[l],enumerable:!(c=Na(i,l))||c.enumerable});return t};var ea=(t,i,o)=>(o=t!=null?za(_a(t)):{},aa(i||!t||!t.__esModule?I(o,"default",{value:t,enumerable:!0}):o,t)),Ta=t=>aa(I({},"__esModule",{value:!0}),t);var Ka={};Ia(Ka,{apply:()=>qa,inject:()=>Ga});module.exports=Ta(Ka);var a=ea(require("react"),1);var M=`/* plugin-guardian \xB7 \u6837\u5F0F\u8868 (token \u5316\uFF0C\u660E\u6697\u81EA\u9002\u5E94) */

.pg-container {
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	background: var(--dsw-alias-surface-overlay, #ffffff);
	color: var(--dsw-alias-text-primary, #1e293b);
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
	box-sizing: border-box;
	overflow: hidden;
}

.pg-header {
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px 28px;
	gap: 16px;
	border-bottom: 1px solid var(--dsw-alias-border-subtle, rgba(0, 0, 0, 0.08));
	background: var(--dsw-alias-surface-overlay, #ffffff);
	position: sticky;
	top: 0;
	z-index: 10;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.pg-header-left {
	display: flex;
	align-items: center;
	gap: 14px;
}

.pg-icon-badge {
	width: 42px;
	height: 42px;
	border-radius: 10px;
	background: var(--dsw-alias-accent-subtle, rgba(59, 130, 246, 0.12));
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 22px;
}

.pg-title-wrap h2 {
	margin: 0;
	font-size: 18px;
	font-weight: 600;
	color: var(--dsw-alias-text-primary, #0f172a);
}

.pg-title-wrap p {
	margin: 3px 0 0 0;
	font-size: 12px;
	color: var(--dsw-alias-text-tertiary, #64748b);
}

.pg-actions {
	display: flex;
	align-items: center;
	gap: 10px;
	flex-wrap: wrap;
	justify-content: flex-end;
}

.pg-btn {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 7px 14px;
	font-size: 13px;
	font-weight: 500;
	border-radius: 6px;
	border: 1px solid var(--dsw-alias-border-subtle, rgba(0, 0, 0, 0.15));
	background: var(--dsw-alias-control-bg-neutral, #ffffff);
	color: var(--dsw-alias-text-primary, #1e293b);
	cursor: pointer;
	transition: background-color 0.15s ease, border-color 0.15s ease;
}

.pg-btn:hover {
	background: var(--dsw-alias-control-bg-neutral-hover, rgba(0, 0, 0, 0.05));
	border-color: var(--dsw-alias-border-strong, rgba(0, 0, 0, 0.3));
}

.pg-btn:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

.pg-btn-primary {
	background: var(--dsw-alias-accent-primary, #2563eb);
	color: #ffffff;
	border-color: transparent;
}

.pg-btn-primary:hover {
	background: var(--dsw-alias-accent-hover, #1d4ed8);
}

.pg-btn-danger {
	background: var(--dsw-alias-intent-danger, #ef4444);
	color: #ffffff;
	border-color: transparent;
}

.pg-btn-danger:hover:not(:disabled) {
	background: #dc2626;
}

.pg-btn-danger-outline {
	background: transparent;
	color: var(--dsw-alias-intent-danger, #ef4444);
	border: 1px solid rgba(239, 68, 68, 0.3);
}

.pg-btn-danger-outline:hover:not(:disabled) {
	background: rgba(239, 68, 68, 0.08);
	border-color: var(--dsw-alias-intent-danger, #ef4444);
}

.pg-content {
	flex: 1;
	min-height: 0;
	overflow-y: auto;
	padding: 24px 28px;
	display: flex;
	flex-direction: column;
	gap: 20px;
}

/* \u4E8B\u6545\u544A\u8B66\u6A2A\u5E45 (Incident Banner) */
.pg-incident-banner {
	background: var(--dsw-alias-surface-sunken, rgba(239, 68, 68, 0.08));
	border: 1px solid var(--dsw-alias-intent-danger, rgba(239, 68, 68, 0.4));
	border-radius: 10px;
	padding: 18px 22px;
	display: flex;
	flex-direction: column;
	gap: 14px;
}

.pg-incident-header {
	display: flex;
	align-items: center;
	gap: 12px;
}

.pg-incident-title {
	font-size: 15px;
	font-weight: 600;
	color: var(--dsw-alias-intent-danger, #b91c1c);
}

.pg-incident-desc {
	font-size: 13px;
	color: var(--dsw-alias-text-secondary, #475569);
	line-height: 1.5;
}

.pg-plugin-selection-box {
	background: var(--dsw-alias-surface-overlay, #ffffff);
	border: 1px solid var(--dsw-alias-border-subtle, rgba(0, 0, 0, 0.1));
	border-radius: 8px;
	padding: 12px 16px;
	max-height: 240px;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.pg-plugin-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 6px 8px;
	border-radius: 6px;
	cursor: pointer;
}

.pg-plugin-item:hover {
	background: var(--dsw-alias-control-bg-neutral-hover, rgba(0, 0, 0, 0.04));
}

.pg-plugin-item-left {
	display: flex;
	align-items: center;
	gap: 10px;
}

.pg-plugin-name {
	font-size: 13px;
	font-weight: 500;
	color: var(--dsw-alias-text-primary, #0f172a);
}

.pg-plugin-tag {
	font-size: 11px;
	padding: 2px 6px;
	border-radius: 4px;
	background: var(--dsw-alias-accent-subtle, rgba(59, 130, 246, 0.1));
	color: var(--dsw-alias-accent-primary, #2563eb);
}

.pg-card {
	background: var(--dsw-alias-surface-raised, rgba(0, 0, 0, 0.02));
	border: 1px solid var(--dsw-alias-border-subtle, rgba(0, 0, 0, 0.08));
	border-radius: 10px;
	padding: 18px 22px;
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.pg-card-title {
	font-size: 14px;
	font-weight: 600;
	color: var(--dsw-alias-text-primary, #1e293b);
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.pg-dot {
	display: inline-block;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: var(--dsw-alias-intent-success, #16a34a);
}

.pg-incident-icon {
	color: var(--dsw-alias-intent-danger, #ef4444);
	display: flex;
	align-items: center;
	justify-content: center;
}

.pg-badge-healthy {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	font-size: 12px;
	font-weight: 500;
	color: var(--dsw-alias-intent-success, #16a34a);
	background: rgba(22, 163, 74, 0.1);
	padding: 3px 10px;
	border-radius: 12px;
}

.pg-list {
	display: flex;
	flex-direction: column;
	gap: 6px;
}

.pg-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 12px;
	background: var(--dsw-alias-surface-overlay, #ffffff);
	border: 1px solid var(--dsw-alias-border-subtle, rgba(0, 0, 0, 0.06));
	border-radius: 6px;
	font-size: 13px;
}

.pg-row-name {
	font-weight: 500;
	color: var(--dsw-alias-text-primary, #1e293b);
}

.pg-row-meta {
	font-size: 12px;
	color: var(--dsw-alias-text-tertiary, #94a3b8);
}

.pg-reason-tag {
	display: inline-flex;
	align-items: center;
	padding: 1px 6px;
	border-radius: 4px;
	font-size: 11px;
	font-weight: 500;
	background: var(--dsw-alias-surface-raised, rgba(0, 0, 0, 0.05));
	color: var(--dsw-alias-text-secondary, #475569);
	border: 1px solid var(--dsw-alias-border-subtle, rgba(0, 0, 0, 0.08));
}

.pg-toast {
	position: fixed;
	bottom: 24px;
	right: 28px;
	background: var(--dsw-alias-text-primary, #0f172a);
	color: var(--dsw-alias-surface-overlay, #ffffff);
	padding: 10px 18px;
	border-radius: 8px;
	font-size: 13px;
	font-weight: 500;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	z-index: 9999;
	transition: opacity 0.2s ease;
}

/* ---------- \u63D2\u4EF6\u5B89\u88C5\u5668\u5F39\u7A97\u4E0E\u7CBE\u9009\u5E02\u573A\u6837\u5F0F ---------- */

.pg-modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
	padding: 24px;
	backdrop-filter: blur(2px);
}

.pg-modal {
	width: 100%;
	max-width: 680px;
	max-height: 85vh;
	background: var(--dsw-alias-surface-overlay, #ffffff);
	border: 1px solid var(--dsw-alias-border-subtle, rgba(0, 0, 0, 0.15));
	border-radius: 12px;
	display: flex;
	flex-direction: column;
	box-shadow: 0 16px 36px rgba(0, 0, 0, 0.25);
	overflow: hidden;
}

.pg-modal-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 18px 24px;
	border-bottom: 1px solid var(--dsw-alias-border-subtle, rgba(0, 0, 0, 0.08));
	background: var(--dsw-alias-surface-raised, rgba(0, 0, 0, 0.02));
}

.pg-modal-title {
	margin: 0;
	font-size: 16px;
	font-weight: 600;
	color: var(--dsw-alias-text-primary, #0f172a);
}

.pg-modal-close {
	background: transparent;
	border: none;
	cursor: pointer;
	color: var(--dsw-alias-text-tertiary, #94a3b8);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 6px;
	border-radius: 6px;
}

.pg-modal-close:hover {
	background: var(--dsw-alias-control-bg-neutral-hover, rgba(0, 0, 0, 0.06));
	color: var(--dsw-alias-text-primary, #0f172a);
}

.pg-tabs {
	display: flex;
	gap: 6px;
	padding: 10px 24px 0 24px;
	border-bottom: 1px solid var(--dsw-alias-border-subtle, rgba(0, 0, 0, 0.08));
	background: var(--dsw-alias-surface-raised, rgba(0, 0, 0, 0.01));
}

.pg-tab-btn {
	padding: 8px 16px;
	font-size: 13px;
	font-weight: 500;
	background: transparent;
	border: none;
	border-bottom: 2px solid transparent;
	color: var(--dsw-alias-text-secondary, #64748b);
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 6px;
	transition: all 0.15s ease;
}

.pg-tab-btn:hover {
	color: var(--dsw-alias-text-primary, #0f172a);
}

.pg-tab-btn.active {
	color: var(--dsw-alias-accent-primary, #2563eb);
	border-bottom-color: var(--dsw-alias-accent-primary, #2563eb);
}

.pg-modal-body {
	padding: 20px 24px;
	overflow-y: auto;
	flex: 1;
}

/* \u5E02\u573A\u5361\u7247\u7F51\u683C */
.pg-catalog-grid {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.pg-catalog-card {
	border: 1px solid var(--dsw-alias-border-subtle, rgba(0, 0, 0, 0.08));
	border-radius: 8px;
	padding: 14px 16px;
	background: var(--dsw-alias-surface-overlay, #ffffff);
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	transition: border-color 0.15s ease;
}

.pg-catalog-card:hover {
	border-color: var(--dsw-alias-border-strong, rgba(0, 0, 0, 0.2));
}

.pg-catalog-info {
	flex: 1;
}

.pg-catalog-header {
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 4px;
}

.pg-catalog-title {
	font-size: 14px;
	font-weight: 600;
	color: var(--dsw-alias-text-primary, #0f172a);
}

.pg-catalog-badge {
	font-size: 11px;
	padding: 1px 6px;
	border-radius: 4px;
	background: var(--dsw-alias-accent-subtle, rgba(59, 130, 246, 0.1));
	color: var(--dsw-alias-accent-primary, #2563eb);
	font-weight: 500;
}

.pg-catalog-desc {
	font-size: 12px;
	color: var(--dsw-alias-text-secondary, #475569);
	line-height: 1.4;
	margin-bottom: 4px;
}

.pg-catalog-meta {
	font-size: 11px;
	color: var(--dsw-alias-text-tertiary, #94a3b8);
	font-family: monospace;
}

/* \u672C\u5730\u6587\u4EF6\u9009\u53D6\u533A\u57DF */
.pg-file-dropzone {
	border: 2px dashed var(--dsw-alias-border-strong, rgba(0, 0, 0, 0.2));
	border-radius: 10px;
	padding: 32px 20px;
	text-align: center;
	background: var(--dsw-alias-surface-raised, rgba(0, 0, 0, 0.02));
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;
}

.pg-input {
	width: 100%;
	box-sizing: border-box;
	padding: 9px 12px;
	border-radius: 6px;
	border: 1px solid var(--dsw-alias-border-subtle, rgba(0, 0, 0, 0.15));
	background: var(--dsw-alias-control-bg-neutral, #ffffff);
	color: var(--dsw-alias-text-primary, #0f172a);
	font-size: 13px;
	outline: none;
}

.pg-input:focus {
	border-color: var(--dsw-alias-accent-primary, #2563eb);
}

.pg-tip-box {
	margin-top: 14px;
	padding: 10px 14px;
	border-radius: 6px;
	background: var(--dsw-alias-accent-subtle, rgba(59, 130, 246, 0.08));
	border: 1px solid var(--dsw-alias-accent-subtle, rgba(59, 130, 246, 0.2));
	font-size: 12px;
	color: var(--dsw-alias-text-secondary, #334155);
	line-height: 1.5;
}

/* \u63D2\u4EF6\u53EF\u70B9\u51FB\u6807\u9898\u94FE\u63A5 */
.pg-plugin-link {
	background: transparent;
	border: none;
	padding: 0;
	font-size: 13px;
	font-weight: 600;
	color: var(--dsw-alias-text-primary, #0f172a);
	cursor: pointer;
	text-align: left;
	display: inline-flex;
	align-items: center;
	gap: 4px;
	text-decoration: none;
}

.pg-plugin-link:hover {
	color: var(--dsw-alias-accent-primary, #2563eb);
	text-decoration: underline;
}

/* \u63D2\u4EF6\u7248\u672C\u53F7\u6807\u7B7E */
.pg-version-tag {
	font-size: 11px;
	font-weight: 500;
	color: var(--dsw-alias-text-tertiary, #64748b);
	background: var(--dsw-alias-surface-sunken, rgba(0, 0, 0, 0.05));
	padding: 1px 6px;
	border-radius: 4px;
	border: 1px solid var(--dsw-alias-border-subtle, rgba(0, 0, 0, 0.08));
	display: inline-flex;
	align-items: center;
}

/* \u53EF\u66F4\u65B0\u6807\u7B7E (\u6DE1\u84DD\u5B98\u65B9\u98CE\u683C) */
.pg-update-tag {
	display: inline-flex;
	align-items: center;
	gap: 4px;
	font-size: 11px;
	font-weight: 500;
	color: var(--dsw-alias-accent-primary, #2563eb);
	background: var(--dsw-alias-accent-subtle, rgba(37, 99, 235, 0.1));
	border: 1px solid rgba(37, 99, 235, 0.25);
	padding: 1px 7px;
	border-radius: 4px;
	cursor: pointer;
	transition: all 0.15s ease;
}

.pg-update-tag:hover:not(:disabled) {
	background: var(--dsw-alias-accent-primary, #2563eb);
	color: #ffffff;
}

`;var v=ea(require("react"),1),T=class extends v.default.Component{constructor(i){super(i),this.state={hasError:!1,error:null}}static getDerivedStateFromError(i){return{hasError:!0,error:i}}componentDidCatch(i,o){console.error("[Plugin Guardian Client ErrorBoundary]",i,o)}render(){return this.state.hasError?this.props.fallback?this.props.fallback(this.state.error,()=>this.setState({hasError:!1,error:null})):v.default.createElement("div",{style:{padding:"24px",margin:"16px",border:"1px solid var(--dsw-alias-border-danger, #ef4444)",borderRadius:"8px",background:"var(--dsw-alias-bg-subtle, #1a1a1a)",color:"var(--dsw-alias-text-primary, #fff)"}},v.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"12px"}},v.default.createElement("span",{style:{fontSize:"18px",fontWeight:600,color:"var(--dsw-alias-text-danger, #ef4444)"}},"\u26A0\uFE0F \u63D2\u4EF6\u7BA1\u5BB6\u6E32\u67D3\u6355\u83B7\u5230\u5F02\u5E38")),v.default.createElement("p",{style:{fontSize:"13px",color:"var(--dsw-alias-text-secondary, #999)",marginBottom:"16px"}},"\u5F53\u524D\u6E32\u67D3\u6A21\u5757\u51FA\u73B0\u610F\u5916\u9519\u8BEF\uFF1A",this.state.error?.message||"\u672A\u77E5\u9519\u8BEF","\u3002\u6838\u5FC3\u9632\u707E\u5FEB\u7167\u4E0E\u6570\u636E\u4E0D\u53D7\u5F71\u54CD\u3002"),v.default.createElement("div",{style:{display:"flex",gap:"12px"}},v.default.createElement("button",{className:"pg-btn pg-btn-primary",onClick:()=>{this.setState({hasError:!1,error:null}),window.location.reload()}},"\u5237\u65B0\u91CD\u8BD5"),v.default.createElement("button",{className:"pg-btn",onClick:()=>{navigator.clipboard?.writeText(this.state.error?.stack||this.state.error?.message||""),alert("\u5DF2\u590D\u5236\u9519\u8BEF\u5806\u6808\u4FE1\u606F\u81F3\u526A\u8D34\u677F")}},"\u590D\u5236\u9519\u8BEF\u4FE1\u606F"))):this.props.children}};var p=({children:t,size:i=15,className:o=""})=>a.default.createElement("svg",{width:i,height:i,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:o,"aria-hidden":"true",style:{flexShrink:0}},t),ja=({size:t=16})=>a.default.createElement(p,{size:t},a.default.createElement("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"})),Ba=({size:t=14})=>a.default.createElement(p,{size:t},a.default.createElement("path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"}),a.default.createElement("polyline",{points:"17 21 17 13 7 13 7 21"}),a.default.createElement("polyline",{points:"7 3 7 8 15 8"})),Aa=({size:t=14})=>a.default.createElement(p,{size:t},a.default.createElement("polyline",{points:"4 17 10 11 4 5"}),a.default.createElement("line",{x1:"12",y1:"19",x2:"20",y2:"19"})),Ha=({size:t=14})=>a.default.createElement(p,{size:t},a.default.createElement("polyline",{points:"23 4 23 10 17 10"}),a.default.createElement("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})),Ea=({size:t=14})=>a.default.createElement(p,{size:t},a.default.createElement("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),a.default.createElement("polyline",{points:"14 2 14 8 20 8"}),a.default.createElement("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),a.default.createElement("line",{x1:"16",y1:"17",x2:"8",y2:"17"}),a.default.createElement("polyline",{points:"10 9 9 9 8 9"})),Fa=({size:t=18})=>a.default.createElement(p,{size:t},a.default.createElement("path",{d:"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}),a.default.createElement("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),a.default.createElement("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})),La=({size:t=14})=>a.default.createElement(p,{size:t},a.default.createElement("polyline",{points:"1 4 1 10 7 10"}),a.default.createElement("path",{d:"M3.51 15a9 9 0 1 0 2.13-9.36L1 10"})),Oa=({size:t=14})=>a.default.createElement(p,{size:t},a.default.createElement("polyline",{points:"20 6 9 17 4 12"})),ta=({size:t=15})=>a.default.createElement(p,{size:t},a.default.createElement("line",{x1:"16.5",y1:"9.4",x2:"7.5",y2:"4.21"}),a.default.createElement("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}),a.default.createElement("polyline",{points:"3.27 6.96 12 12.01 20.73 6.96"}),a.default.createElement("line",{x1:"12",y1:"22.08",x2:"12",y2:"12"})),Ma=({size:t=15})=>a.default.createElement(p,{size:t},a.default.createElement("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),a.default.createElement("polyline",{points:"14 2 14 8 20 8"}),a.default.createElement("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),a.default.createElement("line",{x1:"16",y1:"17",x2:"8",y2:"17"})),Da=({size:t=14})=>a.default.createElement(p,{size:t},a.default.createElement("circle",{cx:"12",cy:"12",r:"10"}),a.default.createElement("polyline",{points:"12 6 12 12 16 14"})),k=({size:t=14})=>a.default.createElement(p,{size:t},a.default.createElement("polyline",{points:"3 6 5 6 21 6"}),a.default.createElement("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"})),sa=({size:t=14})=>a.default.createElement(p,{size:t},a.default.createElement("path",{d:"M18.36 6.64a9 9 0 1 1-12.73 0"}),a.default.createElement("line",{x1:"12",y1:"2",x2:"12",y2:"12"})),ia=({size:t=14})=>a.default.createElement(p,{size:t},a.default.createElement("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),a.default.createElement("line",{x1:"5",y1:"12",x2:"19",y2:"12"})),na=({size:t=14})=>a.default.createElement(p,{size:t},a.default.createElement("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),a.default.createElement("line",{x1:"6",y1:"6",x2:"18",y2:"18"})),D=({size:t=16})=>a.default.createElement(p,{size:t},a.default.createElement("path",{d:"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"})),Ua=({size:t=14})=>a.default.createElement(p,{size:t},a.default.createElement("circle",{cx:"12",cy:"12",r:"10"}),a.default.createElement("polygon",{points:"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"})),U=({size:t=14})=>a.default.createElement(p,{size:t},a.default.createElement("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),a.default.createElement("polyline",{points:"17 8 12 3 7 8"}),a.default.createElement("line",{x1:"12",y1:"3",x2:"12",y2:"15"})),Va={startup_auto:"\u5BBF\u4E3B\u542F\u52A8\u81EA\u52A8\u8BB0\u5F55",manual:"\u7528\u6237\u624B\u52A8\u521B\u5EFA",after_recovery:"\u707E\u96BE\u6062\u590D\u540E\u81EA\u52A8\u5907\u4EFD",manual_activate:"\u624B\u52A8\u6FC0\u6D3B\u63D2\u4EF6",manual_deactivate:"\u624B\u52A8\u5173\u95ED\u63D2\u4EF6",pre_install:"\u5B89\u88C5\u524D\u5FEB\u7167",after_install:"\u5B89\u88C5\u63D2\u4EF6\u540E\u8BB0\u5F55",pre_uninstall:"\u5378\u8F7D\u524D\u5FEB\u7167",after_uninstall:"\u5378\u8F7D\u63D2\u4EF6\u540E\u8BB0\u5F55",clean_retained:"\u6E05\u7406\u540E\u4FDD\u7559\u5FEB\u7167"};function ra(t,i){return i||(t?Va[t]||t:"\u65E5\u5E38\u5FEB\u7167")}function oa(){if(typeof window<"u"&&(window.__dsh_guardian_return_target__=!1),typeof document<"u"){let o=Array.from(document.querySelectorAll("button")).find(c=>{let l=c.getAttribute&&(c.getAttribute("aria-label")||c.getAttribute("title"))||"",x=c.innerText||"";return l.includes("\u63D2\u4EF6\u7BA1\u5BB6")||x.includes("\u63D2\u4EF6\u7BA1\u5BB6")});if(o){o.click();return}}let t=typeof globalThis<"u"?globalThis.__dsh_guardian_ctx__:null;if(t?.layout&&typeof t.layout.selectPanel=="function"){t.layout.selectPanel("plugin-guardian");return}if(t?.get&&typeof t.get=="function"){let i=t.get("layout");if(i&&typeof i.selectPanel=="function"){i.selectPanel("plugin-guardian");return}}}typeof window<"u"&&typeof window.addEventListener=="function"&&!window.__dsh_guardian_back_listener_installed__&&(window.__dsh_guardian_back_listener_installed__=!0,window.addEventListener("click",t=>{if(t.target&&t.target.closest&&(t.target.closest('[class*="sidebar"]')||t.target.closest('[class*="panellist"]'))){window.__dsh_guardian_return_target__=!1;return}if(!window.__dsh_guardian_return_target__)return;let i=t.target&&t.target.closest?t.target.closest("button"):null;if(!i)return;let o=i.getAttribute&&i.getAttribute("aria-label")||"",c=String(i.className||""),l=i.innerText?.trim()||"";(o.includes("\u8FD4\u56DE")||o.includes("Back")||c.includes("crumb")||c.includes("moreBack")||l==="\u63D2\u4EF6"||l==="Plugins"||l.includes("\u8FD4\u56DE\u63D2\u4EF6\u7BA1\u5BB6")||i.closest&&i.closest('[class*="detailTop"]')&&(o||c))&&(t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation(),oa())},!0));function P(){if(typeof window>"u"||!window.__dsh_guardian_return_target__||typeof document>"u"||typeof document.querySelectorAll!="function")return;let t=document.querySelectorAll("button");for(let i of t){let o=i.getAttribute&&i.getAttribute("aria-label")||"";if(String(i.className||"").includes("crumb")||o.includes("\u8FD4\u56DE")||o.includes("Back")){let l=i.querySelector("span");l&&!l.dataset.enhanced&&(l.dataset.enhanced="true",l.textContent="\u8FD4\u56DE\u63D2\u4EF6\u7BA1\u5BB6",i.setAttribute("title","\u8FD4\u56DE\u63D2\u4EF6\u7BA1\u5BB6")),i.onclick=x=>{x.preventDefault(),x.stopPropagation(),oa()}}}}function Wa(){let[t,i]=(0,a.useState)(null),[o,c]=(0,a.useState)(!0),[l,x]=(0,a.useState)(new Set),[j,la]=(0,a.useState)(!0),[V,W]=(0,a.useState)(null),[g,d]=(0,a.useState)(!1),[da,z]=(0,a.useState)(!1),[m,B]=(0,a.useState)("catalog"),[$,pa]=(0,a.useState)([]),[ga,J]=(0,a.useState)(!1),[N,G]=(0,a.useState)(null),[A,q]=(0,a.useState)(""),[u,K]=(0,a.useState)(!1),[H,h]=(0,a.useState)(null),[b,X]=(0,a.useState)(!1),[Q,ca]=(0,a.useState)({}),[Xa,Y]=(0,a.useState)(!1),n=e=>{W(e),setTimeout(()=>W(null),3500)},Z=(0,a.useCallback)(async()=>{try{Y(!0);let e=await fetch("/plugin-guardian/check-updates");if(e.ok){let s=await e.json();s.updates&&ca(s.updates)}}catch{}finally{Y(!1)}},[]),R=e=>{let r=globalThis.__dsh_guardian_ctx__?.get?.("pluginNavigation");r&&typeof r.openBundle=="function"?(window.__dsh_guardian_return_target__=!0,r.openBundle(e),setTimeout(P,60),setTimeout(P,200),setTimeout(P,500),setTimeout(P,1e3)):n(`\u5DF2\u8BF7\u6C42\u67E5\u770B ${e} \u8BE6\u60C5\uFF0C\u82E5\u672A\u81EA\u52A8\u8DF3\u8F6C\u8BF7\u70B9\u51FB\u4FA7\u8FB9\u680F\u201C\u63D2\u4EF6\u201D`)},f=(0,a.useCallback)(async()=>{try{c(!0);let e=await fetch("/plugin-guardian/status");if(e.ok){let s=await e.json();i(s),s.disabledFromHealthy&&s.disabledFromHealthy.length>0&&x(new Set(s.disabledFromHealthy)),s.allInstalledThirdParty&&s.allInstalledThirdParty.length>0&&Z()}}catch(e){console.error("Failed to fetch guardian status:",e)}finally{c(!1)}},[Z]),S=(0,a.useCallback)(async()=>{try{J(!0);let e=await fetch("/plugin-guardian/catalog");if(e.ok){let s=await e.json();pa(s.catalog||[])}}catch(e){console.error("Failed to fetch catalog:",e)}finally{J(!1)}},[]);(0,a.useEffect)(()=>{f()},[f]);let ua=async()=>{try{d(!0);let s=await(await fetch("/plugin-guardian/choose-file",{method:"POST"})).json();s.ok?G(s):s.error&&!s.error.includes("\u53D6\u6D88")&&n("\u9009\u62E9\u6587\u4EF6\u5931\u8D25: "+s.error)}catch(e){n("\u5524\u8D77\u6587\u4EF6\u9009\u62E9\u5668\u5931\u8D25: "+e.message)}finally{d(!1)}},w=async e=>{if(!e||!e.trim()){n("\u8BF7\u8F93\u5165\u6216\u9009\u62E9\u63D2\u4EF6 Spec");return}try{K(!0);let r=await(await fetch("/plugin-guardian/install",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({spec:e.trim()})})).json();r.ok?(n(`\u63D2\u4EF6 ${r.installedPackage||e} \u5B89\u88C5\u6210\u529F\uFF01\u8BF7\u5B8C\u5168\u9000\u51FA\u5E76\u91CD\u542F DSH \u751F\u6548`),z(!1),G(null),q(""),await f(),await S()):n("\u5B89\u88C5\u5931\u8D25: "+(r.error||"\u672A\u77E5\u9519\u8BEF"))}catch(s){n("\u8BF7\u6C42\u5B89\u88C5\u5931\u8D25: "+s.message)}finally{K(!1)}},fa=async e=>{try{X(!0);let r=await(await fetch("/plugin-guardian/uninstall",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({packageName:e})})).json();r.ok?(n(`\u5DF2\u6210\u529F\u5F7B\u5E95\u5378\u8F7D ${e}\uFF01\u8BF7\u5B8C\u5168\u9000\u51FA\u5E76\u91CD\u542F DSH \u751F\u6548`),h(null),await f(),await S()):n("\u5378\u8F7D\u5931\u8D25: "+(r.error||"\u672A\u77E5\u9519\u8BEF"))}catch(s){n("\u8BF7\u6C42\u5378\u8F7D\u5931\u8D25: "+s.message)}finally{X(!1)}},ba=e=>{let s=new Set(l);s.has(e)?s.delete(e):s.add(e),x(s)},E=async(e,s)=>{if(e.length===0){n("\u672A\u9009\u62E9\u4EFB\u4F55\u9700\u8981\u6062\u590D\u7684\u63D2\u4EF6");return}try{d(!0);let y=await(await fetch("/plugin-guardian/restore",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({bundles:e,restorePatch:s})})).json();y.ok?(n("\u5FEB\u7167\u6062\u590D\u5199\u5165\u6210\u529F\uFF01\u8BF7\u5B8C\u5168\u9000\u51FA\u5E76\u91CD\u542F DSH \u751F\u6548"),await f()):n("\u6062\u590D\u5931\u8D25: "+(y.error||"\u672A\u77E5\u9519\u8BEF"))}catch(r){n("\u8BF7\u6C42\u5931\u8D25: "+r.message)}finally{d(!1)}},F=async(e,s)=>{try{d(!0);let y=await(await fetch("/plugin-guardian/toggle-bundle",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({bundle:e,enabled:s})})).json();y.ok?(n(`${s?"\u5DF2\u624B\u52A8\u6FC0\u6D3B":"\u5DF2\u624B\u52A8\u5173\u95ED"} ${e}\uFF01\u8BF7\u5B8C\u5168\u9000\u51FA\u5E76\u91CD\u542F DSH \u751F\u6548`),await f()):n("\u64CD\u4F5C\u5931\u8D25: "+(y.error||"\u672A\u77E5\u9519\u8BEF"))}catch(r){n("\u8BF7\u6C42\u5931\u8D25: "+r.message)}finally{d(!1)}},va=async()=>{try{d(!0),(await(await fetch("/plugin-guardian/snapshot",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({reason:"manual"})})).json()).ok&&(n("\u5DF2\u6210\u529F\u521B\u5EFA\u5F53\u524D\u5065\u5EB7\u5FEB\u7167\uFF01"),await f())}catch(e){n("\u521B\u5EFA\u5FEB\u7167\u5931\u8D25: "+e.message)}finally{d(!1)}},xa=async e=>{try{d(!0);let r=await(await fetch("/plugin-guardian/restore-patch",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({fileName:e})})).json();r.ok?(n("\u914D\u7F6E\u5DF2\u6210\u529F\u633D\u56DE\uFF01"),await f()):n("\u633D\u56DE\u5931\u8D25: "+r.error)}catch(s){n("\u8BF7\u6C42\u5931\u8D25: "+s.message)}finally{d(!1)}},ya=async()=>{try{d(!0);let s=await(await fetch("/plugin-guardian/export-script",{method:"POST"})).json();s.ok&&n(`\u5E94\u6025\u811A\u672C\u5DF2\u751F\u6210\u81F3\u684C\u9762 (${s.fileName})\uFF0C\u7CFB\u7EDF\u5DF2\u5B9A\u4F4D\u8BE5\u6587\u4EF6`)}catch(e){n("\u5BFC\u51FA\u5931\u8D25: "+e.message)}finally{d(!1)}},ma=async e=>{try{d(!0);let r=await(await fetch("/plugin-guardian/delete-snapshot",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({id:e})})).json();r.ok?(n("\u5DF2\u5220\u9664\u5FEB\u7167 "+e),await f()):n("\u5220\u9664\u5931\u8D25: "+r.error)}catch(s){n("\u8BF7\u6C42\u5931\u8D25: "+s.message)}finally{d(!1)}},ha=async()=>{try{d(!0);let s=await(await fetch("/plugin-guardian/clean-snapshots",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({keepCount:2})})).json();s.ok&&(n(`\u5DF2\u6E05\u7406 ${s.deletedCount} \u4EFD\u65E7\u5FEB\u7167\uFF0C\u4FDD\u7559\u4E86\u6700\u65B0 ${s.retained} \u4EFD`),await f())}catch(e){n("\u6E05\u7406\u5931\u8D25: "+e.message)}finally{d(!1)}},wa=async()=>{try{d(!0);let s=await(await fetch("/plugin-guardian/diagnostic")).json();if(s.ok&&s.report){let r=JSON.stringify(s.report,null,2);navigator.clipboard?.writeText&&await navigator.clipboard.writeText(r),n("\u5DF2\u590D\u5236\u73AF\u5883\u8BCA\u65AD\u4FE1\u606F\u81F3\u526A\u8D34\u677F\uFF0C\u4FBF\u4E8E\u63D0\u62A5\u6392\u969C")}else n("\u83B7\u53D6\u8BCA\u65AD\u4FE1\u606F\u5931\u8D25")}catch(e){n("\u8BCA\u65AD\u8BF7\u6C42\u5F02\u5E38: "+e.message)}finally{d(!1)}};if(o&&!t)return a.default.createElement("div",{className:"pg-container"},a.default.createElement("style",null,M),a.default.createElement("div",{style:{padding:32,textAlign:"center",color:"var(--dsw-alias-text-tertiary)"}},"\u6B63\u5728\u8BFB\u53D6\u63D2\u4EF6\u72B6\u6001\u4E0E\u5FEB\u7167..."));let L=t?.isIncident,_=t?.disabledFromHealthy||[],C=t?.currentThirdParty||[],O=t?.inactiveInstalled||[],ka=(()=>{if(t?.snapshotsTotalSize&&t.snapshotsTotalSize!=="0 KB")return t.snapshotsTotalSize;let e=t?.snapshotsCount||0;if(e===0)return"0 KB";let s=(t?.currentPatchSize||0)+1500;return(e*s/1024).toFixed(1)+" KB"})();return a.default.createElement("div",{className:"pg-container"},a.default.createElement("style",null,M),a.default.createElement("div",{className:"pg-header"},a.default.createElement("div",{className:"pg-header-left"},a.default.createElement("div",{className:"pg-icon-badge"},a.default.createElement(ja,{size:22})),a.default.createElement("div",{className:"pg-title-wrap"},a.default.createElement("h2",null,"DSH \u63D2\u4EF6\u7BA1\u5BB6"),a.default.createElement("p",null,"Profile \u72B6\u6001\u5B88\u62A4 \xB7 \u81EA\u52A8\u5FEB\u7167 \xB7 \u4E8B\u6545\u4E00\u952E\u6062\u590D \xB7 \u8131\u673A\u5E94\u6025\u4FEE\u590D"))),a.default.createElement("div",{className:"pg-actions"},a.default.createElement("button",{className:"pg-btn pg-btn-primary",onClick:()=>{z(!0),S()},disabled:g,title:"\u4ECE\u7CBE\u9009\u5E02\u573A\u3001\u672C\u5730\u79BB\u7EBF\u5305\u6216\u81EA\u5B9A\u4E49\u5B89\u88C5\u65B0\u63D2\u4EF6"},a.default.createElement(ia,{size:14}),a.default.createElement("span",null,"\u5B89\u88C5\u65B0\u63D2\u4EF6")),a.default.createElement("button",{className:"pg-btn",onClick:va,disabled:g,title:"\u624B\u52A8\u5C06\u5F53\u524D\u6240\u6709\u5F00\u542F\u7684\u63D2\u4EF6\u4E0E\u914D\u7F6E\u8BB0\u5F55\u4E3A\u65B0\u5FEB\u7167"},a.default.createElement(Ba,{size:14}),a.default.createElement("span",null,"\u4FDD\u5B58\u5FEB\u7167")),a.default.createElement("button",{className:"pg-btn",onClick:ya,disabled:g,title:"\u5728\u684C\u9762\u751F\u6210\u4E00\u4E2A\u53CC\u51FB\u5373\u53EF\u6062\u590D\u7684\u811A\u672C\uFF0CDSH \u95EA\u9000\u4E0D\u5F00\u65F6\u53EF\u7528"},a.default.createElement(Aa,{size:14}),a.default.createElement("span",null,"\u5BFC\u51FA\u684C\u9762\u5E94\u6025\u811A\u672C")),a.default.createElement("button",{className:"pg-btn",onClick:wa,disabled:g,title:"\u4E00\u952E\u590D\u5236\u8131\u654F\u7684\u73AF\u5883\u72B6\u6001\u8BCA\u65AD\u62A5\u544A\uFF0C\u4FBF\u4E8E\u63D0\u62A5\u6392\u67E5"},a.default.createElement(Ea,{size:14}),a.default.createElement("span",null,"\u590D\u5236\u8BCA\u65AD")),a.default.createElement("button",{className:"pg-btn",onClick:f,disabled:g},a.default.createElement(Ha,{size:14}),a.default.createElement("span",null,"\u5237\u65B0")))),a.default.createElement("div",{className:"pg-content"},L&&a.default.createElement("div",{className:"pg-incident-banner"},a.default.createElement("div",{className:"pg-incident-header"},a.default.createElement("div",{className:"pg-incident-icon"},a.default.createElement(Fa,{size:20})),a.default.createElement("div",{className:"pg-incident-title"},"\u68C0\u6D4B\u5230\u7CFB\u7EDF\u6B64\u524D\u6267\u884C\u4E86\u5168\u76D8\u7981\u7528\uFF0C\u53D1\u73B0\u7B2C\u4E09\u65B9\u63D2\u4EF6\u88AB\u505C\u7528")),a.default.createElement("div",{className:"pg-incident-desc"},"\u68C0\u6D4B\u5230\u4E0A\u4E00\u6B21\u5065\u5EB7\u5FEB\u7167\u4E2D\u6FC0\u6D3B\u7684 ",a.default.createElement("strong",null,_.length)," \u4E2A\u7B2C\u4E09\u65B9\u63D2\u4EF6\u5F53\u524D\u5DF2\u88AB\u5BBF\u4E3B\u79FB\u51FA\u6FC0\u6D3B\u5217\u8868\u3002 \u4F60\u53EF\u4EE5\u76F4\u63A5\u4E00\u952E\u5168\u90E8\u6062\u590D\uFF0C\u6216\u52FE\u9009\u6392\u9664\u521A\u624D\u5BFC\u81F4\u95EA\u9000\u7684\u53EF\u7591\u63D2\u4EF6\uFF1A"),a.default.createElement("div",{className:"pg-plugin-selection-box"},_.map(e=>{let s=l.has(e);return a.default.createElement("div",{key:e,className:"pg-plugin-item",onClick:()=>ba(e)},a.default.createElement("div",{className:"pg-plugin-item-left"},a.default.createElement("input",{type:"checkbox",checked:s,onChange:()=>{},style:{cursor:"pointer"}}),a.default.createElement(ta,{size:14}),a.default.createElement("span",{className:"pg-plugin-name"},e)),a.default.createElement("span",{className:"pg-plugin-tag"},"\u5F85\u6062\u590D"))})),t?.patchNeedsRecovery&&a.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,fontSize:13}},a.default.createElement("input",{type:"checkbox",id:"restorePatchCheck",checked:j,onChange:e=>la(e.target.checked),style:{cursor:"pointer"}}),a.default.createElement("label",{htmlFor:"restorePatchCheck",style:{cursor:"pointer",color:"var(--dsw-alias-text-primary)"}},"\u540C\u65F6\u4ECE\u6700\u65B0\u7684 ",a.default.createElement("code",null,"cordis.patch.yml.bak")," \u4E2D\u627E\u56DE\u88AB\u6E05\u7A7A\u7684\u7528\u6237\u914D\u7F6E")),a.default.createElement("div",{style:{display:"flex",gap:10,marginTop:4}},a.default.createElement("button",{className:"pg-btn pg-btn-primary",onClick:()=>E(_,j),disabled:g},a.default.createElement(La,{size:14}),a.default.createElement("span",null,"\u4E00\u952E\u5168\u91CF\u6062\u590D\u6240\u6709\u63D2\u4EF6 (",_.length,")")),a.default.createElement("button",{className:"pg-btn",onClick:()=>E(Array.from(l),j),disabled:g||l.size===0},a.default.createElement(Oa,{size:14}),a.default.createElement("span",null,"\u6062\u590D\u52FE\u9009\u63D2\u4EF6 (",l.size,")")))),a.default.createElement("div",{className:"pg-card"},a.default.createElement("div",{className:"pg-card-title"},a.default.createElement("span",null,"\u5DF2\u542F\u7528\u7684\u6269\u5C55\u63D2\u4EF6 (",C.length,")"),a.default.createElement("span",{className:"pg-badge-healthy"},a.default.createElement("span",{className:"pg-dot"}),L?"\u5904\u4E8E\u6062\u590D\u6392\u67E5\u6A21\u5F0F":"\u5065\u5EB7\u8FD0\u884C\u4E2D")),a.default.createElement("div",{style:{fontSize:13,color:"var(--dsw-alias-text-secondary)",lineHeight:1.6}},"\u5F53\u524D\u5171\u6FC0\u6D3B ",a.default.createElement("strong",null,t?.currentBundles?.length||0)," \u4E2A\u7EC4\u5408\u884C\uFF08\u542B"," ",a.default.createElement("strong",null,C.length)," \u4E2A\u7B2C\u4E09\u65B9\u6269\u5C55\u63D2\u4EF6\uFF09\u3002",t?.latestHealthy?a.default.createElement("span",null," ","\u6700\u8FD1\u5065\u5EB7\u5FEB\u7167\u5EFA\u7ACB\u4E8E\uFF1A",a.default.createElement("strong",null,t.latestHealthy.timeString),"\uFF08",ra(t.latestHealthy.reason,t.latestHealthy.reasonText),"\uFF09\u3002"):a.default.createElement("span",null," \u5C1A\u672A\u5EFA\u7ACB\u5065\u5EB7\u57FA\u51C6\u5FEB\u7167\u3002")),a.default.createElement("div",{className:"pg-list",style:{marginTop:8}},C.map(e=>{let s=e==="@supertiny99/dsh-plugin-guardian"||e==="dsh-plugin-guardian",r=t?.installedMeta?.[e]?.version,y=Q[e];return a.default.createElement("div",{key:e,className:"pg-row"},a.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}},a.default.createElement(ta,{size:15}),a.default.createElement("button",{className:"pg-plugin-link",onClick:()=>R(e),title:"\u70B9\u51FB\u5728\u5B98\u65B9\u63D2\u4EF6\u7BA1\u7406\u5668\u4E2D\u67E5\u770B\u5B8C\u6574 README \u4E0E\u8BE6\u7EC6\u914D\u7F6E"},e),r&&a.default.createElement("span",{className:"pg-version-tag"},"v",r),y?.hasUpdate&&a.default.createElement("button",{className:"pg-update-tag",onClick:()=>w(e),title:"\u68C0\u6D4B\u5230\u65B0\u7248\u672C\uFF0C\u70B9\u51FB\u4E00\u952E\u5E73\u6ED1\u5347\u7EA7",disabled:u},a.default.createElement(U,{size:11}),a.default.createElement("span",null,"\u53EF\u66F4\u65B0\u81F3 v",y.latestVersion))),a.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:8}},a.default.createElement("span",{className:"pg-plugin-tag",style:{background:"rgba(22, 163, 74, 0.1)",color:"#16a34a"}},"\u5DF2\u6FC0\u6D3B"),s?a.default.createElement("span",{style:{fontSize:12,color:"var(--dsw-alias-text-tertiary)",padding:"2px 6px"},title:"\u63D2\u4EF6\u7BA1\u5BB6\u6B63\u5728\u5B88\u62A4\u7CFB\u7EDF\uFF0C\u4E0D\u53EF\u5728\u6B64\u5173\u95ED\u6216\u5378\u8F7D"},"\u5B88\u62A4\u4E2D"):a.default.createElement(a.default.Fragment,null,a.default.createElement("button",{className:"pg-btn",style:{padding:"3px 8px",fontSize:12},onClick:()=>F(e,!1),disabled:g||b,title:"\u5C06\u8BE5\u63D2\u4EF6\u4ECE\u6FC0\u6D3B\u5217\u8868\u4E2D\u79FB\u9664\uFF08\u505C\u7528\uFF09"},a.default.createElement(sa,{size:12}),a.default.createElement("span",null,"\u5173\u95ED")),a.default.createElement("button",{className:"pg-btn pg-btn-danger-outline",style:{padding:"3px 8px",fontSize:12},onClick:()=>h(e),disabled:g||b,title:"\u4ECE\u7CFB\u7EDF\u8FD0\u884C\u6E05\u5355\u4E0E\u672C\u5730\u4F9D\u8D56\u5F7B\u5E95\u5378\u8F7D\u8BE5\u63D2\u4EF6"},a.default.createElement(k,{size:12}),a.default.createElement("span",null,"\u5378\u8F7D")))))}),C.length===0&&a.default.createElement("div",{style:{padding:"12px 0",fontSize:13,color:"var(--dsw-alias-text-tertiary)"}},"\u6682\u65E0\u5DF2\u542F\u7528\u7684\u7B2C\u4E09\u65B9\u6269\u5C55\u63D2\u4EF6\u3002"))),O.length>0&&!L&&a.default.createElement("div",{className:"pg-card"},a.default.createElement("div",{className:"pg-card-title"},a.default.createElement("span",null,"\u5DF2\u5B89\u88C5\u4F46\u672A\u5F00\u542F\u7684\u63D2\u4EF6 (",O.length,")")),a.default.createElement("div",{style:{fontSize:12,color:"var(--dsw-alias-text-tertiary)",marginBottom:8}},"\u672C\u5730\u5DF2\u5C31\u7EEA\uFF0C\u672A\u8FDB\u5165\u8FD0\u884C\u6E05\u5355\uFF0C\u70B9\u51FB\u540D\u79F0\u53EF\u67E5\u770B\u5B98\u65B9\u8BE6\u60C5\uFF0C\u652F\u6301\u5FEB\u901F\u5F00\u542F\u6216\u5F7B\u5E95\u5378\u8F7D\uFF1A"),a.default.createElement("div",{className:"pg-list"},O.map(e=>{let s=t?.installedMeta?.[e]?.version,r=Q[e];return a.default.createElement("div",{key:e,className:"pg-row"},a.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}},a.default.createElement(sa,{size:14}),a.default.createElement("button",{className:"pg-plugin-link",onClick:()=>R(e),title:"\u70B9\u51FB\u5728\u5B98\u65B9\u63D2\u4EF6\u7BA1\u7406\u5668\u4E2D\u67E5\u770B\u5B8C\u6574\u8BE6\u60C5"},e),s&&a.default.createElement("span",{className:"pg-version-tag"},"v",s),r?.hasUpdate&&a.default.createElement("button",{className:"pg-update-tag",onClick:()=>w(e),title:"\u68C0\u6D4B\u5230\u65B0\u7248\u672C\uFF0C\u70B9\u51FB\u4E00\u952E\u66F4\u65B0",disabled:u},a.default.createElement(U,{size:11}),a.default.createElement("span",null,"\u53EF\u66F4\u65B0\u81F3 v",r.latestVersion))),a.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:8}},a.default.createElement("button",{className:"pg-btn pg-btn-primary",style:{padding:"3px 10px",fontSize:12},onClick:()=>F(e,!0),disabled:g||b,title:"\u5C06\u8BE5\u63D2\u4EF6\u52A0\u5165\u6FC0\u6D3B\u5217\u8868\uFF08\u542F\u7528\uFF09"},a.default.createElement("span",null,"\u542F\u7528")),a.default.createElement("button",{className:"pg-btn pg-btn-danger-outline",style:{padding:"3px 8px",fontSize:12},onClick:()=>h(e),disabled:g||b,title:"\u4ECE\u672C\u5730\u4F9D\u8D56\u5F7B\u5E95\u5378\u8F7D\u8BE5\u63D2\u4EF6"},a.default.createElement(k,{size:12}),a.default.createElement("span",null,"\u5378\u8F7D"))))}))),t?.bakFiles?.length>0&&a.default.createElement("div",{className:"pg-card"},a.default.createElement("div",{className:"pg-card-title"},a.default.createElement("span",null,"cordis.patch.yml \u914D\u7F6E\u5907\u4EFD\u5386\u53F2 (",t.bakFiles.length," \u4EFD)")),a.default.createElement("div",{style:{fontSize:12,color:"var(--dsw-alias-text-tertiary)"}},"\u5F53 DSH \u53D1\u751F\u5D29\u6E83\u6062\u590D\u65F6\uFF0C\u539F\u914D\u7F6E\u4F1A\u88AB\u91CD\u547D\u540D\u4E3A bak \u4FDD\u5B58\u3002\u4F60\u53EF\u4EE5\u968F\u65F6\u5BF9\u6BD4\u5E76\u627E\u56DE\u914D\u7F6E\uFF1A"),a.default.createElement("div",{className:"pg-list"},t.bakFiles.slice(0,3).map(e=>a.default.createElement("div",{key:e.fileName,className:"pg-row"},a.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},a.default.createElement(Ma,{size:16}),a.default.createElement("div",null,a.default.createElement("div",{className:"pg-row-name"},e.fileName),a.default.createElement("div",{className:"pg-row-meta"},"\u65F6\u95F4: ",e.mtimeString," \xB7 \u5927\u5C0F: ",e.size," \u5B57\u8282"))),a.default.createElement("button",{className:"pg-btn",style:{padding:"4px 10px",fontSize:12},onClick:()=>xa(e.fileName),disabled:g},"\u4ECE\u5907\u4EFD\u8986\u76D6\u8FD8\u539F\u914D\u7F6E"))))),a.default.createElement("div",{className:"pg-card"},a.default.createElement("div",{className:"pg-card-title"},a.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},a.default.createElement("span",null,"\u5386\u53F2\u5065\u5EB7\u5FEB\u7167 (",t?.snapshotsCount||0,")"),a.default.createElement("span",{style:{fontSize:12,fontWeight:"normal",color:"var(--dsw-alias-text-tertiary)"}},"\u5360\u7528\u78C1\u76D8: ",ka)),t?.snapshotsCount>2&&a.default.createElement("button",{className:"pg-btn",style:{padding:"3px 8px",fontSize:12},onClick:ha,disabled:g,title:"\u4EC5\u4FDD\u7559\u6700\u8FD1 2 \u4EFD\u5FEB\u7167\uFF0C\u6E05\u7406\u66F4\u65E9\u7684\u5386\u53F2\u8BB0\u5F55"},a.default.createElement(k,{size:12}),a.default.createElement("span",null,"\u6E05\u7406\u65E7\u5FEB\u7167"))),a.default.createElement("div",{className:"pg-list"},t?.recentSnapshots?.map(e=>a.default.createElement("div",{key:e.id,className:"pg-row"},a.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},a.default.createElement(Da,{size:15}),a.default.createElement("div",null,a.default.createElement("div",{className:"pg-row-name",style:{display:"flex",alignItems:"center",gap:8}},a.default.createElement("span",null,e.timeString),a.default.createElement("span",{style:{fontSize:11,color:"var(--dsw-alias-text-tertiary)"}},"(",e.sizeText||(((t?.currentPatchSize||0)+1500)/1024).toFixed(1)+" KB",")")),a.default.createElement("div",{className:"pg-row-meta",style:{display:"flex",alignItems:"center",gap:6,marginTop:2,flexWrap:"wrap"}},a.default.createElement("span",null,"\u89E6\u53D1\u64CD\u4F5C:"),a.default.createElement("span",{className:"pg-reason-tag"},ra(e.reason,e.reasonText)),a.default.createElement("span",null,"\xB7"),a.default.createElement("span",null,"\u7B2C\u4E09\u65B9\u63D2\u4EF6: ",e.thirdPartyCount," \u4E2A")))),a.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:8}},a.default.createElement("button",{className:"pg-btn",style:{padding:"4px 10px",fontSize:12},onClick:()=>E(e.thirdPartyBundles,!1),disabled:g||e.thirdPartyCount===0,title:"\u5C06\u63D2\u4EF6\u6FC0\u6D3B\u72B6\u6001\u56DE\u6EDA\u4E3A\u6B64\u5FEB\u7167"},"\u6062\u590D\u4E3A\u6B64\u5FEB\u7167"),a.default.createElement("button",{className:"pg-btn",style:{padding:"4px 8px",fontSize:12,color:"var(--dsw-alias-intent-danger, #ef4444)"},onClick:()=>ma(e.id),disabled:g,title:"\u5220\u9664\u6B64\u4EFD\u5FEB\u7167"},a.default.createElement(k,{size:13})))))))),da&&a.default.createElement("div",{className:"pg-modal-overlay",onClick:()=>!u&&z(!1)},a.default.createElement("div",{className:"pg-modal",onClick:e=>e.stopPropagation()},a.default.createElement("div",{className:"pg-modal-header"},a.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},a.default.createElement(ia,{size:18}),a.default.createElement("div",null,a.default.createElement("h3",{className:"pg-modal-title"},"\u5B89\u88C5\u65B0\u63D2\u4EF6"),a.default.createElement("span",{style:{fontSize:11,color:"var(--dsw-alias-text-tertiary)"}},"\u7CBE\u9009\u5E02\u573A \xB7 \u672C\u5730\u79BB\u7EBF\u5B89\u88C5 (.tgz) \xB7 \u81EA\u5B9A\u4E49 Spec\uFF08\u5B89\u88C5\u524D\u81EA\u52A8\u5065\u5EB7\u5FEB\u7167\uFF09"))),a.default.createElement("button",{className:"pg-modal-close",onClick:()=>!u&&z(!1),disabled:u,title:"\u5173\u95ED"},a.default.createElement(na,{size:16}))),a.default.createElement("div",{className:"pg-tabs"},a.default.createElement("button",{className:`pg-tab-btn ${m==="catalog"?"active":""}`,onClick:()=>B("catalog")},a.default.createElement(Ua,{size:14}),a.default.createElement("span",null,"\u7CBE\u9009\u5E02\u573A (",$.length||"\u63A8\u8350",")")),a.default.createElement("button",{className:`pg-tab-btn ${m==="local"?"active":""}`,onClick:()=>B("local")},a.default.createElement(D,{size:14}),a.default.createElement("span",null,"\u672C\u5730\u5B89\u88C5\u5305 (.tgz)")),a.default.createElement("button",{className:`pg-tab-btn ${m==="custom"?"active":""}`,onClick:()=>B("custom")},a.default.createElement(U,{size:14}),a.default.createElement("span",null,"\u81EA\u5B9A\u4E49 Spec"))),a.default.createElement("div",{className:"pg-modal-body"},m==="catalog"&&a.default.createElement("div",null,a.default.createElement("div",{style:{fontSize:12,color:"var(--dsw-alias-text-secondary)",marginBottom:12}},"\u5B98\u65B9\u4E0E\u793E\u533A\u7ECF\u8FC7\u4E25\u683C\u5B9E\u6D4B\u7684\u7A33\u5B9A\u63D2\u4EF6\uFF0C\u70B9\u51FB\u5373\u53EF\u4E00\u952E\u4E0B\u8F7D\u5E76\u52A0\u5165\u6FC0\u6D3B\u6E05\u5355\uFF1A"),ga?a.default.createElement("div",{style:{textAlign:"center",padding:24,color:"var(--dsw-alias-text-tertiary)"}},"\u6B63\u5728\u52A0\u8F7D\u7CBE\u9009\u63D2\u4EF6\u76EE\u5F55..."):a.default.createElement("div",{className:"pg-catalog-grid"},$.map(e=>a.default.createElement("div",{key:e.id,className:"pg-catalog-card"},a.default.createElement("div",{className:"pg-catalog-info"},a.default.createElement("div",{className:"pg-catalog-header"},a.default.createElement("span",{className:"pg-catalog-title"},e.title),a.default.createElement("span",{className:"pg-catalog-badge"},e.badge||e.category),e.isInstalled&&a.default.createElement("span",{className:"pg-plugin-tag",style:{background:e.isActive?"rgba(22, 163, 74, 0.1)":"rgba(234, 179, 8, 0.1)",color:e.isActive?"#16a34a":"#ca8a04",fontSize:11,padding:"1px 6px"}},e.isActive?"\u8FD0\u884C\u4E2D":"\u5DF2\u5B89\u88C5\u672A\u6FC0\u6D3B")),a.default.createElement("div",{className:"pg-catalog-desc"},e.description),a.default.createElement("div",{className:"pg-catalog-meta"},"\u5305\u540D: ",e.name)),a.default.createElement("div",null,e.isInstalled?e.isActive?a.default.createElement("button",{className:"pg-btn",style:{padding:"4px 10px",fontSize:12},disabled:!0},"\u8FD0\u884C\u4E2D"):a.default.createElement("button",{className:"pg-btn pg-btn-secondary",style:{padding:"4px 10px",fontSize:12},onClick:async()=>{await F(e.name,!0),await S()},disabled:g||u,title:"\u5DF2\u5B89\u88C5\uFF0C\u70B9\u51FB\u76F4\u63A5\u52A0\u5165\u6FC0\u6D3B\u6E05\u5355"},"\u4E00\u952E\u542F\u7528"):a.default.createElement("button",{className:"pg-btn pg-btn-primary",style:{padding:"5px 12px",fontSize:12},onClick:()=>w(e.spec),disabled:u},u?"\u5B89\u88C5\u4E2D...":"\u4E00\u952E\u5B89\u88C5")))))),m==="local"&&a.default.createElement("div",null,a.default.createElement("div",{className:"pg-file-dropzone"},a.default.createElement(D,{size:36}),a.default.createElement("div",{style:{fontWeight:500,fontSize:14}},"\u9009\u53D6\u672C\u5730 DSH \u63D2\u4EF6\u79BB\u7EBF\u5305 (.tgz)"),a.default.createElement("div",{style:{fontSize:12,color:"var(--dsw-alias-text-tertiary)",maxWidth:400}},"\u65E0\u9700\u624B\u5199\u7E41\u7410\u590D\u6742\u7684 file \u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u70B9\u51FB\u76F4\u63A5\u5524\u8D77\u7CFB\u7EDF\u539F\u751F\u6587\u4EF6\u9009\u62E9\u5668"),a.default.createElement("button",{className:"pg-btn pg-btn-primary",style:{marginTop:8},onClick:ua,disabled:g||u},a.default.createElement(D,{size:14}),a.default.createElement("span",null,"\u6D4F\u89C8\u5E76\u9009\u62E9\u672C\u5730 .tgz \u6587\u4EF6"))),N&&a.default.createElement("div",{style:{marginTop:16,padding:14,borderRadius:8,border:"1px solid var(--dsw-alias-border-subtle)",background:"var(--dsw-alias-surface-raised)"}},a.default.createElement("div",{style:{fontWeight:600,fontSize:13,marginBottom:4}},"\u5DF2\u9009\u62E9: ",N.fileName),a.default.createElement("div",{style:{fontSize:11,color:"var(--dsw-alias-text-tertiary)",wordBreak:"break-all",marginBottom:12}},"\u8DEF\u5F84: ",N.filePath),a.default.createElement("button",{className:"pg-btn pg-btn-primary",onClick:()=>w(N.spec),disabled:u},u?"\u6B63\u5728\u5B89\u88C5...":"\u7ACB\u5373\u5B89\u88C5\u6B64\u79BB\u7EBF\u5305"))),m==="custom"&&a.default.createElement("div",null,a.default.createElement("div",{style:{fontSize:12,color:"var(--dsw-alias-text-secondary)",marginBottom:8}},"\u8F93\u5165\u4EFB\u610F npm \u5305\u540D\u3001GitHub \u4ED3\u5E93\u89C4\u8303\u6216\u672C\u5730\u8DEF\u5F84\uFF1A"),a.default.createElement("input",{className:"pg-input",type:"text",value:A,onChange:e=>q(e.target.value),placeholder:"\u4F8B\u5982: @supertiny99/dsh-usage-dashboard \u6216 github:org/repo#v1.0",disabled:u}),a.default.createElement("div",{style:{marginTop:12,display:"flex",justifyContent:"flex-end"}},a.default.createElement("button",{className:"pg-btn pg-btn-primary",onClick:()=>w(A),disabled:u||!A.trim()},u?"\u6B63\u5728\u5B89\u5168\u5B89\u88C5...":"\u5F00\u59CB\u5B89\u88C5"))),a.default.createElement("div",{className:"pg-tip-box"},a.default.createElement("strong",null,"\u63D2\u4EF6\u7BA1\u5BB6\u5B89\u5168\u4FDD\u62A4"),"\uFF1A\u5728\u5B89\u88C5\u4EFB\u4F55\u63D2\u4EF6\u524D\uFF0C\u7BA1\u5BB6\u90FD\u4F1A\u4E3A\u60A8\u5F3A\u5236\u6253\u4E00\u4EFD ",a.default.createElement("strong",null,"\u5B89\u88C5\u524D\u5065\u5EB7\u5FEB\u7167\uFF08pre_install\uFF09"),"\u3002\u82E5\u5B89\u88C5\u8FC7\u7A0B\u4E2D\u51FA\u9519\u6216\u65B0\u63D2\u4EF6\u6709\u7F3A\u9677\u5BFC\u81F4\u5D29\u6E83\uFF0C\u4F60\u53EF\u4EE5\u968F\u65F6\u5728\u7BA1\u5BB6\u9762\u677F\u6216\u684C\u9762\u8131\u673A\u811A\u672C\u4E00\u952E\u79D2\u7EA7\u56DE\u9000\uFF01")))),H&&a.default.createElement("div",{className:"pg-modal-overlay",onClick:()=>!b&&h(null)},a.default.createElement("div",{className:"pg-modal",style:{maxWidth:460},onClick:e=>e.stopPropagation()},a.default.createElement("div",{className:"pg-modal-header"},a.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},a.default.createElement("div",{style:{color:"var(--dsw-alias-intent-danger, #ef4444)"}},a.default.createElement(k,{size:20})),a.default.createElement("div",null,a.default.createElement("h3",{className:"pg-modal-title"},"\u786E\u8BA4\u5F7B\u5E95\u5378\u8F7D\u63D2\u4EF6\uFF1F"),a.default.createElement("span",{style:{fontSize:11,color:"var(--dsw-alias-text-tertiary)"}},"\u9632\u707E\u4FDD\u62A4\u5DF2\u542F\u7528 \xB7 \u5378\u8F7D\u524D\u81EA\u52A8\u521B\u5EFA\u5065\u5EB7\u5FEB\u7167"))),a.default.createElement("button",{className:"pg-modal-close",onClick:()=>!b&&h(null),disabled:b,title:"\u53D6\u6D88"},a.default.createElement(na,{size:16}))),a.default.createElement("div",{className:"pg-modal-body",style:{padding:"16px 20px"}},a.default.createElement("div",{style:{fontSize:13,lineHeight:1.6,color:"var(--dsw-alias-text-primary)"}},"\u786E\u5B9A\u8981\u4ECE\u7CFB\u7EDF\u4E2D\u5F7B\u5E95\u79FB\u9664\u6269\u5C55\u63D2\u4EF6 ",a.default.createElement("strong",{style:{color:"var(--dsw-alias-intent-danger, #ef4444)"}},H)," \u5417\uFF1F"),a.default.createElement("div",{style:{marginTop:12,fontSize:12,color:"var(--dsw-alias-text-secondary)",background:"var(--dsw-alias-surface-raised)",padding:"10px 12px",borderRadius:6,border:"1px solid var(--dsw-alias-border-subtle)",lineHeight:1.5}},"\u7CFB\u7EDF\u5C06\u5728\u5378\u8F7D\u524D\u81EA\u52A8\u751F\u6210\u4E00\u4EFD ",a.default.createElement("code",null,"pre_uninstall")," \u5FEB\u7167\u3002\u82E5\u540E\u7EED\u9700\u8981\u91CD\u65B0\u627E\u56DE\uFF0C\u53EF\u5728\u300C\u5386\u53F2\u5065\u5EB7\u5FEB\u7167\u300D\u4E2D\u4E00\u952E\u6062\u590D\u3002"),a.default.createElement("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20}},a.default.createElement("button",{className:"pg-btn",onClick:()=>h(null),disabled:b},"\u53D6\u6D88"),a.default.createElement("button",{className:"pg-btn pg-btn-danger",onClick:()=>fa(H),disabled:b},b?"\u6B63\u5728\u5B89\u5168\u5378\u8F7D...":"\u786E\u8BA4\u5378\u8F7D"))))),V&&a.default.createElement("div",{className:"pg-toast"},V))}function $a({size:t=20,active:i=!1}){return a.default.createElement("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:i?2.2:1.6,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true"},a.default.createElement("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}))}function Ja(t){return a.default.createElement(T,null,a.default.createElement(Wa,{...t}))}var Ga=["slots","layout"];function qa(t){globalThis.__dsh_guardian_ctx__=t,t.slots.inject("sidebar.panellist",()=>t.slots.register({name:"sidebar.panellist",id:"plugin-guardian",order:70,label:"\u63D2\u4EF6\u7BA1\u5BB6"},$a)),t.slots.inject("main",()=>t.slots.register({name:"main",key:"plugin-guardian"},Ja))}
return module.exports}})
