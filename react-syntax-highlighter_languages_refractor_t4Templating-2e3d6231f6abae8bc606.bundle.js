"use strict";(()=>{(self.webpackChunkardos_web=self.webpackChunkardos_web||[]).push([[2279],{6509:i=>{i.exports=s,s.displayName="t4Templating",s.aliases=[];function s(l){(function(r){function n(e,a,t){return{pattern:RegExp("<#"+e+"[\\s\\S]*?#>"),alias:"block",inside:{delimiter:{pattern:RegExp("^<#"+e+"|#>$"),alias:"important"},content:{pattern:/[\s\S]+/,inside:a,alias:t}}}}function c(e){var a=r.languages[e],t="language-"+e;return{block:{pattern:/<#[\s\S]+?#>/,inside:{directive:n("@",{"attr-value":{pattern:/=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/,inside:{punctuation:/^=|^["']|["']$/}},keyword:/\b\w+(?=\s)/,"attr-name":/\b\w+/}),expression:n("=",a,t),"class-feature":n("\\+",a,t),standard:n("",a,t)}}}}r.languages["t4-templating"]=Object.defineProperty({},"createT4",{value:c})})(l)}}}]);})();

//# sourceMappingURL=react-syntax-highlighter_languages_refractor_t4Templating-2e3d6231f6abae8bc606.bundle.js.map