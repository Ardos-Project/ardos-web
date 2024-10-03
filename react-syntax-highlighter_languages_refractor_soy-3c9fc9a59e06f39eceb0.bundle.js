"use strict";(()=>{(self.webpackChunkardos_web=self.webpackChunkardos_web||[]).push([[3563,6403],{4665:g=>{g.exports=f,f.displayName="markupTemplating",f.aliases=[];function f(b){(function(s){function p(a,e){return"___"+a.toUpperCase()+e+"___"}Object.defineProperties(s.languages["markup-templating"]={},{buildPlaceholders:{value:function(a,e,i,o){if(a.language===e){var r=a.tokenStack=[];a.code=a.code.replace(i,function(n){if(typeof o=="function"&&!o(n))return n;for(var l=r.length,t;a.code.indexOf(t=p(e,l))!==-1;)++l;return r[l]=n,t}),a.grammar=s.languages.markup}}},tokenizePlaceholders:{value:function(a,e){if(a.language!==e||!a.tokenStack)return;a.grammar=s.languages[e];var i=0,o=Object.keys(a.tokenStack);function r(n){for(var l=0;l<n.length&&!(i>=o.length);l++){var t=n[l];if(typeof t=="string"||t.content&&typeof t.content=="string"){var c=o[i],d=a.tokenStack[c],k=typeof t=="string"?t:t.content,m=p(e,c),y=k.indexOf(m);if(y>-1){++i;var h=k.substring(0,y),v=new s.Token(e,s.tokenize(d,a.grammar),"language-"+e,d),w=k.substring(y+m.length),u=[];h&&u.push.apply(u,r([h])),u.push(v),w&&u.push.apply(u,r([w])),typeof t=="string"?n.splice.apply(n,[l,1].concat(u)):t.content=u}}else t.content&&r(t.content)}return n}r(a.tokens)}}})})(b)}},422:(g,f,b)=>{var s=b(4665);g.exports=p,p.displayName="soy",p.aliases=[];function p(a){a.register(s),function(e){var i=/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,o=/\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b|\b0x[\dA-F]+\b/;e.languages.soy={comment:[/\/\*[\s\S]*?\*\//,{pattern:/(\s)\/\/.*/,lookbehind:!0,greedy:!0}],"command-arg":{pattern:/(\{+\/?\s*(?:alias|call|delcall|delpackage|deltemplate|namespace|template)\s+)\.?[\w.]+/,lookbehind:!0,alias:"string",inside:{punctuation:/\./}},parameter:{pattern:/(\{+\/?\s*@?param\??\s+)\.?[\w.]+/,lookbehind:!0,alias:"variable"},keyword:[{pattern:/(\{+\/?[^\S\r\n]*)(?:\\[nrt]|alias|call|case|css|default|delcall|delpackage|deltemplate|else(?:if)?|fallbackmsg|for(?:each)?|if(?:empty)?|lb|let|literal|msg|namespace|nil|@?param\??|rb|sp|switch|template|xid)/,lookbehind:!0},/\b(?:any|as|attributes|bool|css|float|html|in|int|js|list|map|null|number|string|uri)\b/],delimiter:{pattern:/^\{+\/?|\/?\}+$/,alias:"punctuation"},property:/\w+(?==)/,variable:{pattern:/\$[^\W\d]\w*(?:\??(?:\.\w+|\[[^\]]+\]))*/,inside:{string:{pattern:i,greedy:!0},number:o,punctuation:/[\[\].?]/}},string:{pattern:i,greedy:!0},function:[/\w+(?=\()/,{pattern:/(\|[^\S\r\n]*)\w+/,lookbehind:!0}],boolean:/\b(?:false|true)\b/,number:o,operator:/\?:?|<=?|>=?|==?|!=|[+*/%-]|\b(?:and|not|or)\b/,punctuation:/[{}()\[\]|.,:]/},e.hooks.add("before-tokenize",function(r){var n=/\{\{.+?\}\}|\{.+?\}|\s\/\/.*|\/\*[\s\S]*?\*\//g,l="{literal}",t="{/literal}",c=!1;e.languages["markup-templating"].buildPlaceholders(r,"soy",n,function(d){return d===t&&(c=!1),c?!1:(d===l&&(c=!0),!0)})}),e.hooks.add("after-tokenize",function(r){e.languages["markup-templating"].tokenizePlaceholders(r,"soy")})}(a)}}}]);})();

//# sourceMappingURL=react-syntax-highlighter_languages_refractor_soy-3c9fc9a59e06f39eceb0.bundle.js.map