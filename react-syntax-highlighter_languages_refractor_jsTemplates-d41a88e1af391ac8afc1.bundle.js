"use strict";(()=>{(self.webpackChunkardos_web=self.webpackChunkardos_web||[]).push([[4814],{3870:C=>{C.exports=d,d.displayName="jsTemplates",d.aliases=[];function d(q){(function(a){var h=a.languages.javascript["template-string"],O=h.pattern.source,b=h.inside.interpolation,E=b.inside["interpolation-punctuation"],S=b.pattern.source;function g(t,n){if(a.languages[t])return{pattern:RegExp("((?:"+n+")\\s*)"+O),lookbehind:!0,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},"embedded-code":{pattern:/[\s\S]+/,alias:t}}}}a.languages.javascript["template-string"]=[g("css",/\b(?:styled(?:\([^)]*\))?(?:\s*\.\s*\w+(?:\([^)]*\))*)*|css(?:\s*\.\s*(?:global|resolve))?|createGlobalStyle|keyframes)/.source),g("html",/\bhtml|\.\s*(?:inner|outer)HTML\s*\+?=/.source),g("svg",/\bsvg/.source),g("markdown",/\b(?:markdown|md)/.source),g("graphql",/\b(?:gql|graphql(?:\s*\.\s*experimental)?)/.source),g("sql",/\bsql/.source),h].filter(Boolean);function L(t,n){return"___"+n.toUpperCase()+"_"+t+"___"}function A(t,n,r){var e={code:t,grammar:n,language:r};return a.hooks.run("before-tokenize",e),e.tokens=a.tokenize(e.code,e.grammar),a.hooks.run("after-tokenize",e),e.tokens}function G(t){var n={};n["interpolation-punctuation"]=E;var r=a.tokenize(t,n);if(r.length===3){var e=[1,1];e.push.apply(e,A(r[1],a.languages.javascript,"javascript")),r.splice.apply(r,e)}return new a.Token("interpolation",r,b.alias,t)}function H(t,n,r){var e=a.tokenize(t,{interpolation:{pattern:RegExp(S),lookbehind:!0}}),l=0,f={},p=e.map(function(s){if(typeof s=="string")return s;for(var o=s.content,i;t.indexOf(i=L(l++,r))!==-1;);return f[i]=o,i}).join(""),v=A(p,n,r),y=Object.keys(f);l=0;function u(s){for(var o=0;o<s.length;o++){if(l>=y.length)return;var i=s[o];if(typeof i=="string"||typeof i.content=="string"){var j=y[l],w=typeof i=="string"?i:i.content,_=w.indexOf(j);if(_!==-1){++l;var T=w.substring(0,_),R=G(f[j]),m=w.substring(_+j.length),c=[];if(T&&c.push(T),c.push(R),m){var x=[m];u(x),c.push.apply(c,x)}typeof i=="string"?(s.splice.apply(s,[o,1].concat(c)),o+=c.length-1):i.content=c}}else{var z=i.content;Array.isArray(z)?u(z):u([z])}}}return u(v),new a.Token(r,v,"language-"+r,t)}var M={javascript:!0,js:!0,typescript:!0,ts:!0,jsx:!0,tsx:!0};a.hooks.add("after-tokenize",function(t){if(!(t.language in M))return;function n(r){for(var e=0,l=r.length;e<l;e++){var f=r[e];if(typeof f!="string"){var p=f.content;if(!Array.isArray(p)){typeof p!="string"&&n([p]);continue}if(f.type==="template-string"){var v=p[1];if(p.length===3&&typeof v!="string"&&v.type==="embedded-code"){var y=k(v),u=v.alias,s=Array.isArray(u)?u[0]:u,o=a.languages[s];if(!o)continue;p[1]=H(y,o,s)}}else n(p)}}}n(t.tokens)});function k(t){return typeof t=="string"?t:Array.isArray(t)?t.map(k).join(""):k(t.content)}})(q)}}}]);})();

//# sourceMappingURL=react-syntax-highlighter_languages_refractor_jsTemplates-d41a88e1af391ac8afc1.bundle.js.map