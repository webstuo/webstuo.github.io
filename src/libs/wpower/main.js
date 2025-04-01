(()=>{"use strict";var __webpack_modules__={319:(e,t,n)=>{n.d(t,{A:()=>l});var i=n(911);class a{static Screens={};static Coms={};static Menus={};_____UTILS_____(){}static set_title(e){document.title=e}static com_is_loaded(e){return null!=d$(`div[com-name="${e}"]`)}static get_screen(e){return r.Screens[e].Instance}static get_last_com(e){return r.Coms[e].Instance}static remove_com(e){var t=d$$(`div[com-name="${e}"]`);if(null!=t&&0!=t.length)for(let e of t)e.remove()}static parse_h(e){var t=e.split("\n");for(let e=0;e<t.length;e++)t[e].indexOf("$1{for_(")>=0&&(t[e]=t[e].trimRight()+"\\`"),t[e].indexOf("${for_(")>=0&&(t[e]=t[e].trimRight()+"`"),t[e].indexOf("$1{for_key_(")>=0&&(t[e]=t[e].trimRight()+"\\`"),t[e].indexOf("${for_key_(")>=0&&(t[e]=t[e].trimRight()+"`"),t[e]=t[e].replaceAll("#$1","\\`)}"),t[e]=t[e].replaceAll("#$","`)}"),t[e]=t[e].replaceAll("$2{","\\\\\\${"),t[e]=t[e].replaceAll("$1{","\\${");return t.join("\n")}_____CORE_____(){}static init_screen(e,t,n,i){a.Screens[e]={Class:t,Html:n.toString(),Css:i.toString(),Html_Parsed:r.parse_h(n),Instance:{}}}static init_com(e,t,n,i){a.Coms[e]={Class:t,Html:n.toString(),Css:i.toString(),Html_Parsed:r.parse_h(n),Instance:{}}}static render_screen(e,t){var n=a.Screens[e],l=new n.Class(t);l.Name=e,l.Data=t,l.Data._Con=l,l.init(),1!=l._init_done&&loge(`Screen ${e}: Must inherit 'init' and call super.init(this) inside!`);var s=d$("body");if(s.innerHTML=i.A.parse_dom(i.A.eval_ctx("`"+n.Html_Parsed+"`",l.Data),l.Data),s.attr("screen-name",e),null==d$(`style[screen-name="${e}"]`)){var o=d$("head"),_=new_ele("style");_.textContent=n.Css,_.attr("screen-name",e),o.appendChild(_)}return s.Controller=l,r.Screens[e].Instance=l,l.render(),l.load_data(),l}static render_com(e,t,n,l=!1,s=!1){var o,_=null==e;_&&(e=(o=l).Name,n=o.Wrapper.parentElement);var c=a.Coms[e];_?(o.Data=t,o.Data._Key=o.Key):((o=new c.Class(t)).Name=e,o.Data=t,o.Data._Key=o.Key,o.Data._Con=o,o.init(),"string"==typeof n&&(n=d$(n)),1!=o._init_done&&loge(`Component ${e}: Must inherit 'init' and call super.init(this) inside!`));var d=new_ele("div");if(d.innerHTML=i.A.parse_dom(i.A.eval_ctx("`"+c.Html_Parsed+"`",o.Data),o.Data),d.attr("com-name",e),d.attr("key",o.Key),!0===s?d.attr("style","display:inline-block;"):d.attr("style","display:block;"),d.classList.add("com-wrapper"),_?o.Wrapper.replaceWith(d):null!=n&&(l||(n.innerHTML=""),n.appendChild(d)),!_&&null==d$(`style[com-name="${e}"]`)){var u=d$("head"),h=new_ele("style");h.textContent=c.Css,h.attr("com-name",e),u.appendChild(h)}return o.Wrapper=d,o.Wrapper.Controller=o,r.Coms[e].Instance=o,o.render(d),o.load_data(d),null!=n?o:d.outerHTML}static reg_menu(e,t){r.Menus[e]=t}static get_menu(e){return r.Menus[e]}}window.cvm_=a;const r=a,l=a},911:(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _cvm_cvm_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(319);function OX_INDENT_Result(){}function _____PROTOTYPE_____(){}function _____CLASS_____(){}Element.prototype.attr=function(e,t){if(null==t)return this.getAttribute(e);this.setAttribute(e,t)},Element.prototype.attrs=function(){return this.getAttributeNames()},Element.prototype.css=function(e){for(let t in e)this.style[t]=e[t]},Element.prototype.html=function(e){this.innerHTML=e},Element.prototype.show=function(){this.removeAttribute("hidden")},Element.prototype.hide=function(){this.setAttribute("hidden","true")},Element.prototype.disp=function(e){e?this.show():this.hide()},Element.prototype.on=function(e,t){this.addEventListener(e,t)},Element.prototype.to_top=function(){this.scrollBy(0,-Number.MAX_SAFE_INTEGER)},Element.prototype.to_bottom=function(){this.scrollBy(0,Number.MAX_SAFE_INTEGER)};class ut{_____JS_LANG_____(){}static new_lock(){var e;return[new Promise(((t,n)=>{e=t})),e]}static eval_ctx(Jscode,Data){var Result=function(Jscode){return eval(Jscode)}.call(Data,Jscode);return Result}_____UTILS_____(){}static ls_empty(e){return null==localStorage[e]||0==localStorage[e].trim().length}static d$(e){return document.querySelector(e)}static d$$(e){return[...document.querySelectorAll(e)]}static e$(e,t){return e.querySelector(":scope "+t)}static e$$(e,t){return[...e.querySelectorAll(":scope "+t)]}static get_style(e,t){return e.currentStyle?e.currentStyle[t]:window.getComputedStyle?window.getComputedStyle(e,null).getPropertyValue(t):null}static new_ele(e,t=null){var n=document.createElement(e);return null!=t&&(n.innerHTML=t),n}static escape_html(e){return null==e?null:e.replaceAll("<","&lt;").replaceAll(">","&gt;")}static escape_attr(e){return null==e?null:e.replaceAll("'","&apos;").replaceAll('"',"&quot;").replaceAll("\n"," ")}static move(e,t,n){t!=n&&(t>n?e.splice(n,0,e.splice(t,1)[0]):e.splice(n-1,0,e.splice(t,1)[0]))}_____TEMPLATING_____(){}_____Legacy_____(){}static v_(e){return e}static if_(e){return e?"":"hidden"}static for_(e,t){var n="";for(let i of e)n+=thisclass.eval_ctx("`"+t+"`",i);return n}static for_key_(e,t){var n="";for(let i in e)n+=thisclass.eval_ctx("`"+t+"`",{Key:i,Val:e[i]});return n}static com_(e,t){return _cvm_cvm_js__WEBPACK_IMPORTED_MODULE_0__.A.render_com(e,t,null,!1)}static call_(e,t){for(var n=e.target;null!=n;){if(null!=n.attr("screen-name")||null!=n.attr("com-name"))return"function"!=typeof n.Controller[t]?void loge(`No such method '${t}', event:`,e):void n.Controller[t](e);n=n.parentElement}loge(`No such method '${t}', event:`,e)}_____New_____(){}static get_live_menu_item(e,t){if(t[0]=__h(t[0]),t[1]=e[t[1]],null!=t[2])for(let n=0;n<t[2].length;n++)t[2][n]=thisclass.get_live_menu_item(e,t[2][n]);return t}static get_live_menu(e,t){var n=obj(str(t));for(let t=0;t<n.length;t++)n[t]=thisclass.get_live_menu_item(e,n[t]);return n}static show_menu(e,t){e.preventDefault();for(var n=e.target;null!=n;){if(null!=n.attr("screen-name")||null!=n.attr("com-name"))return null==_cvm_cvm_js__WEBPACK_IMPORTED_MODULE_0__.A.get_menu(t)?void loge(`No such menu '${t}', event:`,e):void(2==e.button?ui.show_menu(e,null,thisclass.get_live_menu(n.Controller,_cvm_cvm_js__WEBPACK_IMPORTED_MODULE_0__.A.get_menu(t))):ui.show_menu(e,e.target,thisclass.get_live_menu(n.Controller,_cvm_cvm_js__WEBPACK_IMPORTED_MODULE_0__.A.get_menu(t))));n=n.parentElement}loge(`No such menu '${t}', event:`,e)}static parse_values(e,t,n="html"){var i;if(null!=(i=e.match(/({{[0-9A-Za-z_\s.]+}})/g))&&i.length>0){i=[...new Set(i)];for(let a of i){let i=a.replace("{{","").replace("}}","").trim();if("this"==i)e=e.replaceAll(a,t);else{let r=i.split("."),l=t;for(let e of r)l=l[e];e="html"==n||"key"==n?e.replaceAll(a,esch(l)):e.replaceAll(a,esca(l))}}}if(null==(i=e.match(/(\[\[[0-9A-Za-z_\s.]+\]\])/g))||0==i.length)return e;i=[...new Set(i)];for(let t of i){let i=t.replace("[[","").replace("]]","").trim();e="html"==n||"key"==n?e.replaceAll(t,__h(i)):"attr"==n?e.replaceAll(t,__a(i)):e.replaceAll(t,__(i))}return e}static parse_values_in_attrs(e,t){const n=thisclass.parse_values;for(let i of e.attrs())e.attr(i,n(e.attr(i),t,"attr"))}static parse_attr(e,t,n){thisclass.escape_html;const i=thisclass.escape_attr,a=thisclass.parse_values;let r,l;return r=t.indexOf("{{")>=0?a(t,n,"html"):t,l=e.attr(t),null==l||0==l.trim().length?` ${r}`:0==l.trim().indexOf("method:")?` ${r}="call(event,'${l.replace("method:","").trim()}')"`:0==l.trim().indexOf("menu:")?` ${r}="show_menu_(event,'${l.replace("menu:","").trim()}')"`:0==l.trim().indexOf("screen:")?` ${r}="cvm_.render_screen('${l.replace("screen:","").trim()}',{})"`:0==l.trim().indexOf("dialog:")?` ${r}="ui.dialog(__a('DIALOG'),'${l.replace("dialog:","").trim()}')"`:` ${r}="${i(a(l,n,"attr"))}"`}static parse_if(e,t){var n,i=Object.keys(t),a="const {";for(let e of i)a+=e+",";a+="} = this;\n",a+=e+";";try{n=thisclass.eval_ctx(a,t)}catch(e){loge("Error:",e),loge("Code:",a),n=!0}return 1==n?` if="${e}"`:` if="${e}" hidden`}static parse_for(e,t){var n=e.attr("for"),i=n.split(":"),a=i[0].trim();n=i.slice(1).join(":"),null!=e.attr("id")&&e.attr("id",e.attr("id")+rand_id()),null!=e.attr("name")&&e.attr("name",e.attr("name")+rand_id()),t._Ele=e;var r,l=Object.keys(t),s="const {";for(let e of l)s+=e+",";s+="} = this;\n",s+='var Html = "";\n',s+=`var i=0;for (${n.trim()}) {\n   ${a}._index = i;\n   Html += ut.parse_ele(_Ele,${a},1);\n   i++;}\nHtml;`;try{r=thisclass.eval_ctx(s,t)}catch(e){loge("Error:",e),loge("Code:",s),r="<div>"+e.toString()+"</div>"}return r}static parse_forkey(e,t){var n=e.attr("for-key"),i=n.split(":"),a=i[0].trim();n=i.slice(1).join(":");var r=a.split("/")[1];a=a.split("/")[0],null!=e.attr("id")&&e.attr("id",e.attr("id")+rand_id()),null!=e.attr("name")&&e.attr("name",e.attr("name")+rand_id()),t._Ele=e;var l,s=Object.keys(t),o="const {";for(let e of s)o+=e+",";o+="} = this;\n",o+='var Html = "";\n',o+=`for (${n.trim()}) {\n   Html += ut.parse_ele(_Ele,\n      {Key:${a}, Val:${r}[${a}]}\n   ,1);\n}\nHtml;`;try{l=thisclass.eval_ctx(o,t)}catch(e){loge("Error:",e),loge("Code:",o),l="<div>"+e.toString()+"</div>"}return l}static parse_com(e,t){var n,i,a=e.attr("com");if(-1==a.indexOf("/"))n=a,i=t;else{n=a.split("/")[0];let e=a.split("/")[1];if(e.indexOf("{")>=0)try{i=JSON.parse(e)}catch{loge(`Bad component JSON data (${n}):`,e),i={}}else null==t[e]?(loge(`Bad field key (${n}):`,e),i={}):i=t[e]}return _cvm_cvm_js__WEBPACK_IMPORTED_MODULE_0__.A.render_com(n,i,null,!1)}static parse_ele(e,t,n){thisclass.escape_html,thisclass.escape_attr;const i=thisclass.parse_values;var a="";if(n>0){a+="<"+e.tagName;for(let n of e.attrs())a+="if"==n?thisclass.parse_if(e.attr("if"),t):thisclass.parse_attr(e,n,t);a+=">"}for(let r of e.childNodes)if(r.nodeType==Node.TEXT_NODE)a+=i(r.nodeValue,t,"html");else if(r.nodeType==Node.COMMENT_NODE)a+=`\x3c!--${r.nodeValue}--\x3e`;else{let e=r.attrs();e.indexOf("for")>=0?(thisclass.parse_values_in_attrs(r,t),a+=thisclass.parse_for(r,t)):e.indexOf("for-key")>=0?(thisclass.parse_values_in_attrs(r,t),a+=thisclass.parse_forkey(r,t)):e.indexOf("com")>=0?(thisclass.parse_values_in_attrs(r,t),a+=thisclass.parse_com(r,t)):a+=thisclass.parse_ele(r,t,n+1)}return n>0&&-1==["area","base","br","col","embed","hr","img","input","link","meta","source","track","wbr"].indexOf(e.tagName.toLowerCase())&&(a+="</"+e.tagName+">"),a}static parse_dom(e,t){var n=new_ele("div");return n.innerHTML=e,thisclass.parse_ele(n,t,0)}}function _____WINDOW_____(){}window.ut=ut,window.new_lock=ut.new_lock,window.eval_ctx=ut.eval_ctx,window.d$=ut.d$,window.d$$=ut.d$$,window.e$=ut.e$,window.e$$=ut.e$$,window.get_style=ut.get_style,window.new_ele=ut.new_ele,window.esch=ut.escape_html,window.esca=ut.escape_attr,window.log=console.log,window.logw=console.warn,window.loge=console.error,window.logl=()=>{console.log("-".repeat(40)+"\n")},window.rand_id=()=>Math.random().toString().replace(".",""),window.rand_id_long=()=>`${rand_id()}-${rand_id()}-${rand_id()}`,window.if_=ut.if_,window.for_=ut.for_,window.for_key_=ut.for_key_,window.com_=ut.com_,window.call_=ut.call_,window.call=ut.call_,window.show_menu_=ut.show_menu,window.str=JSON.stringify,window.obj=function(e){try{return JSON.parse(e)}catch{return null}},window.keys=Object.keys,window.props=function(e){return Object.getOwnPropertyNames(Object.getPrototypeOf(e))},window.methods=function(e){var t=[];for(let n of props(e))"constructor"!=n&&"function"==typeof e[n]&&t.push(n);return t};const thisclass=ut,__WEBPACK_DEFAULT_EXPORT__=thisclass}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var n=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](n,n.exports,__webpack_require__),n.exports}__webpack_require__.d=(e,t)=>{for(var n in t)__webpack_require__.o(t,n)&&!__webpack_require__.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var __webpack_exports__={},index_cvm=__webpack_require__(319);function index_CLASS_(){}class index_base_controller{Name="";Html="";Css="";Data={};Wrapper=null;Key="";constructor(){this.Key=Math.random().toString().replace(".",""),this.$=this.$.bind(this),this.$$=this.$$.bind(this),this.remove_self=this.remove_self.bind(this)}_____UTILS_____(){}$(e){return e$(this.Wrapper,e)}$$(e){return e$$(this.Wrapper,e)}remove_self(){index_cvm.A.remove_com(this.Name)}_____CORE_____(){}init(e){if(null!=e){for(let t of methods(e))e[t]=e[t].bind(e);this._init_done=!0}}render(){}rerender(e){null!=e&&(this.Data={...this.Data,...e}),index_cvm.A.render_com(null,this.Data,null,this)}async load_data(){}}const index_thisclass=index_base_controller,index_cvm_base_controller=index_thisclass;function index_files_CLASS_(){}class index_files{static async read_file(){const[e]=await window.showOpenFilePicker(),t=await e.getFile();return[e,await t.text()]}static async write_file(e,t){e.requestPermission({mode:"readwrite"});const n=await e.createWritable();await n.write(t),await n.close()}static async write_new_file(e,t="noname.txt"){const n=await window.showSaveFilePicker({suggestedName:t});await index_files_thisclass.write_file(n,e)}}const index_files_thisclass=index_files,index_files_0=index_files_thisclass;var index_Phrases={HELLO:{en_int:"Hello",it_ita:"Ciao",vi_vnm:"Chào"}};const index_phrases=index_Phrases;function index_lang_CLASS_(){}class index_lang{_____UTILS_____(){}static cur_lang(e){var t=localStorage.Lang;return null!=t&&0!=t.trim().length||(t="en-int"),t}static const2phrase(e){var t=localStorage.Lang;return null!=t&&0!=t.trim().length||(t="en-int"),null==index_phrases[e]||null==index_phrases[e][t.replace("-","_")]?e:index_phrases[e][t.replace("-","_")]}static const2phrase_html(e){return index_lang_thisclass.const2phrase(e).replaceAll("<","&lt;").replaceAll(">","&gt;")}static const2phrase_attr(e){return index_lang_thisclass.const2phrase(e).replaceAll("'","&apos;").replaceAll('"',"&quot;").replaceAll("\n"," ")}}window.lang=index_lang,window.__=index_lang.const2phrase,window.__h=index_lang.const2phrase_html,window.__a=index_lang.const2phrase_attr;const index_lang_thisclass=index_lang,index_lang_0=null;var index_ut=__webpack_require__(911);function index_OX_INDENT_processclick(){}function index_ui_CLASS_(){}const index_NOTIF_TIMEOUT=5e3;class index_ui{static Menu_Event;_____UTILS_____(){}static get_ele_value(e){var t=e.value.trim();return[e.attr("class").trim().split(" ")[0].split("-").map((e=>e[0].toUpperCase()+e.slice(1))).join("_"),t]}_____BASICS_____(){}static async alert(e){var t=Math.random().toString().replace(".",""),n=new_ele("div");n.attr("id","Alert"+t),n.css({position:"fixed",left:0,top:0,width:"100vw",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"transparent"});var i=`<style>\n            @media(max-width:999px){\n                .ui-alert-box { width:100vw !important; left:0 !important; }\n            }\n        </style>\n        <span style="width:100vw; height:100vh; background-color:black;\n            opacity:.5;">&nbsp;</span>\n        <span class="ui-alert-box" style="width:50vw; height:50vh; background-color:white;\n                position:fixed; left:25vw; top:25vh;">\n            <div style="background-color:#ddd; padding-left:var(--line-h);">\n                <big>${__h("MESSAGE")}</big>\n            </div>\n            <div style="padding:var(--line-h); max-height:calc(50vh - 2 * var(--line-h));\n                overflow:auto;">${e}</div>\n            <div style="background-color:#eee; padding-left:var(--line-h);\n                    line-height:calc(1 * var(--line-h));">\n                <button id="Alertok${t}" style="transform:scale(1);\n                        transform-origin:top left; vertical-align:top;\n                        height:calc(1 * var(--line-h)); padding-left:1.5rem;\n                        padding-right:1.5rem;">\n                    ${__h("OKAY")}\n                </button>\n            </div>\n        </span>`;n.innerHTML=i,d$("body").appendChild(n);var[a,r]=new_lock();d$("#Alertok"+t).on("click",(e=>{r(),d$("#Alert"+t).remove()})),await a}static async confirm(e){var t=Math.random().toString().replace(".",""),n=new_ele("div");n.attr("id","Confirm"+t),n.css({position:"fixed",left:0,top:0,width:"100vw",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"transparent"});var i=`<style>\n            @media(max-width:999px){\n                .ui-cf-box { width:100vw !important; left:0 !important; }\n            }\n        </style>\n        <span style="width:100vw; height:100vh; background-color:black;\n            opacity:.5;">&nbsp;</span>\n        <span class="ui-cf-box" style="width:50vw; height:50vh; background-color:white;\n                position:fixed; left:25vw; top:25vh;">\n            <div style="background-color:#ddd; padding-left:var(--line-h);">\n                <big>${__h("CONFIRMATION")}</big>\n            </div>\n            <div style="padding:var(--line-h); max-height:calc(50vh - 2 * var(--line-h));\n                overflow:auto;">${e}</div>\n            <div style="background-color:#eee; padding-left:var(--line-h);\n                    line-height:calc(1 * var(--line-h));">\n                <button id="Confirmyes${t}" style="transform:scale(1);\n                        transform-origin:top left; vertical-align:top;\n                        height:calc(1 * var(--line-h)); padding-left:1.5rem;\n                        padding-right:1.5rem;">\n                    ${__h("YES")}\n                </button> &nbsp;\n                <button id="Confirmno${t}" style="transform:scale(1);\n                        transform-origin:top left; vertical-align:top;\n                        height:calc(1 * var(--line-h)); padding-left:1.5rem;\n                        padding-right:1.5rem;">\n                    ${__h("NO")}\n                </button>\n            </div>\n        </span>`;n.innerHTML=i,d$("body").appendChild(n);var[a,r]=new_lock();return d$("#Confirmyes"+t).on("click",(e=>{r("yes"),d$("#Confirm"+t).remove()})),d$("#Confirmno"+t).on("click",(e=>{r("no"),d$("#Confirm"+t).remove()})),await a}static async prompt(e,t=""){var n=Math.random().toString().replace(".",""),i=new_ele("div");i.attr("id","Input"+n),i.css({position:"fixed",left:0,top:0,width:"100vw",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"transparent"});var a=`<style>\n            @media(max-width:999px){\n                .ui-prom-box { width:100vw !important; left:0 !important; }\n            }\n        </style>\n        <span style="width:100vw; height:100vh; background-color:black;\n            opacity:.5;">&nbsp;</span>\n        <span class="ui-prom-box" style="width:50vw; height:50vh; background-color:white;\n                position:fixed; left:25vw; top:25vh;">\n            <div style="background-color:#ddd; padding-left:var(--line-h);">\n                <big>${__h("INPUT")}</big>\n            </div>\n            <div style="padding:var(--line-h); max-height:calc(50vh - 2 * var(--line-h));\n                overflow:auto;">\n                ${e}<br>\n                <input id="Inp${n}" style="width:100%;"/>\n            </div>            \n            <div style="background-color:#eee; padding-left:var(--line-h);\n                    line-height:calc(1 * var(--line-h));">\n                <button id="Inputok${n}" style="transform:scale(1);\n                        transform-origin:top left; vertical-align:top;\n                        height:calc(1 * var(--line-h)); padding-left:1.5rem;\n                        padding-right:1.5rem;">\n                    ${__h("OKAY")}\n                </button> &nbsp;\n                <button id="Inputcancel${n}" style="transform:scale(1);\n                        transform-origin:top left; vertical-align:top;\n                        height:calc(1 * var(--line-h)); padding-left:1.5rem;\n                        padding-right:1.5rem;">\n                    ${__h("CANCEL")}\n                </button>\n            </div>\n        </span>`;i.innerHTML=a,d$("body").appendChild(i);var r=d$("#Inp"+n);r.focus(),r.value=t;var[l,s]=new_lock();return d$("#Inputok"+n).on("click",(e=>{s(r.value.trim()),d$("#Input"+n).remove()})),d$("#Inputcancel"+n).on("click",(e=>{s(null),d$("#Input"+n).remove()})),d$("#Inp"+n).on("keydown",(e=>"Enter"==e.key?(s(r.value.trim()),void d$("#Input"+n).remove()):"Escape"==e.key?(s(null),void d$("#Input"+n).remove()):void 0)),await l}static async select(e,t,n=null){var i=Math.random().toString().replace(".",""),a=new_ele("div");a.attr("id","Select"+i),a.css({position:"fixed",left:0,top:0,width:"100vw",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"transparent"});var r="";for(let e in t)r+=e==n?`<option value="${esca(e)}" selected>${__h(t[e])}</option>`:`<option value="${esca(e)}">${__h(t[e])}</option>`;var l=`<style>\n            @media(max-width:999px){\n                .ui-sel-box { width:100vw !important; left:0 !important; }\n            }\n        </style>\n        <span style="width:100vw; height:100vh; background-color:black;\n            opacity:.5;">&nbsp;</span>\n        <span class="ui-sel-box" style="width:50vw; height:50vh; background-color:white;\n                position:fixed; left:25vw; top:25vh;">\n            <div style="background-color:#ddd; padding-left:var(--line-h);">\n                <big>${__h("SELECT")}</big>\n            </div>\n            <div style="padding:var(--line-h); max-height:calc(50vh - 2 * var(--line-h));\n                overflow:auto;">${e}</div>\n            <div>\n                <select id="Selectinp${i}" style="margin-left:var(--line-h);\n                    height:var(--line-h); width:calc(50vw - 2 * var(--line-h));\n                    font-size:var(--f-size);">${r}</select>\n            </div>\n            <div>&nbsp;</div>\n            <div style="background-color:#eee; padding-left:var(--line-h);\n                    line-height:calc(1 * var(--line-h));">\n                <button id="Selectok${i}" style="transform:scale(1);\n                        transform-origin:top left; vertical-align:top;\n                        height:calc(1 * var(--line-h)); padding-left:1.5rem;\n                        padding-right:1.5rem;">\n                    ${__h("OKAY")}\n                </button>\n                <button id="Selectcancel${i}" style="transform:scale(1);\n                        transform-origin:top left; vertical-align:top;\n                        height:calc(1 * var(--line-h)); padding-left:1.5rem;\n                        padding-right:1.5rem;">\n                    ${__h("CANCEL")}\n                </button>\n            </div>\n        </span>`;a.innerHTML=l,d$("body").appendChild(a);var[s,o]=new_lock();return d$("#Selectok"+i).on("click",(e=>{o(d$("#Selectinp"+i).value),d$("#Select"+i).remove()})),d$("#Selectcancel"+i).on("click",(e=>{o(null),d$("#Select"+i).remove()})),await s}static async dialog(e,t,n={},i=null){var a=Math.random().toString().replace(".",""),r=new_ele("div");r.attr("id","Dialog"+a),r.css({position:"fixed",left:0,top:0,width:"100vw",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"transparent"});var l=`<style>\n            @media(max-width:999px){\n                .ui-dlg-box { width:100vw !important; left:0 !important; }\n            }\n        </style>\n        <span style="width:100vw; height:100vh; background-color:black;\n            opacity:.5;">&nbsp;</span>\n        <span class="ui-dlg-box" style="width:50vw; height:50vh; background-color:white;\n                position:fixed; left:25vw; top:25vh;">\n            <div style="background-color:#ddd; padding-left:var(--line-h);">\n                <big>${e}</big>\n            </div>\n            <div style="padding:var(--line-h); max-height:calc(50vh - 2 * var(--line-h));\n                overflow:auto;">${cvm_.render_com(t,n,null)}</div>\n            <div style="background-color:#eee; padding-left:var(--line-h);\n                    line-height:calc(1 * var(--line-h));">\n                <button id="Dialogok${a}" style="transform:scale(1);\n                        transform-origin:top left; vertical-align:top;\n                        height:calc(1 * var(--line-h)); padding-left:1.5rem;\n                        padding-right:1.5rem;">\n                    ${__h("OKAY")}\n                </button>\n            </div>\n        </span>`;r.innerHTML=l,d$("body").appendChild(r);var[s,o]=new_lock();return d$("#Dialogok"+a).on("click",(e=>{var t={},n=e$$(r,"input"),i=e$$(r,"select"),l=e$$(r,"textarea");for(let e of[...n,...i,...l]){let[n,i]=index_ui_thisclass.get_ele_value(e);t[n]=i}o(t),d$("#Dialog"+a).remove()})),null!=i&&i(),await s}static notif(e,t="black"){if(null==d$("#Notif-Col")){let e=new_ele("div");e.attr("id","Notif-Col"),e.css({height:"auto",position:"fixed",right:0,bottom:0,display:"flex",alignItems:"flex-start",justifyContent:"flex-end",flexDirection:"column"}),d$("body").appendChild(e)}var n="Notif"+Math.random().toString().replace(".",""),i=d$("#Notif-Col"),a=new_ele("div");a.attr("id",n),a.innerHTML=e,a.css({padding:"1.5rem",backgroundColor:"#eee",color:t,borderRadius:"1rem"}),i.appendChild(a),a.on("click",(()=>{d$("#"+n)?.remove()})),setTimeout((()=>{d$("#"+n)?.remove()}),index_NOTIF_TIMEOUT)}_____MENUS_____(){}static find_ancestor(e,t){if(e.classList.contains(t))return e;for(;null!=e.parentElement;){if(e.parentElement.classList.contains(t))return e.parentElement;e=e.parentElement}return null}static show_menu(e,t,n,i=!1){index_ui.Menu_Event=e,window.innerWidth;var a,r=window.innerHeight;for(let e=0;e<n.length;e++)n[e]instanceof Array&&(n[e]={Text:n[e][0],callback:n[e][1],Children:n[e][2]});if(null!=t)var l=(d=t.getBoundingClientRect()).x,s=d.y,o=d.height;else e.preventDefault(),l=e.clientX,s=e.clientY,o=0;a=s<r/2?"below":"above",!0===i&&(l+=d.width+10,"below"==a?s-=d.height+10:s+=d.height+10);var _=new_ele("div");_.classList.add("ctx-menu"),_.css({position:"fixed",left:l+"px",backgroundColor:"#eee",border:"1px solid silver",borderRadius:"5px",padding:"10px"});var c="";"above"==a?_.css({bottom:r-s+"px"}):_.css({top:s+o+"px"});for(let e=0;e<n.length;e++){let t=n[e];"---sep---"!=t.Text?c+=`<div idx="${e}" class="ctx-menu-item" style="cursor:pointer;\n                        user-select:none; white-space:nowrap;"\n                    >${esch(t.Text)}\n                </div>`:c+='<div style="user-select:none;"><hr></div>'}_.innerHTML=c;var d,u=e$$(_,".ctx-menu-item");for(let e of u)e.Childitems=n[parseInt(e.attr("idx"))].Children;d$("body").appendChild(_),(d=_.getBoundingClientRect()).x+d.width>window.innerWidth&&(window.innerWidth,d.x,_.css({left:window.innerWidth-d.width+"px"}));for(let e of d$$(".ctx-menu-item"))e.on("click",(t=>{if(t.target.Childitems)index_ui_thisclass.show_menu(t,e,t.target.Childitems,!0);else{var i=parseInt(t.target.attr("idx")),a=n[i].callback;_.remove(),"function"==typeof a&&a(index_ui.Menu_Event,index_ui.Menu_Event.target.attr("data-id"))}}));function h(e){null==index_ui_thisclass.find_ancestor(e.target,"ctx-menu")&&(_.remove(),d$("body").removeEventListener("click",h))}setTimeout((()=>{d$("body").on("click",h)}),10)}_____MISCS_____(){}static async show_err(e){await index_ui_thisclass.alert("Error: "+e)}static async alert_noauth(){index_ui_thisclass.alert(__h("PLEASE_LOG_IN_TO_SAVE"))}_____DRAGDROP_____(){}static set_ondragstart(e,t){e.on("dragstart",(e=>{e.dataTransfer.setData("Text",str(t))}))}static set_ondrop(e,t){e.on("dragover",(e=>{e.preventDefault()})),e.on("dragenter",(t=>{e.attr("computed-bg",index_ut.A.get_style(e,"backgroundColor")),e.style.backgroundColor="yellow"})),e.on("dragleave",(t=>{var n=e.attr("computed-bg");e.style.backgroundColor=n})),e.on("drop",(n=>{var i=e.attr("computed-bg");e.style.backgroundColor=i;var a=n.dataTransfer.getData("URL"),r=n.dataTransfer.getData("text");null!=a&0==a.trim().length&&(a=null),null!=r&0==r.trim().length&&(r=null),n.preventDefault(),t(n,a,r)}))}}window.ui=index_ui;const index_ui_thisclass=index_ui,index_ui_0=index_ui_thisclass;class index_auth{static get_email(){}static get_sid(){}}const index_auth_thisclass=index_auth,index_modules_auth=index_auth_thisclass;function index_net_CLASS_(){}class index_net{static async get(e,t="application/json"){try{var n=await(await fetch(e)).text();if("application/json"==t)try{return JSON.parse(n)}catch{return null}return n}catch{return null}}static async post(e,t,n="application/json"){try{var i=await fetch(e,{method:"POST",body:JSON.stringify(t)}),a=await i.text();if("application/json"==n)try{return JSON.parse(a)}catch{return log("Non JSON response:",a),null}return a}catch{return null}}static async call_api(e,t={}){var n=index_modules_auth.get_email(),i=index_modules_auth.get_sid();return null==i||0==i.length?(index_ui_0.alert(__h("YOU_NEED_TO_LOGIN_FIRST")),new Error("need-auth")):(null==t&&(t={}),t.Email_=n,t.Sid_=i,await index_net_thisclass.post(e,t))}static async call_pub_api(e,t={}){return await index_net_thisclass.post(e,t)}}window.net=index_net;const index_net_thisclass=index_net,index_net_0=index_net_thisclass,index_index={base_controller:index_cvm_base_controller,cvm:index_cvm.A,files:index_files_0,langs,net:index_net_0,ui:index_ui_0,ut:index_ut.A}})();