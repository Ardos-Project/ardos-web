"use strict";(()=>{(self.webpackChunkardos_web=self.webpackChunkardos_web||[]).push([[8156],{5599:s=>{s.exports=e,e.displayName="latex",e.aliases=["tex","context"];function e(i){(function(a){var t=/\\(?:[^a-z()[\]]|[a-z*]+)/i,n={"equation-command":{pattern:t,alias:"regex"}};a.languages.latex={comment:/%.*/,cdata:{pattern:/(\\begin\{((?:lstlisting|verbatim)\*?)\})[\s\S]*?(?=\\end\{\2\})/,lookbehind:!0},equation:[{pattern:/\$\$(?:\\[\s\S]|[^\\$])+\$\$|\$(?:\\[\s\S]|[^\\$])+\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/,inside:n,alias:"string"},{pattern:/(\\begin\{((?:align|eqnarray|equation|gather|math|multline)\*?)\})[\s\S]*?(?=\\end\{\2\})/,lookbehind:!0,inside:n,alias:"string"}],keyword:{pattern:/(\\(?:begin|cite|documentclass|end|label|ref|usepackage)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,lookbehind:!0},url:{pattern:/(\\url\{)[^}]+(?=\})/,lookbehind:!0},headline:{pattern:/(\\(?:chapter|frametitle|paragraph|part|section|subparagraph|subsection|subsubparagraph|subsubsection|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\})/,lookbehind:!0,alias:"class-name"},function:{pattern:t,alias:"selector"},punctuation:/[[\]{}&]/},a.languages.tex=a.languages.latex,a.languages.context=a.languages.latex})(i)}}}]);})();

//# sourceMappingURL=react-syntax-highlighter_languages_refractor_latex-756b614a2dd2731fadc6.bundle.js.map