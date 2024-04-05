"use strict";(()=>{(self.webpackChunkardos_web=self.webpackChunkardos_web||[]).push([[4930,6403],{4665:c=>{c.exports=p,p.displayName="markupTemplating",p.aliases=[];function p(f){(function(u){function g(a,t){return"___"+a.toUpperCase()+t+"___"}Object.defineProperties(u.languages["markup-templating"]={},{buildPlaceholders:{value:function(a,t,n,i){if(a.language===t){var s=a.tokenStack=[];a.code=a.code.replace(n,function(r){if(typeof i=="function"&&!i(r))return r;for(var o=s.length,e;a.code.indexOf(e=g(t,o))!==-1;)++o;return s[o]=r,e}),a.grammar=u.languages.markup}}},tokenizePlaceholders:{value:function(a,t){if(a.language!==t||!a.tokenStack)return;a.grammar=u.languages[t];var n=0,i=Object.keys(a.tokenStack);function s(r){for(var o=0;o<r.length&&!(n>=i.length);o++){var e=r[o];if(typeof e=="string"||e.content&&typeof e.content=="string"){var E=i[n],S=a.tokenStack[E],d=typeof e=="string"?e:e.content,b=g(t,E),k=d.indexOf(b);if(k>-1){++n;var T=d.substring(0,k),y=new u.Token(t,u.tokenize(S,a.grammar),"language-"+t,S),h=d.substring(k+b.length),l=[];T&&l.push.apply(l,s([T])),l.push(y),h&&l.push.apply(l,s([h])),typeof e=="string"?r.splice.apply(r,[o,1].concat(l)):e.content=l}}else e.content&&s(e.content)}return r}s(a.tokens)}}})})(f)}},9381:(c,p,f)=>{var u=f(4665);c.exports=g,g.displayName="tt2",g.aliases=[];function g(a){a.register(u),function(t){t.languages.tt2=t.languages.extend("clike",{comment:/#.*|\[%#[\s\S]*?%\]/,keyword:/\b(?:BLOCK|CALL|CASE|CATCH|CLEAR|DEBUG|DEFAULT|ELSE|ELSIF|END|FILTER|FINAL|FOREACH|GET|IF|IN|INCLUDE|INSERT|LAST|MACRO|META|NEXT|PERL|PROCESS|RAWPERL|RETURN|SET|STOP|SWITCH|TAGS|THROW|TRY|UNLESS|USE|WHILE|WRAPPER)\b/,punctuation:/[[\]{},()]/}),t.languages.insertBefore("tt2","number",{operator:/=[>=]?|!=?|<=?|>=?|&&|\|\|?|\b(?:and|not|or)\b/,variable:{pattern:/\b[a-z]\w*(?:\s*\.\s*(?:\d+|\$?[a-z]\w*))*\b/i}}),t.languages.insertBefore("tt2","keyword",{delimiter:{pattern:/^(?:\[%|%%)-?|-?%\]$/,alias:"punctuation"}}),t.languages.insertBefore("tt2","string",{"single-quoted-string":{pattern:/'[^\\']*(?:\\[\s\S][^\\']*)*'/,greedy:!0,alias:"string"},"double-quoted-string":{pattern:/"[^\\"]*(?:\\[\s\S][^\\"]*)*"/,greedy:!0,alias:"string",inside:{variable:{pattern:/\$(?:[a-z]\w*(?:\.(?:\d+|\$?[a-z]\w*))*)/i}}}}),delete t.languages.tt2.string,t.hooks.add("before-tokenize",function(n){var i=/\[%[\s\S]+?%\]/g;t.languages["markup-templating"].buildPlaceholders(n,"tt2",i)}),t.hooks.add("after-tokenize",function(n){t.languages["markup-templating"].tokenizePlaceholders(n,"tt2")})}(a)}}}]);})();

//# sourceMappingURL=react-syntax-highlighter_languages_refractor_tt2-f566b85bc432b001d684.bundle.js.map