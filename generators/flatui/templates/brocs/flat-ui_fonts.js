// Put the bootstrap fonts in the place that the bootstrap css expects to find them.
var pickFiles  = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');

var bootstrapFonts = pickFiles('<%= bowerDir %>/bootstrap-sass-official/assets/fonts/bootstrap', {
  srcDir: '/',
  destDir: '/assets/bootstrap'
});
