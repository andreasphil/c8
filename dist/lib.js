function d(n){return n}var h=(n,...t)=>String.raw({raw:n},...t),u=h,p=h;function l(n){let t=document.createElement("template");return t.innerHTML=n,t.content.cloneNode(!0)}var c=class extends HTMLElement{static tag="";static attrs={};static events=[];static define(t=this.tag){if(!t)throw new Error("Custom element must specify a tag name");customElements.define(t,this)}static get observedAttributes(){return Object.keys(this.attrs)}get styles(){}get template(){throw new Error("Custom element must specify a template")}attrs;get#t(){return this.shadowRoot??this}constructor(){super();try{this.attachShadow({mode:"open"})}catch{}}connectedCallback(){this.#e(),this.#s(),this.#n(),this.#r()}ref(t){let e=this.maybeRef(t);if(!e)throw new Error(`Ref with name ${String(t)} was not found`);return e}maybeRef(t){return this.#t.querySelector(`[data-ref="${String(t)}"]`)??void 0}refs(){let t={};return this.#t.querySelectorAll("[data-ref]").forEach(e=>{e instanceof HTMLElement&&e.dataset.ref&&(t[e.dataset.ref]=e)}),t}emit(t,e){let s=new CustomEvent(String(t),{bubbles:!0,cancelable:!0,composed:!0,detail:e});this.dispatchEvent(s)}#e(){if(this.template.startsWith("#")){let t=document.querySelector(this.template);if(!(t instanceof HTMLTemplateElement))throw new Error(`${this.template} is not a template element`);this.#t.appendChild(t.content.cloneNode(!0))}else{let t=l(this.template);this.#t.appendChild(t)}}#s(){if(!this.styles)return;if(!(this.#t instanceof ShadowRoot))throw new Error('CSS is not supported when "shadow" is disabled');let t=new CSSStyleSheet;t.replaceSync(this.styles),this.#t.adoptedStyleSheets.push(t)}#r(){let{events:t}=this.constructor;t.forEach(e=>{this.#t.addEventListener(e,s=>{if(!(s.target instanceof HTMLElement))return;let i=s.target,a=`on:${s.type}`,r=`[data-${a.replace(":","\\:")}]`,o=i.dataset[a];!o&&(i=i.closest(r))&&(o=i.dataset[a]),this[o]?.(s)})})}#n(){let{attrs:t}=this.constructor;this.attrs??={},Object.entries(t).forEach(([e,s])=>{let i=s.stringify??(r=>r?.toString()??""),a=s.parse??(r=>r);Object.defineProperty(this.attrs,e,{get:()=>a(this.getAttribute(e)),set:r=>this.setAttribute(e,i(r))}),s.default&&!this.getAttribute(e)&&this.setAttribute(e,s.default())})}};export{c as C8,p as css,d as defineAttr,u as html,l as renderTemplate};
//# sourceMappingURL=lib.js.map
