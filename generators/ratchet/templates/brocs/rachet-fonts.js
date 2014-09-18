var pickFiles = require('broccoli-static-compiler');
module.exports = pickFiles('vendor/ratchet/fonts', {
  srcDir: '/',
  files: ['ratchicons.eot', 'ratchicons.svg', 'ratchicons.ttf', 'ratchicons.woff'],
  destDir: '/fonts'
});  