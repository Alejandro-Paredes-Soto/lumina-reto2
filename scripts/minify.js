const fs = require("fs");

function minifyCSS(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>~+])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

function minifyJS(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}();,=+\-<>!&|?:])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

const css = fs.readFileSync("css/styles.css", "utf8");
const js = fs.readFileSync("js/app.js", "utf8");
const cssMin = minifyCSS(css);
const jsMin = minifyJS(js);

fs.writeFileSync("css/styles.min.css", cssMin);
fs.writeFileSync("js/app.min.js", jsMin);

console.log(`CSS ${css.length} -> ${cssMin.length}`);
console.log(`JS ${js.length} -> ${jsMin.length}`);
