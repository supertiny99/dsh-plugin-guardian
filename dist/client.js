window.__ModuleLoader__.load({id:"@supertiny99/dsh-plugin-guardian",factory:(require)=>{const module={exports:{}};const exports=module.exports;
var ta=Object.create;var h=Object.defineProperty;var ra=Object.getOwnPropertyDescriptor;var oa=Object.getOwnPropertyNames;var la=Object.getPrototypeOf,da=Object.prototype.hasOwnProperty;var pa=(e,t)=>{for(var p in t)h(e,p,{get:t[p],enumerable:!0})},V=(e,t,p,v)=>{if(t&&typeof t=="object"||typeof t=="function")for(let g of oa(t))!da.call(e,g)&&g!==p&&h(e,g,{get:()=>t[g],enumerable:!(v=ra(t,g))||v.enumerable});return e};var ga=(e,t,p)=>(p=e!=null?ta(la(e)):{},V(t||!e||!e.__esModule?h(p,"default",{value:e,enumerable:!0}):p,e)),ca=e=>V(h({},"__esModule",{value:!0}),e);var Ba={};pa(Ba,{apply:()=>Ta,inject:()=>Pa});module.exports=ca(Ba);var a=ga(require("react"),1);var P=`/* plugin-guardian \xB7 \u6837\u5F0F\u8868 (token \u5316\uFF0C\u660E\u6697\u81EA\u9002\u5E94) */

.pg-container {
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	background: var(--dsw-alias-surface-overlay, #ffffff);
	color: var(--dsw-alias-text-primary, #1e293b);
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
	box-sizing: border-box;
	overflow-y: auto;
}

.pg-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px 28px;
	border-bottom: 1px solid var(--dsw-alias-border-subtle, rgba(0, 0, 0, 0.08));
	background: var(--dsw-alias-surface-raised, rgba(0, 0, 0, 0.02));
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

.pg-content {
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

`;var r=({children:e,size:t=15,className:p=""})=>a.default.createElement("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:p,"aria-hidden":"true",style:{flexShrink:0}},e),ba=({size:e=16})=>a.default.createElement(r,{size:e},a.default.createElement("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"})),va=({size:e=14})=>a.default.createElement(r,{size:e},a.default.createElement("path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"}),a.default.createElement("polyline",{points:"17 21 17 13 7 13 7 21"}),a.default.createElement("polyline",{points:"7 3 7 8 15 8"})),ua=({size:e=14})=>a.default.createElement(r,{size:e},a.default.createElement("polyline",{points:"4 17 10 11 4 5"}),a.default.createElement("line",{x1:"12",y1:"19",x2:"20",y2:"19"})),xa=({size:e=14})=>a.default.createElement(r,{size:e},a.default.createElement("polyline",{points:"23 4 23 10 17 10"}),a.default.createElement("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})),ya=({size:e=18})=>a.default.createElement(r,{size:e},a.default.createElement("path",{d:"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}),a.default.createElement("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),a.default.createElement("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})),ma=({size:e=14})=>a.default.createElement(r,{size:e},a.default.createElement("polyline",{points:"1 4 1 10 7 10"}),a.default.createElement("path",{d:"M3.51 15a9 9 0 1 0 2.13-9.36L1 10"})),ha=({size:e=14})=>a.default.createElement(r,{size:e},a.default.createElement("polyline",{points:"20 6 9 17 4 12"})),J=({size:e=15})=>a.default.createElement(r,{size:e},a.default.createElement("line",{x1:"16.5",y1:"9.4",x2:"7.5",y2:"4.21"}),a.default.createElement("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}),a.default.createElement("polyline",{points:"3.27 6.96 12 12.01 20.73 6.96"}),a.default.createElement("line",{x1:"12",y1:"22.08",x2:"12",y2:"12"})),wa=({size:e=15})=>a.default.createElement(r,{size:e},a.default.createElement("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),a.default.createElement("polyline",{points:"14 2 14 8 20 8"}),a.default.createElement("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),a.default.createElement("line",{x1:"16",y1:"17",x2:"8",y2:"17"})),za=({size:e=14})=>a.default.createElement(r,{size:e},a.default.createElement("circle",{cx:"12",cy:"12",r:"10"}),a.default.createElement("polyline",{points:"12 6 12 12 16 14"})),W=({size:e=14})=>a.default.createElement(r,{size:e},a.default.createElement("polyline",{points:"3 6 5 6 21 6"}),a.default.createElement("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"})),E=({size:e=14})=>a.default.createElement(r,{size:e},a.default.createElement("path",{d:"M18.36 6.64a9 9 0 1 1-12.73 0"}),a.default.createElement("line",{x1:"12",y1:"2",x2:"12",y2:"12"})),K=({size:e=14})=>a.default.createElement(r,{size:e},a.default.createElement("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),a.default.createElement("line",{x1:"5",y1:"12",x2:"19",y2:"12"})),ka=({size:e=14})=>a.default.createElement(r,{size:e},a.default.createElement("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),a.default.createElement("line",{x1:"6",y1:"6",x2:"18",y2:"18"})),T=({size:e=16})=>a.default.createElement(r,{size:e},a.default.createElement("path",{d:"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"})),Sa=({size:e=14})=>a.default.createElement(r,{size:e},a.default.createElement("circle",{cx:"12",cy:"12",r:"10"}),a.default.createElement("polygon",{points:"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"})),Na=({size:e=14})=>a.default.createElement(r,{size:e},a.default.createElement("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),a.default.createElement("polyline",{points:"17 8 12 3 7 8"}),a.default.createElement("line",{x1:"12",y1:"3",x2:"12",y2:"15"})),Ia={startup_auto:"\u5BBF\u4E3B\u542F\u52A8\u81EA\u52A8\u8BB0\u5F55",manual:"\u7528\u6237\u624B\u52A8\u521B\u5EFA",after_recovery:"\u707E\u96BE\u6062\u590D\u540E\u81EA\u52A8\u5907\u4EFD",manual_activate:"\u624B\u52A8\u6FC0\u6D3B\u63D2\u4EF6",manual_deactivate:"\u624B\u52A8\u5173\u95ED\u63D2\u4EF6",pre_install:"\u5B89\u88C5\u524D\u5FEB\u7167",after_install:"\u5B89\u88C5\u63D2\u4EF6\u540E\u8BB0\u5F55",clean_retained:"\u6E05\u7406\u540E\u4FDD\u7559\u5FEB\u7167"};function G(e,t){return t||(e?Ia[e]||e:"\u65E5\u5E38\u5FEB\u7167")}function Ca(){let[e,t]=(0,a.useState)(null),[p,v]=(0,a.useState)(!0),[g,B]=(0,a.useState)(new Set),[w,U]=(0,a.useState)(!0),[H,F]=(0,a.useState)(null),[d,o]=(0,a.useState)(!1),[X,x]=(0,a.useState)(!1),[b,z]=(0,a.useState)("catalog"),[L,q]=(0,a.useState)([]),[Q,M]=(0,a.useState)(!1),[y,O]=(0,a.useState)(null),[k,A]=(0,a.useState)(""),[c,_]=(0,a.useState)(!1),n=s=>{F(s),setTimeout(()=>F(null),3500)},f=(0,a.useCallback)(async()=>{try{v(!0);let s=await fetch("/plugin-guardian/status");if(s.ok){let i=await s.json();t(i),i.disabledFromHealthy&&i.disabledFromHealthy.length>0&&B(new Set(i.disabledFromHealthy))}}catch(s){console.error("Failed to fetch guardian status:",s)}finally{v(!1)}},[]),$=(0,a.useCallback)(async()=>{try{M(!0);let s=await fetch("/plugin-guardian/catalog");if(s.ok){let i=await s.json();q(i.catalog||[])}}catch(s){console.error("Failed to fetch catalog:",s)}finally{M(!1)}},[]);(0,a.useEffect)(()=>{f()},[f]);let Y=async()=>{try{o(!0);let i=await(await fetch("/plugin-guardian/choose-file",{method:"POST"})).json();i.ok?O(i):i.error&&!i.error.includes("\u53D6\u6D88")&&n("\u9009\u62E9\u6587\u4EF6\u5931\u8D25: "+i.error)}catch(s){n("\u5524\u8D77\u6587\u4EF6\u9009\u62E9\u5668\u5931\u8D25: "+s.message)}finally{o(!1)}},S=async s=>{if(!s||!s.trim()){n("\u8BF7\u8F93\u5165\u6216\u9009\u62E9\u63D2\u4EF6 Spec");return}try{_(!0);let l=await(await fetch("/plugin-guardian/install",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({spec:s.trim()})})).json();l.ok?(n(`\u63D2\u4EF6 ${l.installedPackage||s} \u5B89\u88C5\u6210\u529F\uFF01\u8BF7\u5B8C\u5168\u9000\u51FA\u5E76\u91CD\u542F DSH \u751F\u6548`),x(!1),O(null),A(""),await f(),await $()):n("\u5B89\u88C5\u5931\u8D25: "+(l.error||"\u672A\u77E5\u9519\u8BEF"))}catch(i){n("\u8BF7\u6C42\u5B89\u88C5\u5931\u8D25: "+i.message)}finally{_(!1)}},Z=s=>{let i=new Set(g);i.has(s)?i.delete(s):i.add(s),B(i)},N=async(s,i)=>{if(s.length===0){n("\u672A\u9009\u62E9\u4EFB\u4F55\u9700\u8981\u6062\u590D\u7684\u63D2\u4EF6");return}try{o(!0);let u=await(await fetch("/plugin-guardian/restore",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({bundles:s,restorePatch:i})})).json();u.ok?(n("\u5FEB\u7167\u6062\u590D\u5199\u5165\u6210\u529F\uFF01\u8BF7\u5B8C\u5168\u9000\u51FA\u5E76\u91CD\u542F DSH \u751F\u6548"),await f()):n("\u6062\u590D\u5931\u8D25: "+(u.error||"\u672A\u77E5\u9519\u8BEF"))}catch(l){n("\u8BF7\u6C42\u5931\u8D25: "+l.message)}finally{o(!1)}},D=async(s,i)=>{try{o(!0);let u=await(await fetch("/plugin-guardian/toggle-bundle",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({bundle:s,enabled:i})})).json();u.ok?(n(`${i?"\u5DF2\u624B\u52A8\u6FC0\u6D3B":"\u5DF2\u624B\u52A8\u5173\u95ED"} ${s}\uFF01\u8BF7\u5B8C\u5168\u9000\u51FA\u5E76\u91CD\u542F DSH \u751F\u6548`),await f()):n("\u64CD\u4F5C\u5931\u8D25: "+(u.error||"\u672A\u77E5\u9519\u8BEF"))}catch(l){n("\u8BF7\u6C42\u5931\u8D25: "+l.message)}finally{o(!1)}},R=async()=>{try{o(!0),(await(await fetch("/plugin-guardian/snapshot",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({reason:"manual"})})).json()).ok&&(n("\u5DF2\u6210\u529F\u521B\u5EFA\u5F53\u524D\u5065\u5EB7\u5FEB\u7167\uFF01"),await f())}catch(s){n("\u521B\u5EFA\u5FEB\u7167\u5931\u8D25: "+s.message)}finally{o(!1)}},aa=async s=>{try{o(!0);let l=await(await fetch("/plugin-guardian/restore-patch",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({fileName:s})})).json();l.ok?(n("\u914D\u7F6E\u5DF2\u6210\u529F\u633D\u56DE\uFF01"),await f()):n("\u633D\u56DE\u5931\u8D25: "+l.error)}catch(i){n("\u8BF7\u6C42\u5931\u8D25: "+i.message)}finally{o(!1)}},sa=async()=>{try{o(!0);let i=await(await fetch("/plugin-guardian/export-script",{method:"POST"})).json();i.ok&&n(`\u5E94\u6025\u811A\u672C\u5DF2\u751F\u6210\u81F3\u684C\u9762 (${i.fileName})\uFF0C\u7CFB\u7EDF\u5DF2\u5B9A\u4F4D\u8BE5\u6587\u4EF6`)}catch(s){n("\u5BFC\u51FA\u5931\u8D25: "+s.message)}finally{o(!1)}},ea=async s=>{try{o(!0);let l=await(await fetch("/plugin-guardian/delete-snapshot",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({id:s})})).json();l.ok?(n("\u5DF2\u5220\u9664\u5FEB\u7167 "+s),await f()):n("\u5220\u9664\u5931\u8D25: "+l.error)}catch(i){n("\u8BF7\u6C42\u5931\u8D25: "+i.message)}finally{o(!1)}},ia=async()=>{try{o(!0);let i=await(await fetch("/plugin-guardian/clean-snapshots",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({keepCount:2})})).json();i.ok&&(n(`\u5DF2\u6E05\u7406 ${i.deletedCount} \u4EFD\u65E7\u5FEB\u7167\uFF0C\u4FDD\u7559\u4E86\u6700\u65B0 ${i.retained} \u4EFD`),await f())}catch(s){n("\u6E05\u7406\u5931\u8D25: "+s.message)}finally{o(!1)}};if(p&&!e)return a.default.createElement("div",{className:"pg-container"},a.default.createElement("style",null,P),a.default.createElement("div",{style:{padding:32,textAlign:"center",color:"var(--dsw-alias-text-tertiary)"}},"\u6B63\u5728\u8BFB\u53D6\u63D2\u4EF6\u72B6\u6001\u4E0E\u5FEB\u7167..."));let I=e?.isIncident,m=e?.disabledFromHealthy||[],C=e?.currentThirdParty||[],j=e?.inactiveInstalled||[],na=(()=>{if(e?.snapshotsTotalSize&&e.snapshotsTotalSize!=="0 KB")return e.snapshotsTotalSize;let s=e?.snapshotsCount||0;if(s===0)return"0 KB";let i=(e?.currentPatchSize||0)+1500;return(s*i/1024).toFixed(1)+" KB"})();return a.default.createElement("div",{className:"pg-container"},a.default.createElement("style",null,P),a.default.createElement("div",{className:"pg-header"},a.default.createElement("div",{className:"pg-header-left"},a.default.createElement("div",{className:"pg-icon-badge"},a.default.createElement(ba,{size:22})),a.default.createElement("div",{className:"pg-title-wrap"},a.default.createElement("h2",null,"DSH \u63D2\u4EF6\u7BA1\u5BB6"),a.default.createElement("p",null,"Profile \u72B6\u6001\u5B88\u62A4 \xB7 \u81EA\u52A8\u5FEB\u7167 \xB7 \u4E8B\u6545\u4E00\u952E\u6062\u590D \xB7 \u8131\u673A\u5E94\u6025\u4FEE\u590D"))),a.default.createElement("div",{className:"pg-actions"},a.default.createElement("button",{className:"pg-btn pg-btn-primary",onClick:()=>{x(!0),$()},disabled:d,title:"\u4ECE\u7CBE\u9009\u5E02\u573A\u3001\u672C\u5730\u79BB\u7EBF\u5305\u6216\u81EA\u5B9A\u4E49\u5B89\u88C5\u65B0\u63D2\u4EF6"},a.default.createElement(K,{size:14}),a.default.createElement("span",null,"\u5B89\u88C5\u65B0\u63D2\u4EF6")),a.default.createElement("button",{className:"pg-btn",onClick:R,disabled:d,title:"\u624B\u52A8\u5C06\u5F53\u524D\u6240\u6709\u5F00\u542F\u7684\u63D2\u4EF6\u4E0E\u914D\u7F6E\u8BB0\u5F55\u4E3A\u65B0\u5FEB\u7167"},a.default.createElement(va,{size:14}),a.default.createElement("span",null,"\u4FDD\u5B58\u5FEB\u7167")),a.default.createElement("button",{className:"pg-btn",onClick:sa,disabled:d,title:"\u5728\u684C\u9762\u751F\u6210\u4E00\u4E2A\u53CC\u51FB\u5373\u53EF\u6062\u590D\u7684\u811A\u672C\uFF0CDSH \u95EA\u9000\u4E0D\u5F00\u65F6\u53EF\u7528"},a.default.createElement(ua,{size:14}),a.default.createElement("span",null,"\u5BFC\u51FA\u684C\u9762\u5E94\u6025\u811A\u672C")),a.default.createElement("button",{className:"pg-btn",onClick:f,disabled:d},a.default.createElement(xa,{size:14}),a.default.createElement("span",null,"\u5237\u65B0")))),a.default.createElement("div",{className:"pg-content"},I&&a.default.createElement("div",{className:"pg-incident-banner"},a.default.createElement("div",{className:"pg-incident-header"},a.default.createElement("div",{className:"pg-incident-icon"},a.default.createElement(ya,{size:20})),a.default.createElement("div",{className:"pg-incident-title"},"\u68C0\u6D4B\u5230\u7CFB\u7EDF\u6B64\u524D\u6267\u884C\u4E86\u5168\u76D8\u7981\u7528\uFF0C\u53D1\u73B0\u7B2C\u4E09\u65B9\u63D2\u4EF6\u88AB\u505C\u7528")),a.default.createElement("div",{className:"pg-incident-desc"},"\u68C0\u6D4B\u5230\u4E0A\u4E00\u6B21\u5065\u5EB7\u5FEB\u7167\u4E2D\u6FC0\u6D3B\u7684 ",a.default.createElement("strong",null,m.length)," \u4E2A\u7B2C\u4E09\u65B9\u63D2\u4EF6\u5F53\u524D\u5DF2\u88AB\u5BBF\u4E3B\u79FB\u51FA\u6FC0\u6D3B\u5217\u8868\u3002 \u4F60\u53EF\u4EE5\u76F4\u63A5\u4E00\u952E\u5168\u90E8\u6062\u590D\uFF0C\u6216\u52FE\u9009\u6392\u9664\u521A\u624D\u5BFC\u81F4\u95EA\u9000\u7684\u53EF\u7591\u63D2\u4EF6\uFF1A"),a.default.createElement("div",{className:"pg-plugin-selection-box"},m.map(s=>{let i=g.has(s);return a.default.createElement("div",{key:s,className:"pg-plugin-item",onClick:()=>Z(s)},a.default.createElement("div",{className:"pg-plugin-item-left"},a.default.createElement("input",{type:"checkbox",checked:i,onChange:()=>{},style:{cursor:"pointer"}}),a.default.createElement(J,{size:14}),a.default.createElement("span",{className:"pg-plugin-name"},s)),a.default.createElement("span",{className:"pg-plugin-tag"},"\u5F85\u6062\u590D"))})),e?.patchNeedsRecovery&&a.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,fontSize:13}},a.default.createElement("input",{type:"checkbox",id:"restorePatchCheck",checked:w,onChange:s=>U(s.target.checked),style:{cursor:"pointer"}}),a.default.createElement("label",{htmlFor:"restorePatchCheck",style:{cursor:"pointer",color:"var(--dsw-alias-text-primary)"}},"\u540C\u65F6\u4ECE\u6700\u65B0\u7684 ",a.default.createElement("code",null,"cordis.patch.yml.bak")," \u4E2D\u627E\u56DE\u88AB\u6E05\u7A7A\u7684\u7528\u6237\u914D\u7F6E")),a.default.createElement("div",{style:{display:"flex",gap:10,marginTop:4}},a.default.createElement("button",{className:"pg-btn pg-btn-primary",onClick:()=>N(m,w),disabled:d},a.default.createElement(ma,{size:14}),a.default.createElement("span",null,"\u4E00\u952E\u5168\u91CF\u6062\u590D\u6240\u6709\u63D2\u4EF6 (",m.length,")")),a.default.createElement("button",{className:"pg-btn",onClick:()=>N(Array.from(g),w),disabled:d||g.size===0},a.default.createElement(ha,{size:14}),a.default.createElement("span",null,"\u6062\u590D\u52FE\u9009\u63D2\u4EF6 (",g.size,")")))),a.default.createElement("div",{className:"pg-card"},a.default.createElement("div",{className:"pg-card-title"},a.default.createElement("span",null,"\u5F53\u524D Profile \u63D2\u4EF6\u8FD0\u884C\u72B6\u6001"),a.default.createElement("span",{className:"pg-badge-healthy"},a.default.createElement("span",{className:"pg-dot"}),I?"\u5904\u4E8E\u6062\u590D\u6392\u67E5\u6A21\u5F0F":"\u5065\u5EB7\u8FD0\u884C\u4E2D")),a.default.createElement("div",{style:{fontSize:13,color:"var(--dsw-alias-text-secondary)",lineHeight:1.6}},"\u5F53\u524D\u5171\u6FC0\u6D3B ",a.default.createElement("strong",null,e?.currentBundles?.length||0)," \u4E2A\u7EC4\u5408\u884C\uFF08\u542B"," ",a.default.createElement("strong",null,C.length)," \u4E2A\u7B2C\u4E09\u65B9\u63D2\u4EF6\uFF09\u3002",e?.latestHealthy?a.default.createElement("span",null," ","\u6700\u8FD1\u5065\u5EB7\u5FEB\u7167\u5EFA\u7ACB\u4E8E\uFF1A",a.default.createElement("strong",null,e.latestHealthy.timeString),"\uFF08",G(e.latestHealthy.reason,e.latestHealthy.reasonText),"\uFF09\u3002"):a.default.createElement("span",null," \u5C1A\u672A\u5EFA\u7ACB\u5065\u5EB7\u57FA\u51C6\u5FEB\u7167\u3002")),a.default.createElement("div",{className:"pg-list",style:{marginTop:8}},C.map(s=>a.default.createElement("div",{key:s,className:"pg-row"},a.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:8}},a.default.createElement(J,{size:15}),a.default.createElement("span",{className:"pg-row-name"},s)),a.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:8}},a.default.createElement("span",{className:"pg-plugin-tag",style:{background:"rgba(22, 163, 74, 0.1)",color:"#16a34a"}},"\u5DF2\u6FC0\u6D3B"),s==="@supertiny99/dsh-plugin-guardian"||s==="dsh-plugin-guardian"?a.default.createElement("span",{style:{fontSize:12,color:"var(--dsw-alias-text-tertiary)",padding:"2px 6px"},title:"\u63D2\u4EF6\u7BA1\u5BB6\u6B63\u5728\u5B88\u62A4\u7CFB\u7EDF\uFF0C\u4E0D\u53EF\u5728\u6B64\u5173\u95ED"},"\u5B88\u62A4\u4E2D"):a.default.createElement("button",{className:"pg-btn",style:{padding:"3px 8px",fontSize:12},onClick:()=>D(s,!1),disabled:d,title:"\u5C06\u8BE5\u63D2\u4EF6\u4ECE\u6FC0\u6D3B\u5217\u8868\u4E2D\u79FB\u9664\uFF08\u624B\u52A8\u5173\u95ED\uFF09"},a.default.createElement(E,{size:12}),a.default.createElement("span",null,"\u624B\u52A8\u5173\u95ED"))))),C.length===0&&a.default.createElement("div",{style:{padding:"12px 0",fontSize:13,color:"var(--dsw-alias-text-tertiary)"}},"\u6682\u65E0\u5DF2\u6FC0\u6D3B\u7684\u7B2C\u4E09\u65B9\u63D2\u4EF6\u3002"))),j.length>0&&!I&&a.default.createElement("div",{className:"pg-card"},a.default.createElement("div",{className:"pg-card-title"},a.default.createElement("span",null,"\u5DF2\u5728 dependencies \u5B89\u88C5\u3001\u4F46\u672A\u6FC0\u6D3B\u7684\u7B2C\u4E09\u65B9\u63D2\u4EF6 (",j.length,")")),a.default.createElement("div",{className:"pg-list"},j.map(s=>a.default.createElement("div",{key:s,className:"pg-row"},a.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:8}},a.default.createElement(E,{size:14}),a.default.createElement("span",{className:"pg-row-name"},s)),a.default.createElement("button",{className:"pg-btn pg-btn-primary",style:{padding:"3px 10px",fontSize:12},onClick:()=>D(s,!0),disabled:d,title:"\u5C06\u8BE5\u63D2\u4EF6\u52A0\u5165\u6FC0\u6D3B\u5217\u8868\uFF08\u624B\u52A8\u6FC0\u6D3B\uFF09"},a.default.createElement("span",null,"\u624B\u52A8\u6FC0\u6D3B")))))),e?.bakFiles?.length>0&&a.default.createElement("div",{className:"pg-card"},a.default.createElement("div",{className:"pg-card-title"},a.default.createElement("span",null,"cordis.patch.yml \u914D\u7F6E\u5907\u4EFD\u5386\u53F2 (",e.bakFiles.length," \u4EFD)")),a.default.createElement("div",{style:{fontSize:12,color:"var(--dsw-alias-text-tertiary)"}},"\u5F53 DSH \u53D1\u751F\u5D29\u6E83\u6062\u590D\u65F6\uFF0C\u539F\u914D\u7F6E\u4F1A\u88AB\u91CD\u547D\u540D\u4E3A bak \u4FDD\u5B58\u3002\u4F60\u53EF\u4EE5\u968F\u65F6\u5BF9\u6BD4\u5E76\u627E\u56DE\u914D\u7F6E\uFF1A"),a.default.createElement("div",{className:"pg-list"},e.bakFiles.slice(0,3).map(s=>a.default.createElement("div",{key:s.fileName,className:"pg-row"},a.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},a.default.createElement(wa,{size:16}),a.default.createElement("div",null,a.default.createElement("div",{className:"pg-row-name"},s.fileName),a.default.createElement("div",{className:"pg-row-meta"},"\u65F6\u95F4: ",s.mtimeString," \xB7 \u5927\u5C0F: ",s.size," \u5B57\u8282"))),a.default.createElement("button",{className:"pg-btn",style:{padding:"4px 10px",fontSize:12},onClick:()=>aa(s.fileName),disabled:d},"\u4ECE\u5907\u4EFD\u8986\u76D6\u8FD8\u539F\u914D\u7F6E"))))),a.default.createElement("div",{className:"pg-card"},a.default.createElement("div",{className:"pg-card-title"},a.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},a.default.createElement("span",null,"\u5386\u53F2\u5065\u5EB7\u5FEB\u7167 (",e?.snapshotsCount||0,")"),a.default.createElement("span",{style:{fontSize:12,fontWeight:"normal",color:"var(--dsw-alias-text-tertiary)"}},"\u5360\u7528\u78C1\u76D8: ",na)),e?.snapshotsCount>2&&a.default.createElement("button",{className:"pg-btn",style:{padding:"3px 8px",fontSize:12},onClick:ia,disabled:d,title:"\u4EC5\u4FDD\u7559\u6700\u8FD1 2 \u4EFD\u5FEB\u7167\uFF0C\u6E05\u7406\u66F4\u65E9\u7684\u5386\u53F2\u8BB0\u5F55"},a.default.createElement(W,{size:12}),a.default.createElement("span",null,"\u6E05\u7406\u65E7\u5FEB\u7167"))),a.default.createElement("div",{className:"pg-list"},e?.recentSnapshots?.map(s=>a.default.createElement("div",{key:s.id,className:"pg-row"},a.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},a.default.createElement(za,{size:15}),a.default.createElement("div",null,a.default.createElement("div",{className:"pg-row-name",style:{display:"flex",alignItems:"center",gap:8}},a.default.createElement("span",null,s.timeString),a.default.createElement("span",{style:{fontSize:11,color:"var(--dsw-alias-text-tertiary)"}},"(",s.sizeText||(((e?.currentPatchSize||0)+1500)/1024).toFixed(1)+" KB",")")),a.default.createElement("div",{className:"pg-row-meta",style:{display:"flex",alignItems:"center",gap:6,marginTop:2,flexWrap:"wrap"}},a.default.createElement("span",null,"\u89E6\u53D1\u64CD\u4F5C:"),a.default.createElement("span",{className:"pg-reason-tag"},G(s.reason,s.reasonText)),a.default.createElement("span",null,"\xB7"),a.default.createElement("span",null,"\u7B2C\u4E09\u65B9\u63D2\u4EF6: ",s.thirdPartyCount," \u4E2A")))),a.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:8}},a.default.createElement("button",{className:"pg-btn",style:{padding:"4px 10px",fontSize:12},onClick:()=>N(s.thirdPartyBundles,!1),disabled:d||s.thirdPartyCount===0,title:"\u5C06\u63D2\u4EF6\u6FC0\u6D3B\u72B6\u6001\u56DE\u6EDA\u4E3A\u6B64\u5FEB\u7167"},"\u6062\u590D\u4E3A\u6B64\u5FEB\u7167"),a.default.createElement("button",{className:"pg-btn",style:{padding:"4px 8px",fontSize:12,color:"var(--dsw-alias-intent-danger, #ef4444)"},onClick:()=>ea(s.id),disabled:d,title:"\u5220\u9664\u6B64\u4EFD\u5FEB\u7167"},a.default.createElement(W,{size:13})))))))),X&&a.default.createElement("div",{className:"pg-modal-overlay",onClick:()=>!c&&x(!1)},a.default.createElement("div",{className:"pg-modal",onClick:s=>s.stopPropagation()},a.default.createElement("div",{className:"pg-modal-header"},a.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},a.default.createElement(K,{size:18}),a.default.createElement("div",null,a.default.createElement("h3",{className:"pg-modal-title"},"\u5B89\u88C5\u65B0\u63D2\u4EF6"),a.default.createElement("span",{style:{fontSize:11,color:"var(--dsw-alias-text-tertiary)"}},"\u7CBE\u9009\u5E02\u573A \xB7 \u672C\u5730\u79BB\u7EBF\u5B89\u88C5 (.tgz) \xB7 \u81EA\u5B9A\u4E49 Spec\uFF08\u5B89\u88C5\u524D\u81EA\u52A8\u5065\u5EB7\u5FEB\u7167\uFF09"))),a.default.createElement("button",{className:"pg-modal-close",onClick:()=>!c&&x(!1),disabled:c,title:"\u5173\u95ED"},a.default.createElement(ka,{size:16}))),a.default.createElement("div",{className:"pg-tabs"},a.default.createElement("button",{className:`pg-tab-btn ${b==="catalog"?"active":""}`,onClick:()=>z("catalog")},a.default.createElement(Sa,{size:14}),a.default.createElement("span",null,"\u7CBE\u9009\u5E02\u573A (",L.length||"\u63A8\u8350",")")),a.default.createElement("button",{className:`pg-tab-btn ${b==="local"?"active":""}`,onClick:()=>z("local")},a.default.createElement(T,{size:14}),a.default.createElement("span",null,"\u672C\u5730\u5B89\u88C5\u5305 (.tgz)")),a.default.createElement("button",{className:`pg-tab-btn ${b==="custom"?"active":""}`,onClick:()=>z("custom")},a.default.createElement(Na,{size:14}),a.default.createElement("span",null,"\u81EA\u5B9A\u4E49 Spec"))),a.default.createElement("div",{className:"pg-modal-body"},b==="catalog"&&a.default.createElement("div",null,a.default.createElement("div",{style:{fontSize:12,color:"var(--dsw-alias-text-secondary)",marginBottom:12}},"\u5B98\u65B9\u4E0E\u793E\u533A\u7ECF\u8FC7\u4E25\u683C\u5B9E\u6D4B\u7684\u7A33\u5B9A\u63D2\u4EF6\uFF0C\u70B9\u51FB\u5373\u53EF\u4E00\u952E\u4E0B\u8F7D\u5E76\u52A0\u5165\u6FC0\u6D3B\u6E05\u5355\uFF1A"),Q?a.default.createElement("div",{style:{textAlign:"center",padding:24,color:"var(--dsw-alias-text-tertiary)"}},"\u6B63\u5728\u52A0\u8F7D\u7CBE\u9009\u63D2\u4EF6\u76EE\u5F55..."):a.default.createElement("div",{className:"pg-catalog-grid"},L.map(s=>a.default.createElement("div",{key:s.id,className:"pg-catalog-card"},a.default.createElement("div",{className:"pg-catalog-info"},a.default.createElement("div",{className:"pg-catalog-header"},a.default.createElement("span",{className:"pg-catalog-title"},s.title),a.default.createElement("span",{className:"pg-catalog-badge"},s.badge||s.category),s.isInstalled&&a.default.createElement("span",{className:"pg-plugin-tag",style:{background:s.isActive?"rgba(22, 163, 74, 0.1)":"rgba(234, 179, 8, 0.1)",color:s.isActive?"#16a34a":"#ca8a04",fontSize:11,padding:"1px 6px"}},s.isActive?"\u8FD0\u884C\u4E2D":"\u5DF2\u5B89\u88C5\u672A\u6FC0\u6D3B")),a.default.createElement("div",{className:"pg-catalog-desc"},s.description),a.default.createElement("div",{className:"pg-catalog-meta"},"\u5305\u540D: ",s.name)),a.default.createElement("div",null,s.isInstalled?a.default.createElement("button",{className:"pg-btn",style:{padding:"4px 10px",fontSize:12},disabled:!0},"\u5DF2\u5B89\u88C5"):a.default.createElement("button",{className:"pg-btn pg-btn-primary",style:{padding:"5px 12px",fontSize:12},onClick:()=>S(s.spec),disabled:c},c?"\u5B89\u88C5\u4E2D...":"\u4E00\u952E\u5B89\u88C5")))))),b==="local"&&a.default.createElement("div",null,a.default.createElement("div",{className:"pg-file-dropzone"},a.default.createElement(T,{size:36}),a.default.createElement("div",{style:{fontWeight:500,fontSize:14}},"\u9009\u53D6\u672C\u5730 DSH \u63D2\u4EF6\u79BB\u7EBF\u5305 (.tgz)"),a.default.createElement("div",{style:{fontSize:12,color:"var(--dsw-alias-text-tertiary)",maxWidth:400}},"\u65E0\u9700\u624B\u5199\u7E41\u7410\u590D\u6742\u7684 file \u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u70B9\u51FB\u76F4\u63A5\u5524\u8D77\u7CFB\u7EDF\u539F\u751F\u6587\u4EF6\u9009\u62E9\u5668"),a.default.createElement("button",{className:"pg-btn pg-btn-primary",style:{marginTop:8},onClick:Y,disabled:d||c},a.default.createElement(T,{size:14}),a.default.createElement("span",null,"\u6D4F\u89C8\u5E76\u9009\u62E9\u672C\u5730 .tgz \u6587\u4EF6"))),y&&a.default.createElement("div",{style:{marginTop:16,padding:14,borderRadius:8,border:"1px solid var(--dsw-alias-border-subtle)",background:"var(--dsw-alias-surface-raised)"}},a.default.createElement("div",{style:{fontWeight:600,fontSize:13,marginBottom:4}},"\u5DF2\u9009\u62E9: ",y.fileName),a.default.createElement("div",{style:{fontSize:11,color:"var(--dsw-alias-text-tertiary)",wordBreak:"break-all",marginBottom:12}},"\u8DEF\u5F84: ",y.filePath),a.default.createElement("button",{className:"pg-btn pg-btn-primary",onClick:()=>S(y.spec),disabled:c},c?"\u6B63\u5728\u5B89\u88C5...":"\u7ACB\u5373\u5B89\u88C5\u6B64\u79BB\u7EBF\u5305"))),b==="custom"&&a.default.createElement("div",null,a.default.createElement("div",{style:{fontSize:12,color:"var(--dsw-alias-text-secondary)",marginBottom:8}},"\u8F93\u5165\u4EFB\u610F npm \u5305\u540D\u3001GitHub \u4ED3\u5E93\u89C4\u8303\u6216\u672C\u5730\u8DEF\u5F84\uFF1A"),a.default.createElement("input",{className:"pg-input",type:"text",value:k,onChange:s=>A(s.target.value),placeholder:"\u4F8B\u5982: @supertiny99/dsh-usage-dashboard \u6216 github:org/repo#v1.0",disabled:c}),a.default.createElement("div",{style:{marginTop:12,display:"flex",justifyContent:"flex-end"}},a.default.createElement("button",{className:"pg-btn pg-btn-primary",onClick:()=>S(k),disabled:c||!k.trim()},c?"\u6B63\u5728\u5B89\u5168\u5B89\u88C5...":"\u5F00\u59CB\u5B89\u88C5"))),a.default.createElement("div",{className:"pg-tip-box"},a.default.createElement("strong",null,"\u{1F6E1}\uFE0F \u63D2\u4EF6\u7BA1\u5BB6\u5B89\u5168\u4FDD\u62A4"),"\uFF1A\u5728\u5B89\u88C5\u4EFB\u4F55\u63D2\u4EF6\u524D\uFF0C\u7BA1\u5BB6\u90FD\u4F1A\u4E3A\u60A8\u5F3A\u5236\u6253\u4E00\u4EFD ",a.default.createElement("strong",null,"\u5B89\u88C5\u524D\u5065\u5EB7\u5FEB\u7167\uFF08pre_install\uFF09"),"\u3002\u82E5\u5B89\u88C5\u8FC7\u7A0B\u4E2D\u51FA\u9519\u6216\u65B0\u63D2\u4EF6\u6709 Bug \u5BFC\u81F4\u5D29\u6E83\uFF0C\u4F60\u53EF\u4EE5\u968F\u65F6\u5728\u7BA1\u5BB6\u9762\u677F\u6216\u684C\u9762\u8131\u673A\u811A\u672C\u4E00\u952E\u79D2\u7EA7\u56DE\u9000\uFF01")))),H&&a.default.createElement("div",{className:"pg-toast"},H))}function ja({size:e=20,active:t=!1}){return a.default.createElement("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:t?2.2:1.6,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true"},a.default.createElement("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}))}var Pa=["slots"];function Ta(e){e.slots.inject("sidebar.panellist",()=>e.slots.register({name:"sidebar.panellist",id:"plugin-guardian",order:70,label:"\u63D2\u4EF6\u7BA1\u5BB6"},ja)),e.slots.inject("main",()=>e.slots.register({name:"main",key:"plugin-guardian"},Ca))}
return module.exports}})
