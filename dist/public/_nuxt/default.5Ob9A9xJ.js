import{m as ue,u as re,V as Re,a as oe,b as Ie,c as Pe,d as $e,_ as Ne}from"./MobileNav.O_EACd0d.js";import{U as C,x as h,Y as ce,ai as W,a7 as R,bf as de,cd as He,p as z,K as ve,m as D,a1 as ze,L as me,M as fe,a as X,N as U,g as F,u as ge,T as j,Q as he,O,P as $,R as ye,a3 as De,S as be,bg as Fe,$ as Ye,D as q,ce as Ae,aW as A,bs as Oe,W as We,b as Y,c as n,B as ne,aw as Xe,F as we,an as Ue,o as N,e as _e,w as b,V as je,i as H,E as I,t as pe,k as xe,y as qe,f as ke,A as le,cf as Ze,h as Ke,a5 as Qe,aR as Ge,af as Je,d as et,z as tt,ag as at,bI as ot}from"./entry.2B-j7TqJ.js";import{_ as Se}from"./_plugin-vue_export-helper.x3n3nnut.js";import{V as Ve}from"./VCard.lgHhGp1w.js";import{d as Be,u as nt,a as lt,b as st,e as it}from"./scopeId.tuPx4wY5.js";import{_ as ut}from"./nuxt-link.2fz8DMO8.js";const rt=""+globalThis.__publicAssetsURL("logo.png");function ct(e){let{rootEl:s,isSticky:o,layoutItemStyles:l}=e;const a=C(!1),t=C(0),r=h(()=>{const m=typeof a.value=="boolean"?"top":a.value;return[o.value?{top:"auto",bottom:"auto",height:void 0}:void 0,a.value?{[m]:ce(t.value)}:{top:l.value.top}]});W(()=>{R(o,m=>{m?window.addEventListener("scroll",_,{passive:!0}):window.removeEventListener("scroll",_)},{immediate:!0})}),de(()=>{window.removeEventListener("scroll",_)});let w=0;function _(){const m=w>window.scrollY?"up":"down",c=s.value.getBoundingClientRect(),f=parseFloat(l.value.top??0),v=window.scrollY-Math.max(0,t.value-f),g=c.height+Math.max(t.value,f)-window.scrollY-window.innerHeight,k=parseFloat(getComputedStyle(s.value).getPropertyValue("--v-body-scroll-y"))||0;c.height<window.innerHeight-f?(a.value="top",t.value=f):m==="up"&&a.value==="bottom"||m==="down"&&a.value==="top"?(t.value=window.scrollY+c.top-k,a.value=!0):m==="down"&&g<=0?(t.value=0,a.value="bottom"):m==="up"&&v<=0&&(k?a.value!=="top"&&(t.value=-v+k+f,a.value="top"):(t.value=c.top+v,a.value="top")),w=window.scrollY}return{isStuck:a,stickyStyles:r}}const dt=100,vt=20;function se(e){return(e<0?-1:1)*Math.sqrt(Math.abs(e))*1.41421356237}function ie(e){if(e.length<2)return 0;if(e.length===2)return e[1].t===e[0].t?0:(e[1].d-e[0].d)/(e[1].t-e[0].t);let s=0;for(let o=e.length-1;o>0;o--){if(e[o].t===e[o-1].t)continue;const l=se(s),a=(e[o].d-e[o-1].d)/(e[o].t-e[o-1].t);s+=(a-l)*Math.abs(a),o===e.length-1&&(s*=.5)}return se(s)*1e3}function mt(){const e={};function s(a){Array.from(a.changedTouches).forEach(t=>{(e[t.identifier]??(e[t.identifier]=new He(vt))).push([a.timeStamp,t])})}function o(a){Array.from(a.changedTouches).forEach(t=>{delete e[t.identifier]})}function l(a){var m;const t=(m=e[a])==null?void 0:m.values().reverse();if(!t)throw new Error(`No samples for touch id ${a}`);const r=t[0],w=[],_=[];for(const c of t){if(r[0]-c[0]>dt)break;w.push({t:c[0],d:c[1].clientX}),_.push({t:c[0],d:c[1].clientY})}return{x:ie(w),y:ie(_),get direction(){const{x:c,y:f}=this,[v,g]=[Math.abs(c),Math.abs(f)];return v>g&&c>=0?"right":v>g&&c<=0?"left":g>v&&f>=0?"down":g>v&&f<=0?"up":ft()}}}return{addMovement:s,endTouch:o,getVelocity:l}}function ft(){throw new Error}function gt(e){let{isActive:s,isTemporary:o,width:l,touchless:a,position:t}=e;W(()=>{window.addEventListener("touchstart",M,{passive:!0}),window.addEventListener("touchmove",E,{passive:!1}),window.addEventListener("touchend",V,{passive:!0})}),de(()=>{window.removeEventListener("touchstart",M),window.removeEventListener("touchmove",E),window.removeEventListener("touchend",V)});const r=h(()=>["left","right"].includes(t.value)),{addMovement:w,endTouch:_,getVelocity:m}=mt();let c=!1;const f=C(!1),v=C(0),g=C(0);let k;function p(u,i){return(t.value==="left"?u:t.value==="right"?document.documentElement.clientWidth-u:t.value==="top"?u:t.value==="bottom"?document.documentElement.clientHeight-u:T())-(i?l.value:0)}function P(u){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;const d=t.value==="left"?(u-g.value)/l.value:t.value==="right"?(document.documentElement.clientWidth-u-g.value)/l.value:t.value==="top"?(u-g.value)/l.value:t.value==="bottom"?(document.documentElement.clientHeight-u-g.value)/l.value:T();return i?Math.max(0,Math.min(1,d)):d}function M(u){if(a.value)return;const i=u.changedTouches[0].clientX,d=u.changedTouches[0].clientY,y=25,S=t.value==="left"?i<y:t.value==="right"?i>document.documentElement.clientWidth-y:t.value==="top"?d<y:t.value==="bottom"?d>document.documentElement.clientHeight-y:T(),B=s.value&&(t.value==="left"?i<l.value:t.value==="right"?i>document.documentElement.clientWidth-l.value:t.value==="top"?d<l.value:t.value==="bottom"?d>document.documentElement.clientHeight-l.value:T());(S||B||s.value&&o.value)&&(c=!0,k=[i,d],g.value=p(r.value?i:d,s.value),v.value=P(r.value?i:d),_(u),w(u))}function E(u){const i=u.changedTouches[0].clientX,d=u.changedTouches[0].clientY;if(c){if(!u.cancelable){c=!1;return}const S=Math.abs(i-k[0]),B=Math.abs(d-k[1]);(r.value?S>B&&S>3:B>S&&B>3)?(f.value=!0,c=!1):(r.value?B:S)>3&&(c=!1)}if(!f.value)return;u.preventDefault(),w(u);const y=P(r.value?i:d,!1);v.value=Math.max(0,Math.min(1,y)),y>1?g.value=p(r.value?i:d,!0):y<0&&(g.value=p(r.value?i:d,!1))}function V(u){if(c=!1,!f.value)return;w(u),f.value=!1;const i=m(u.changedTouches[0].identifier),d=Math.abs(i.x),y=Math.abs(i.y);(r.value?d>y&&d>400:y>d&&y>3)?s.value=i.direction===({left:"right",right:"left",top:"down",bottom:"up"}[t.value]||T()):s.value=v.value>.5}const L=h(()=>f.value?{transform:t.value==="left"?`translateX(calc(-100% + ${v.value*l.value}px))`:t.value==="right"?`translateX(calc(100% - ${v.value*l.value}px))`:t.value==="top"?`translateY(calc(-100% + ${v.value*l.value}px))`:t.value==="bottom"?`translateY(calc(100% - ${v.value*l.value}px))`:T(),transition:"none"}:void 0);return{isDragging:f,dragProgress:v,dragStyles:L}}function T(){throw new Error}const ht=["start","end","left","right","top","bottom"],yt=z({color:String,disableResizeWatcher:Boolean,disableRouteWatcher:Boolean,expandOnHover:Boolean,floating:Boolean,modelValue:{type:Boolean,default:null},permanent:Boolean,rail:{type:Boolean,default:null},railWidth:{type:[Number,String],default:56},scrim:{type:[Boolean,String],default:!0},image:String,temporary:Boolean,touchless:Boolean,width:{type:[Number,String],default:256},location:{type:String,default:"start",validator:e=>ht.includes(e)},sticky:Boolean,...ve(),...D(),...ze(),...me(),...ue(),...fe(),...X({tag:"nav"}),...U()},"VNavigationDrawer"),bt=F()({name:"VNavigationDrawer",props:yt(),emits:{"update:modelValue":e=>!0,"update:rail":e=>!0},setup(e,s){let{attrs:o,emit:l,slots:a}=s;const{isRtl:t}=ge(),{themeClasses:r}=j(e),{borderClasses:w}=he(e),{backgroundColorClasses:_,backgroundColorStyles:m}=O($(e,"color")),{elevationClasses:c}=ye(e),{displayClasses:f,mobile:v}=De(e),{roundedClasses:g}=be(e),k=Fe(),p=Ye(e,"modelValue",null,x=>!!x),{ssrBootStyles:P}=Be(),{scopeId:M}=nt(),E=q(),V=C(!1),L=h(()=>e.rail&&e.expandOnHover&&V.value?Number(e.width):Number(e.rail?e.railWidth:e.width)),u=h(()=>Ae(e.location,t.value)),i=h(()=>!e.permanent&&(v.value||e.temporary)),d=h(()=>e.sticky&&!i.value&&u.value!=="bottom");A(()=>e.expandOnHover&&e.rail!=null,()=>{R(V,x=>l("update:rail",!x))}),A(()=>!e.disableResizeWatcher,()=>{R(i,x=>!e.permanent&&Ue(()=>p.value=!x))}),A(()=>!e.disableRouteWatcher&&!!k,()=>{R(k.currentRoute,()=>i.value&&(p.value=!1))}),R(()=>e.permanent,x=>{x&&(p.value=!0)}),Oe(()=>{e.modelValue!=null||i.value||(p.value=e.permanent||!v.value)});const{isDragging:y,dragProgress:S,dragStyles:B}=gt({isActive:p,isTemporary:i,width:L,touchless:$(e,"touchless"),position:u}),Z=h(()=>{const x=i.value?0:e.rail&&e.expandOnHover?Number(e.railWidth):L.value;return y.value?x*S.value:x}),{layoutItemStyles:K,layoutItemScrimStyles:Ce}=re({id:e.name,order:h(()=>parseInt(e.order,10)),position:u,layoutSize:Z,elementSize:L,active:h(()=>p.value||y.value),disableTransitions:h(()=>y.value),absolute:h(()=>e.absolute||d.value&&typeof Q.value!="string")}),{isStuck:Q,stickyStyles:Te}=ct({rootEl:E,isSticky:d,layoutItemStyles:K}),G=O(h(()=>typeof e.scrim=="string"?e.scrim:null)),Me=h(()=>({...y.value?{opacity:S.value*.2,transition:"none"}:void 0,...Ce.value}));We({VList:{bgColor:"transparent"}});function Ee(){V.value=!0}function Le(){V.value=!1}return Y(()=>{const x=a.image||e.image;return n(we,null,[n(e.tag,ne({ref:E,onMouseenter:Ee,onMouseleave:Le,class:["v-navigation-drawer",`v-navigation-drawer--${u.value}`,{"v-navigation-drawer--expand-on-hover":e.expandOnHover,"v-navigation-drawer--floating":e.floating,"v-navigation-drawer--is-hovering":V.value,"v-navigation-drawer--rail":e.rail,"v-navigation-drawer--temporary":i.value,"v-navigation-drawer--active":p.value,"v-navigation-drawer--sticky":d.value},r.value,_.value,w.value,f.value,c.value,g.value,e.class],style:[m.value,K.value,B.value,P.value,Te.value,e.style]},M,o),{default:()=>{var J,ee,te,ae;return[x&&n("div",{key:"image",class:"v-navigation-drawer__img"},[a.image?(J=a.image)==null?void 0:J.call(a,{image:e.image}):n("img",{src:e.image,alt:""},null)]),a.prepend&&n("div",{class:"v-navigation-drawer__prepend"},[(ee=a.prepend)==null?void 0:ee.call(a)]),n("div",{class:"v-navigation-drawer__content"},[(te=a.default)==null?void 0:te.call(a)]),a.append&&n("div",{class:"v-navigation-drawer__append"},[(ae=a.append)==null?void 0:ae.call(a)])]}}),n(Xe,{name:"fade-transition"},{default:()=>[i.value&&(y.value||p.value)&&!!e.scrim&&n("div",ne({class:["v-navigation-drawer__scrim",G.backgroundColorClasses.value],style:[Me.value,G.backgroundColorStyles.value],onClick:()=>p.value=!1},M),null)]})])}),{isStuck:Q}}}),wt={data:()=>({cards:["Today","Yesterday"],rail:!1,drawer:!1,imgSize:150})},_t=Object.assign(wt,{__name:"SideBar",setup(e){const s=[{text:"Dashboard",icon:"i-material-symbols-dashboard"},{text:"Orders",icon:"i-material-symbols-call"},{text:"Restaurants",icon:"i-material-symbols-pin-drop"},{text:"Finance",icon:"i-material-symbols-finance"},{text:"Logout",icon:"i-material-symbols-logout"}],o=q(null);return(l,a)=>l.$nuxt.$vuetify.display.smAndUp.value?(N(),_e(bt,{key:0,modelValue:o.value,"onUpdate:modelValue":a[1]||(a[1]=t=>o.value=t),rail:l.rail||l.$nuxt.$vuetify.display.smAndDown.value,permanent:"",color:"#2B2B2B"},{default:b(()=>[H("div",null,[n(je,{src:rt,alt:"food",class:"scale-11 mx-auto",width:l.imgSize,height:l.imgSize},null,8,["width","height"])]),n(Ve,{class:"rounded-e-xl me",width:"60",height:"400",color:"#545454"}),n(lt,{class:"top"},{default:b(()=>[(N(),ke(we,null,qe(s,(t,r)=>n(st,{key:r,value:t,class:"mb-5",color:"#FF6259",variant:"plain"},{prepend:b(()=>[n(I,{icon:t.icon},null,8,["icon"])]),default:b(()=>[n(it,null,{default:b(()=>[xe(pe(t.text),1)]),_:2},1024)]),_:2},1032,["value"])),64))]),_:1}),H("div",{style:{position:"absolute",bottom:"20px","margin-left":"auto","margin-right":"auto",left:"0",right:"0","text-align":"center"},onClick:a[0]||(a[0]=t=>l.rail=!l.rail)},[n(Re,{align:"center",justify:"center"},{default:b(()=>[n(oe,{cols:"auto"},{default:b(()=>[n(le,{icon:"i-material-symbols-settings",size:"small",color:"#5F3B39"})]),_:1}),n(oe,{cols:"auto"},{default:b(()=>[n(Ze,{dot:"",color:"#FF6259"},{default:b(()=>[n(le,{icon:"i-material-symbols-notifications",size:"small",color:"#5F3B39"})]),_:1})]),_:1})]),_:1})])]),_:1},8,["modelValue","rail"])):Ke("",!0)}}),pt=Se(_t,[["__scopeId","data-v-fde2c8ee"]]),xt=z({app:Boolean,color:String,height:{type:[Number,String],default:"auto"},...ve(),...D(),...me(),...ue(),...fe(),...X({tag:"footer"}),...U()},"VFooter"),kt=F()({name:"VFooter",props:xt(),setup(e,s){let{slots:o}=s;const{themeClasses:l}=j(e),{backgroundColorClasses:a,backgroundColorStyles:t}=O($(e,"color")),{borderClasses:r}=he(e),{elevationClasses:w}=ye(e),{roundedClasses:_}=be(e),m=C(32),{resizeRef:c}=Qe(g=>{g.length&&(m.value=g[0].target.clientHeight)}),f=h(()=>e.height==="auto"?m.value:parseInt(e.height,10)),{layoutItemStyles:v}=re({id:e.name,order:h(()=>parseInt(e.order,10)),position:h(()=>"bottom"),layoutSize:f,elementSize:h(()=>e.height==="auto"?void 0:f.value),active:h(()=>e.app),absolute:$(e,"absolute")});return Y(()=>n(e.tag,{ref:c,class:["v-footer",l.value,a.value,r.value,w.value,_.value,e.class],style:[t.value,e.app?v.value:{height:ce(e.height)},e.style]},o)),{}}}),St={},Vt={class:"container mx-auto px-8"},Bt={class:"flex flex-wrap justify-center space-x-8"};function Ct(e,s){const o=ut;return N(),_e(kt,{name:"footer",class:"pb-24 pt-12"},{default:b(()=>[H("div",Vt,[H("div",Bt,[n(o,{href:"https://www.facebook.com/vuedesigner","aria-label":"facebook",external:"",target:"_blank"},{default:b(()=>[n(I,{icon:"i-logos-facebook",class:"text-2xl"})]),_:1}),n(o,{href:"https://twitter.com/vuedesigner","aria-label":"twitter",external:"",target:"_blank"},{default:b(()=>[n(I,{icon:"i-logos-twitter",class:"text-2xl"})]),_:1}),n(o,{href:"https://discord.gg/BYp45Nnu5T","aria-label":"discord",external:"",target:"_blank"},{default:b(()=>[n(I,{icon:"i-logos-discord-icon",class:"text-2xl"})]),_:1}),n(o,{href:"https://www.youtube.com/@vuedesigner","aria-label":"youtube",external:"",target:"_blank"},{default:b(()=>[n(I,{icon:"i-logos-youtube-icon",class:"text-2xl"})]),_:1})])])]),_:1})}const Tt=Se(St,[["render",Ct]]);function Mt(){const e=q(!1),{$vuetify:s}=Je();return s&&Ge(()=>{e.value=s.display.smAndDown}),{smAndDown:e}}const Et=z({...D(),...Ie({fullHeight:!0}),...U()},"VApp"),Lt=F()({name:"VApp",props:Et(),setup(e,s){let{slots:o}=s;const l=j(e),{layoutClasses:a,getLayoutItem:t,items:r,layoutRef:w}=Pe(e),{rtlClasses:_}=ge();return Y(()=>{var m;return n("div",{ref:w,class:["v-application",l.themeClasses.value,a.value,_.value,e.class],style:[e.style]},[n("div",{class:"v-application__wrap"},[(m=o.default)==null?void 0:m.call(o)])])}),{getLayoutItem:t,items:r,theme:l}}}),Rt=z({scrollable:Boolean,...D(),...X({tag:"main"})},"VMain"),It=F()({name:"VMain",props:Rt(),setup(e,s){let{slots:o}=s;const{mainStyles:l}=$e(),{ssrBootStyles:a}=Be();return Y(()=>n(e.tag,{class:["v-main",{"v-main--scrollable":e.scrollable},e.class],style:[l.value,a.value,e.style]},{default:()=>{var t,r;return[e.scrollable?n("div",{class:"v-main__scroller"},[(t=o.default)==null?void 0:t.call(o)]):(r=o.default)==null?void 0:r.call(o)]}})),{}}}),Ft=et({__name:"default",setup(e){const s=Mt();return W(()=>console.log(s)),(o,l)=>{const a=Ne,t=pt,r=Tt;return N(),ke("div",null,[n(Lt,{id:"inspire",style:ot({background:o.$vuetify.theme.themes.light.colors.primary})},{default:b(()=>[n(Ve,{class:"text-white mx-auto"},{default:b(()=>[xe(pe((tt(s),o.$nuxt.$vuetify.display.width)),1)]),_:1}),n(a),n(t),n(It,{class:"py-4"},{default:b(()=>[at(o.$slots,"default")]),_:3}),n(r)]),_:3},8,["style"])])}}});export{Ft as default};
