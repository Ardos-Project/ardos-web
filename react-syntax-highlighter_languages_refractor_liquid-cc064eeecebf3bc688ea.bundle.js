"use strict";(()=>{(self.webpackChunkardos_web=self.webpackChunkardos_web||[]).push([[7912,6403],{2139:(d,p,f)=>{var l=f(4665);d.exports=c,c.displayName="liquid",c.aliases=[];function c(e){e.register(l),e.languages.liquid={comment:{pattern:/(^\{%\s*comment\s*%\})[\s\S]+(?=\{%\s*endcomment\s*%\}$)/,lookbehind:!0},delimiter:{pattern:/^\{(?:\{\{|[%\{])-?|-?(?:\}\}|[%\}])\}$/,alias:"punctuation"},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},keyword:/\b(?:as|assign|break|(?:end)?(?:capture|case|comment|for|form|if|paginate|raw|style|tablerow|unless)|continue|cycle|decrement|echo|else|elsif|in|include|increment|limit|liquid|offset|range|render|reversed|section|when|with)\b/,object:/\b(?:address|all_country_option_tags|article|block|blog|cart|checkout|collection|color|country|country_option_tags|currency|current_page|current_tags|customer|customer_address|date|discount_allocation|discount_application|external_video|filter|filter_value|font|forloop|fulfillment|generic_file|gift_card|group|handle|image|line_item|link|linklist|localization|location|measurement|media|metafield|model|model_source|order|page|page_description|page_image|page_title|part|policy|product|product_option|recommendations|request|robots|routes|rule|script|search|selling_plan|selling_plan_allocation|selling_plan_group|shipping_method|shop|shop_locale|sitemap|store_availability|tax_line|template|theme|transaction|unit_price_measurement|user_agent|variant|video|video_source)\b/,function:[{pattern:/(\|\s*)\w+/,lookbehind:!0,alias:"filter"},{pattern:/(\.\s*)(?:first|last|size)/,lookbehind:!0}],boolean:/\b(?:false|nil|true)\b/,range:{pattern:/\.\./,alias:"operator"},number:/\b\d+(?:\.\d+)?\b/,operator:/[!=]=|<>|[<>]=?|[|?:=-]|\b(?:and|contains(?=\s)|or)\b/,punctuation:/[.,\[\]()]/,empty:{pattern:/\bempty\b/,alias:"keyword"}},e.hooks.add("before-tokenize",function(t){var s=/\{%\s*comment\s*%\}[\s\S]*?\{%\s*endcomment\s*%\}|\{(?:%[\s\S]*?%|\{\{[\s\S]*?\}\}|\{[\s\S]*?\})\}/g,i=!1;e.languages["markup-templating"].buildPlaceholders(t,"liquid",s,function(o){var r=/^\{%-?\s*(\w+)/.exec(o);if(r){var n=r[1];if(n==="raw"&&!i)return i=!0,!0;if(n==="endraw")return i=!1,!0}return!i})}),e.hooks.add("after-tokenize",function(t){e.languages["markup-templating"].tokenizePlaceholders(t,"liquid")})}},4665:d=>{d.exports=p,p.displayName="markupTemplating",p.aliases=[];function p(f){(function(l){function c(e,t){return"___"+e.toUpperCase()+t+"___"}Object.defineProperties(l.languages["markup-templating"]={},{buildPlaceholders:{value:function(e,t,s,i){if(e.language===t){var o=e.tokenStack=[];e.code=e.code.replace(s,function(r){if(typeof i=="function"&&!i(r))return r;for(var n=o.length,a;e.code.indexOf(a=c(t,n))!==-1;)++n;return o[n]=r,a}),e.grammar=l.languages.markup}}},tokenizePlaceholders:{value:function(e,t){if(e.language!==t||!e.tokenStack)return;e.grammar=l.languages[t];var s=0,i=Object.keys(e.tokenStack);function o(r){for(var n=0;n<r.length&&!(s>=i.length);n++){var a=r[n];if(typeof a=="string"||a.content&&typeof a.content=="string"){var m=i[s],b=e.tokenStack[m],g=typeof a=="string"?a:a.content,k=c(t,m),_=g.indexOf(k);if(_>-1){++s;var h=g.substring(0,_),v=new l.Token(t,l.tokenize(b,e.grammar),"language-"+t,b),y=g.substring(_+k.length),u=[];h&&u.push.apply(u,o([h])),u.push(v),y&&u.push.apply(u,o([y])),typeof a=="string"?r.splice.apply(r,[n,1].concat(u)):a.content=u}}else a.content&&o(a.content)}return r}o(e.tokens)}}})})(f)}}}]);})();

//# sourceMappingURL=react-syntax-highlighter_languages_refractor_liquid-cc064eeecebf3bc688ea.bundle.js.map