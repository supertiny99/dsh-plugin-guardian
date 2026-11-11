window.__ModuleLoader__.load({id:"@supertiny99/dsh-plugin-guardian",factory:(require)=>{const module={exports:{}};const exports=module.exports;
var D=Object.create;var v=Object.defineProperty;var J=Object.getOwnPropertyDescriptor;var $=Object.getOwnPropertyNames;var E=Object.getPrototypeOf,K=Object.prototype.hasOwnProperty;var W=(e,n)=>{for(var o in n)v(e,o,{get:n[o],enumerable:!0})},C=(e,n,o,f)=>{if(n&&typeof n=="object"||typeof n=="function")for(let d of $(n))!K.call(e,d)&&d!==o&&v(e,d,{get:()=>n[d],enumerable:!(f=J(n,d))||f.enumerable});return e};var G=(e,n,o)=>(o=e!=null?D(E(e)):{},C(n||!e||!e.__esModule?v(o,"default",{value:e,enumerable:!0}):o,e)),U=e=>C(v({},"__esModule",{value:!0}),e);var ds={};W(ds,{apply:()=>ls,inject:()=>os});module.exports=U(ds);var s=G(require("react"),1);var S=`/* plugin-guardian \xB7 \u6837\u5F0F\u8868 (token \u5316\uFF0C\u660E\u6697\u81EA\u9002\u5E94) */

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
`;var l=({children:e,size:n=15,className:o=""})=>s.default.createElement("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:o,"aria-hidden":"true",style:{flexShrink:0}},e),Q=({size:e=16})=>s.default.createElement(l,{size:e},s.default.createElement("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"})),X=({size:e=14})=>s.default.createElement(l,{size:e},s.default.createElement("path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"}),s.default.createElement("polyline",{points:"17 21 17 13 7 13 7 21"}),s.default.createElement("polyline",{points:"7 3 7 8 15 8"})),Y=({size:e=14})=>s.default.createElement(l,{size:e},s.default.createElement("polyline",{points:"4 17 10 11 4 5"}),s.default.createElement("line",{x1:"12",y1:"19",x2:"20",y2:"19"})),Z=({size:e=14})=>s.default.createElement(l,{size:e},s.default.createElement("polyline",{points:"23 4 23 10 17 10"}),s.default.createElement("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})),R=({size:e=18})=>s.default.createElement(l,{size:e},s.default.createElement("path",{d:"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}),s.default.createElement("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),s.default.createElement("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})),ss=({size:e=14})=>s.default.createElement(l,{size:e},s.default.createElement("polyline",{points:"1 4 1 10 7 10"}),s.default.createElement("path",{d:"M3.51 15a9 9 0 1 0 2.13-9.36L1 10"})),es=({size:e=14})=>s.default.createElement(l,{size:e},s.default.createElement("polyline",{points:"20 6 9 17 4 12"})),j=({size:e=15})=>s.default.createElement(l,{size:e},s.default.createElement("line",{x1:"16.5",y1:"9.4",x2:"7.5",y2:"4.21"}),s.default.createElement("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}),s.default.createElement("polyline",{points:"3.27 6.96 12 12.01 20.73 6.96"}),s.default.createElement("line",{x1:"12",y1:"22.08",x2:"12",y2:"12"})),as=({size:e=15})=>s.default.createElement(l,{size:e},s.default.createElement("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),s.default.createElement("polyline",{points:"14 2 14 8 20 8"}),s.default.createElement("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),s.default.createElement("line",{x1:"16",y1:"17",x2:"8",y2:"17"})),is=({size:e=14})=>s.default.createElement(l,{size:e},s.default.createElement("circle",{cx:"12",cy:"12",r:"10"}),s.default.createElement("polyline",{points:"12 6 12 12 16 14"})),P=({size:e=14})=>s.default.createElement(l,{size:e},s.default.createElement("polyline",{points:"3 6 5 6 21 6"}),s.default.createElement("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"})),T=({size:e=14})=>s.default.createElement(l,{size:e},s.default.createElement("path",{d:"M18.36 6.64a9 9 0 1 1-12.73 0"}),s.default.createElement("line",{x1:"12",y1:"2",x2:"12",y2:"12"})),ns={startup_auto:"\u5BBF\u4E3B\u542F\u52A8\u81EA\u52A8\u8BB0\u5F55",manual:"\u7528\u6237\u624B\u52A8\u521B\u5EFA",after_recovery:"\u707E\u96BE\u6062\u590D\u540E\u81EA\u52A8\u5907\u4EFD",manual_activate:"\u624B\u52A8\u6FC0\u6D3B\u63D2\u4EF6",manual_deactivate:"\u624B\u52A8\u5173\u95ED\u63D2\u4EF6",pre_install:"\u5B89\u88C5\u524D\u5FEB\u7167",clean_retained:"\u6E05\u7406\u540E\u4FDD\u7559\u5FEB\u7167"};function B(e,n){return n||(e?ns[e]||e:"\u65E5\u5E38\u5FEB\u7167")}function ts(){let[e,n]=(0,s.useState)(null),[o,f]=(0,s.useState)(!0),[d,k]=(0,s.useState)(new Set),[x,H]=(0,s.useState)(!0),[z,N]=(0,s.useState)(null),[p,r]=(0,s.useState)(!1),t=a=>{N(a),setTimeout(()=>N(null),3500)},c=(0,s.useCallback)(async()=>{try{f(!0);let a=await fetch("/plugin-guardian/status");if(a.ok){let i=await a.json();n(i),i.disabledFromHealthy&&i.disabledFromHealthy.length>0&&k(new Set(i.disabledFromHealthy))}}catch(a){console.error("Failed to fetch guardian status:",a)}finally{f(!1)}},[]);(0,s.useEffect)(()=>{c()},[c]);let F=a=>{let i=new Set(d);i.has(a)?i.delete(a):i.add(a),k(i)},m=async(a,i)=>{if(a.length===0){t("\u672A\u9009\u62E9\u4EFB\u4F55\u9700\u8981\u6062\u590D\u7684\u63D2\u4EF6");return}try{r(!0);let u=await(await fetch("/plugin-guardian/restore",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({bundles:a,restorePatch:i})})).json();u.ok?(t("\u5FEB\u7167\u6062\u590D\u5199\u5165\u6210\u529F\uFF01\u8BF7\u5B8C\u5168\u9000\u51FA\u5E76\u91CD\u542F DSH \u751F\u6548"),await c()):t("\u6062\u590D\u5931\u8D25: "+(u.error||"\u672A\u77E5\u9519\u8BEF"))}catch(g){t("\u8BF7\u6C42\u5931\u8D25: "+g.message)}finally{r(!1)}},I=async(a,i)=>{try{r(!0);let u=await(await fetch("/plugin-guardian/toggle-bundle",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({bundle:a,enabled:i})})).json();u.ok?(t(`${i?"\u5DF2\u624B\u52A8\u6FC0\u6D3B":"\u5DF2\u624B\u52A8\u5173\u95ED"} ${a}\uFF01\u8BF7\u5B8C\u5168\u9000\u51FA\u5E76\u91CD\u542F DSH \u751F\u6548`),await c()):t("\u64CD\u4F5C\u5931\u8D25: "+(u.error||"\u672A\u77E5\u9519\u8BEF"))}catch(g){t("\u8BF7\u6C42\u5931\u8D25: "+g.message)}finally{r(!1)}},O=async()=>{try{r(!0),(await(await fetch("/plugin-guardian/snapshot",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({reason:"manual"})})).json()).ok&&(t("\u5DF2\u6210\u529F\u521B\u5EFA\u5F53\u524D\u5065\u5EB7\u5FEB\u7167\uFF01"),await c())}catch(a){t("\u521B\u5EFA\u5FEB\u7167\u5931\u8D25: "+a.message)}finally{r(!1)}},M=async a=>{try{r(!0);let g=await(await fetch("/plugin-guardian/restore-patch",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({fileName:a})})).json();g.ok?(t("\u914D\u7F6E\u5DF2\u6210\u529F\u633D\u56DE\uFF01"),await c()):t("\u633D\u56DE\u5931\u8D25: "+g.error)}catch(i){t("\u8BF7\u6C42\u5931\u8D25: "+i.message)}finally{r(!1)}},L=async()=>{try{r(!0);let i=await(await fetch("/plugin-guardian/export-script",{method:"POST"})).json();i.ok&&t(`\u5E94\u6025\u811A\u672C\u5DF2\u751F\u6210\u81F3\u684C\u9762 (${i.fileName})\uFF0C\u7CFB\u7EDF\u5DF2\u5B9A\u4F4D\u8BE5\u6587\u4EF6`)}catch(a){t("\u5BFC\u51FA\u5931\u8D25: "+a.message)}finally{r(!1)}},A=async a=>{try{r(!0);let g=await(await fetch("/plugin-guardian/delete-snapshot",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({id:a})})).json();g.ok?(t("\u5DF2\u5220\u9664\u5FEB\u7167 "+a),await c()):t("\u5220\u9664\u5931\u8D25: "+g.error)}catch(i){t("\u8BF7\u6C42\u5931\u8D25: "+i.message)}finally{r(!1)}},V=async()=>{try{r(!0);let i=await(await fetch("/plugin-guardian/clean-snapshots",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({keepCount:2})})).json();i.ok&&(t(`\u5DF2\u6E05\u7406 ${i.deletedCount} \u4EFD\u65E7\u5FEB\u7167\uFF0C\u4FDD\u7559\u4E86\u6700\u65B0 ${i.retained} \u4EFD`),await c())}catch(a){t("\u6E05\u7406\u5931\u8D25: "+a.message)}finally{r(!1)}};if(o&&!e)return s.default.createElement("div",{className:"pg-container"},s.default.createElement("style",null,S),s.default.createElement("div",{style:{padding:32,textAlign:"center",color:"var(--dsw-alias-text-tertiary)"}},"\u6B63\u5728\u8BFB\u53D6\u63D2\u4EF6\u72B6\u6001\u4E0E\u5FEB\u7167..."));let h=e?.isIncident,y=e?.disabledFromHealthy||[],b=e?.currentThirdParty||[],w=e?.inactiveInstalled||[],_=(()=>{if(e?.snapshotsTotalSize&&e.snapshotsTotalSize!=="0 KB")return e.snapshotsTotalSize;let a=e?.snapshotsCount||0;if(a===0)return"0 KB";let i=(e?.currentPatchSize||0)+1500;return(a*i/1024).toFixed(1)+" KB"})();return s.default.createElement("div",{className:"pg-container"},s.default.createElement("style",null,S),s.default.createElement("div",{className:"pg-header"},s.default.createElement("div",{className:"pg-header-left"},s.default.createElement("div",{className:"pg-icon-badge"},s.default.createElement(Q,{size:22})),s.default.createElement("div",{className:"pg-title-wrap"},s.default.createElement("h2",null,"DSH \u63D2\u4EF6\u7BA1\u5BB6"),s.default.createElement("p",null,"Profile \u72B6\u6001\u5B88\u62A4 \xB7 \u81EA\u52A8\u5FEB\u7167 \xB7 \u4E8B\u6545\u4E00\u952E\u6062\u590D \xB7 \u8131\u673A\u5E94\u6025\u4FEE\u590D"))),s.default.createElement("div",{className:"pg-actions"},s.default.createElement("button",{className:"pg-btn",onClick:O,disabled:p,title:"\u624B\u52A8\u5C06\u5F53\u524D\u6240\u6709\u5F00\u542F\u7684\u63D2\u4EF6\u4E0E\u914D\u7F6E\u8BB0\u5F55\u4E3A\u65B0\u5FEB\u7167"},s.default.createElement(X,{size:14}),s.default.createElement("span",null,"\u4FDD\u5B58\u5FEB\u7167")),s.default.createElement("button",{className:"pg-btn",onClick:L,disabled:p,title:"\u5728\u684C\u9762\u751F\u6210\u4E00\u4E2A\u53CC\u51FB\u5373\u53EF\u6062\u590D\u7684\u811A\u672C\uFF0CDSH \u95EA\u9000\u4E0D\u5F00\u65F6\u53EF\u7528"},s.default.createElement(Y,{size:14}),s.default.createElement("span",null,"\u5BFC\u51FA\u684C\u9762\u5E94\u6025\u811A\u672C")),s.default.createElement("button",{className:"pg-btn",onClick:c,disabled:p},s.default.createElement(Z,{size:14}),s.default.createElement("span",null,"\u5237\u65B0")))),s.default.createElement("div",{className:"pg-content"},h&&s.default.createElement("div",{className:"pg-incident-banner"},s.default.createElement("div",{className:"pg-incident-header"},s.default.createElement("div",{className:"pg-incident-icon"},s.default.createElement(R,{size:20})),s.default.createElement("div",{className:"pg-incident-title"},"\u68C0\u6D4B\u5230\u7CFB\u7EDF\u6B64\u524D\u6267\u884C\u4E86\u5168\u76D8\u7981\u7528\uFF0C\u53D1\u73B0\u7B2C\u4E09\u65B9\u63D2\u4EF6\u88AB\u505C\u7528")),s.default.createElement("div",{className:"pg-incident-desc"},"\u68C0\u6D4B\u5230\u4E0A\u4E00\u6B21\u5065\u5EB7\u5FEB\u7167\u4E2D\u6FC0\u6D3B\u7684 ",s.default.createElement("strong",null,y.length)," \u4E2A\u7B2C\u4E09\u65B9\u63D2\u4EF6\u5F53\u524D\u5DF2\u88AB\u5BBF\u4E3B\u79FB\u51FA\u6FC0\u6D3B\u5217\u8868\u3002 \u4F60\u53EF\u4EE5\u76F4\u63A5\u4E00\u952E\u5168\u90E8\u6062\u590D\uFF0C\u6216\u52FE\u9009\u6392\u9664\u521A\u624D\u5BFC\u81F4\u95EA\u9000\u7684\u53EF\u7591\u63D2\u4EF6\uFF1A"),s.default.createElement("div",{className:"pg-plugin-selection-box"},y.map(a=>{let i=d.has(a);return s.default.createElement("div",{key:a,className:"pg-plugin-item",onClick:()=>F(a)},s.default.createElement("div",{className:"pg-plugin-item-left"},s.default.createElement("input",{type:"checkbox",checked:i,onChange:()=>{},style:{cursor:"pointer"}}),s.default.createElement(j,{size:14}),s.default.createElement("span",{className:"pg-plugin-name"},a)),s.default.createElement("span",{className:"pg-plugin-tag"},"\u5F85\u6062\u590D"))})),e?.patchNeedsRecovery&&s.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,fontSize:13}},s.default.createElement("input",{type:"checkbox",id:"restorePatchCheck",checked:x,onChange:a=>H(a.target.checked),style:{cursor:"pointer"}}),s.default.createElement("label",{htmlFor:"restorePatchCheck",style:{cursor:"pointer",color:"var(--dsw-alias-text-primary)"}},"\u540C\u65F6\u4ECE\u6700\u65B0\u7684 ",s.default.createElement("code",null,"cordis.patch.yml.bak")," \u4E2D\u627E\u56DE\u88AB\u6E05\u7A7A\u7684\u7528\u6237\u914D\u7F6E")),s.default.createElement("div",{style:{display:"flex",gap:10,marginTop:4}},s.default.createElement("button",{className:"pg-btn pg-btn-primary",onClick:()=>m(y,x),disabled:p},s.default.createElement(ss,{size:14}),s.default.createElement("span",null,"\u4E00\u952E\u5168\u91CF\u6062\u590D\u6240\u6709\u63D2\u4EF6 (",y.length,")")),s.default.createElement("button",{className:"pg-btn",onClick:()=>m(Array.from(d),x),disabled:p||d.size===0},s.default.createElement(es,{size:14}),s.default.createElement("span",null,"\u6062\u590D\u52FE\u9009\u63D2\u4EF6 (",d.size,")")))),s.default.createElement("div",{className:"pg-card"},s.default.createElement("div",{className:"pg-card-title"},s.default.createElement("span",null,"\u5F53\u524D Profile \u63D2\u4EF6\u8FD0\u884C\u72B6\u6001"),s.default.createElement("span",{className:"pg-badge-healthy"},s.default.createElement("span",{className:"pg-dot"}),h?"\u5904\u4E8E\u6062\u590D\u6392\u67E5\u6A21\u5F0F":"\u5065\u5EB7\u8FD0\u884C\u4E2D")),s.default.createElement("div",{style:{fontSize:13,color:"var(--dsw-alias-text-secondary)",lineHeight:1.6}},"\u5F53\u524D\u5171\u6FC0\u6D3B ",s.default.createElement("strong",null,e?.currentBundles?.length||0)," \u4E2A\u7EC4\u5408\u884C\uFF08\u542B"," ",s.default.createElement("strong",null,b.length)," \u4E2A\u7B2C\u4E09\u65B9\u63D2\u4EF6\uFF09\u3002",e?.latestHealthy?s.default.createElement("span",null," ","\u6700\u8FD1\u5065\u5EB7\u5FEB\u7167\u5EFA\u7ACB\u4E8E\uFF1A",s.default.createElement("strong",null,e.latestHealthy.timeString),"\uFF08",B(e.latestHealthy.reason,e.latestHealthy.reasonText),"\uFF09\u3002"):s.default.createElement("span",null," \u5C1A\u672A\u5EFA\u7ACB\u5065\u5EB7\u57FA\u51C6\u5FEB\u7167\u3002")),s.default.createElement("div",{className:"pg-list",style:{marginTop:8}},b.map(a=>s.default.createElement("div",{key:a,className:"pg-row"},s.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:8}},s.default.createElement(j,{size:15}),s.default.createElement("span",{className:"pg-row-name"},a)),s.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:8}},s.default.createElement("span",{className:"pg-plugin-tag",style:{background:"rgba(22, 163, 74, 0.1)",color:"#16a34a"}},"\u5DF2\u6FC0\u6D3B"),a==="@supertiny99/dsh-plugin-guardian"||a==="dsh-plugin-guardian"?s.default.createElement("span",{style:{fontSize:12,color:"var(--dsw-alias-text-tertiary)",padding:"2px 6px"},title:"\u63D2\u4EF6\u7BA1\u5BB6\u6B63\u5728\u5B88\u62A4\u7CFB\u7EDF\uFF0C\u4E0D\u53EF\u5728\u6B64\u5173\u95ED"},"\u5B88\u62A4\u4E2D"):s.default.createElement("button",{className:"pg-btn",style:{padding:"3px 8px",fontSize:12},onClick:()=>I(a,!1),disabled:p,title:"\u5C06\u8BE5\u63D2\u4EF6\u4ECE\u6FC0\u6D3B\u5217\u8868\u4E2D\u79FB\u9664\uFF08\u624B\u52A8\u5173\u95ED\uFF09"},s.default.createElement(T,{size:12}),s.default.createElement("span",null,"\u624B\u52A8\u5173\u95ED"))))),b.length===0&&s.default.createElement("div",{style:{padding:"12px 0",fontSize:13,color:"var(--dsw-alias-text-tertiary)"}},"\u6682\u65E0\u5DF2\u6FC0\u6D3B\u7684\u7B2C\u4E09\u65B9\u63D2\u4EF6\u3002"))),w.length>0&&!h&&s.default.createElement("div",{className:"pg-card"},s.default.createElement("div",{className:"pg-card-title"},s.default.createElement("span",null,"\u5DF2\u5728 dependencies \u5B89\u88C5\u3001\u4F46\u672A\u6FC0\u6D3B\u7684\u7B2C\u4E09\u65B9\u63D2\u4EF6 (",w.length,")")),s.default.createElement("div",{className:"pg-list"},w.map(a=>s.default.createElement("div",{key:a,className:"pg-row"},s.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:8}},s.default.createElement(T,{size:14}),s.default.createElement("span",{className:"pg-row-name"},a)),s.default.createElement("button",{className:"pg-btn pg-btn-primary",style:{padding:"3px 10px",fontSize:12},onClick:()=>I(a,!0),disabled:p,title:"\u5C06\u8BE5\u63D2\u4EF6\u52A0\u5165\u6FC0\u6D3B\u5217\u8868\uFF08\u624B\u52A8\u6FC0\u6D3B\uFF09"},s.default.createElement("span",null,"\u624B\u52A8\u6FC0\u6D3B")))))),e?.bakFiles?.length>0&&s.default.createElement("div",{className:"pg-card"},s.default.createElement("div",{className:"pg-card-title"},s.default.createElement("span",null,"cordis.patch.yml \u914D\u7F6E\u5907\u4EFD\u5386\u53F2 (",e.bakFiles.length," \u4EFD)")),s.default.createElement("div",{style:{fontSize:12,color:"var(--dsw-alias-text-tertiary)"}},"\u5F53 DSH \u53D1\u751F\u5D29\u6E83\u6062\u590D\u65F6\uFF0C\u539F\u914D\u7F6E\u4F1A\u88AB\u91CD\u547D\u540D\u4E3A bak \u4FDD\u5B58\u3002\u4F60\u53EF\u4EE5\u968F\u65F6\u5BF9\u6BD4\u5E76\u627E\u56DE\u914D\u7F6E\uFF1A"),s.default.createElement("div",{className:"pg-list"},e.bakFiles.slice(0,3).map(a=>s.default.createElement("div",{key:a.fileName,className:"pg-row"},s.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},s.default.createElement(as,{size:16}),s.default.createElement("div",null,s.default.createElement("div",{className:"pg-row-name"},a.fileName),s.default.createElement("div",{className:"pg-row-meta"},"\u65F6\u95F4: ",a.mtimeString," \xB7 \u5927\u5C0F: ",a.size," \u5B57\u8282"))),s.default.createElement("button",{className:"pg-btn",style:{padding:"4px 10px",fontSize:12},onClick:()=>M(a.fileName),disabled:p},"\u4ECE\u5907\u4EFD\u8986\u76D6\u8FD8\u539F\u914D\u7F6E"))))),s.default.createElement("div",{className:"pg-card"},s.default.createElement("div",{className:"pg-card-title"},s.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},s.default.createElement("span",null,"\u5386\u53F2\u5065\u5EB7\u5FEB\u7167 (",e?.snapshotsCount||0,")"),s.default.createElement("span",{style:{fontSize:12,fontWeight:"normal",color:"var(--dsw-alias-text-tertiary)"}},"\u5360\u7528\u78C1\u76D8: ",_)),e?.snapshotsCount>2&&s.default.createElement("button",{className:"pg-btn",style:{padding:"3px 8px",fontSize:12},onClick:V,disabled:p,title:"\u4EC5\u4FDD\u7559\u6700\u8FD1 2 \u4EFD\u5FEB\u7167\uFF0C\u6E05\u7406\u66F4\u65E9\u7684\u5386\u53F2\u8BB0\u5F55"},s.default.createElement(P,{size:12}),s.default.createElement("span",null,"\u6E05\u7406\u65E7\u5FEB\u7167"))),s.default.createElement("div",{className:"pg-list"},e?.recentSnapshots?.map(a=>s.default.createElement("div",{key:a.id,className:"pg-row"},s.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},s.default.createElement(is,{size:15}),s.default.createElement("div",null,s.default.createElement("div",{className:"pg-row-name",style:{display:"flex",alignItems:"center",gap:8}},s.default.createElement("span",null,a.timeString),s.default.createElement("span",{style:{fontSize:11,color:"var(--dsw-alias-text-tertiary)"}},"(",a.sizeText||(((e?.currentPatchSize||0)+1500)/1024).toFixed(1)+" KB",")")),s.default.createElement("div",{className:"pg-row-meta",style:{display:"flex",alignItems:"center",gap:6,marginTop:2,flexWrap:"wrap"}},s.default.createElement("span",null,"\u89E6\u53D1\u64CD\u4F5C:"),s.default.createElement("span",{className:"pg-reason-tag"},B(a.reason,a.reasonText)),s.default.createElement("span",null,"\xB7"),s.default.createElement("span",null,"\u7B2C\u4E09\u65B9\u63D2\u4EF6: ",a.thirdPartyCount," \u4E2A")))),s.default.createElement("div",{style:{display:"flex",alignItems:"center",gap:8}},s.default.createElement("button",{className:"pg-btn",style:{padding:"4px 10px",fontSize:12},onClick:()=>m(a.thirdPartyBundles,!1),disabled:p||a.thirdPartyCount===0,title:"\u5C06\u63D2\u4EF6\u6FC0\u6D3B\u72B6\u6001\u56DE\u6EDA\u4E3A\u6B64\u5FEB\u7167"},"\u6062\u590D\u4E3A\u6B64\u5FEB\u7167"),s.default.createElement("button",{className:"pg-btn",style:{padding:"4px 8px",fontSize:12,color:"var(--dsw-alias-intent-danger, #ef4444)"},onClick:()=>A(a.id),disabled:p,title:"\u5220\u9664\u6B64\u4EFD\u5FEB\u7167"},s.default.createElement(P,{size:13})))))))),z&&s.default.createElement("div",{className:"pg-toast"},z))}function rs({size:e=20,active:n=!1}){return s.default.createElement("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:n?2.2:1.6,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true"},s.default.createElement("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}))}var os=["slots"];function ls(e){e.slots.inject("sidebar.panellist",()=>e.slots.register({name:"sidebar.panellist",id:"plugin-guardian",order:70,label:"\u63D2\u4EF6\u7BA1\u5BB6"},rs)),e.slots.inject("main",()=>e.slots.register({name:"main",key:"plugin-guardian"},ts))}
return module.exports}})
