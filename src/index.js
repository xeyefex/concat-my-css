require('dotenv').config();
const glob = require('glob');
const CleanCSS = require('clean-css');
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');
const srcDir = path.join(process.cwd(), process.env.SRC_DIR);
const outputDir = path.join(process.cwd(), process.env.OUTPUT_DIR);
const outputFileName = process.env.OUTPUT_FILE_NAME;
let data;

module.exports.buildCss = function buildCss() {
  process.argv.slice(2)[0] === '-w' || process.argv.slice(2)[0] === '--watch'
    ? watchCss()
    : init();
};

function init() {
  data = '';
  getFiles(function() {
    minify();
  });
}

function watchCss() {
  init();
  console.log('Watching' + srcDir);
  chokidar.watch(srcDir, { ignored: /\./ }).on('change', function() {
    console.log('change detected');
    init();
  });
}

function getFiles(cb) {
  glob(srcDir + '/**/*.css', function(errReadingCssDir, files) {
    errReadingCssDir ? console.log(errReadingCssDir) : concatCss(files, cb);
  });
}

function concatCss(files, cb) {
  for (let i = 0; i < files.length; i++) {
    data += fs.readFileSync(files[i], 'utf8');
    if (i === files.length - 1) cb();
  }
}

function minify() {
  new CleanCSS({}).minify(data, function(errOptimizing, optimizedCss) {
    errOptimizing ? console.log(errOptimizing) : writeMinified(optimizedCss);
  });
}

function writeMinified(optimizedCss) {
  fs.writeFile(
    outputDir + outputFileName,
    optimizedCss.styles,
    'utf8',
    function(errWritingOptimized) {
      errWritingOptimized
        ? console.log(errWritingOptimized)
        : console.log('CSS BUILD COMPLETED');
    }
  );
}

module.exports.init = init;
module.exports.watchCss = watchCss;
module.exports.getFiles = getFiles;
module.exports.concatCss = concatCss;
module.exports.minify = minify;
module.exports.writeMinified = writeMinified;
