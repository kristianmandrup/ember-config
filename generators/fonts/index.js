'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var helper    = require('../../lib/aid');
var aid;
var selected;

var EmberConfigFontsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    aid = helper(this);

    selected = aid.containsSelector(this, 'fonts');
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'fonts',
      message: 'Choose your font libraries',
      choices: ['fontawesome', 'icomoon', 'puse-feather', 'fontello'],
      default: ['fontawesome']
    }];

    this.prompt(prompts, function (props) {
      this.fonts = props.fonts;

      done();
    }.bind(this));
  },
  default: {
    
    // https://www.npmjs.org/package/cordova-gen-icon

    // http://css-tricks.com/examples/IconFont/
    // http://css-tricks.com/html-for-icon-font-usage/

    // https://www.npmjs.org/package/gulp-fontcustom
    // https://www.npmjs.org/package/iconfont
    // https://www.npmjs.org/package/gulp-iconfont-css
    // https://www.npmjs.org/package/gulp-iconfont
    // https://www.npmjs.org/package/gulp-svgicons2svgfont
    iconFont: function() {
      if (!aid.contains(this.fonts, 'icomoon')) return;

      aid.info('Select your icon set at: https://icomoon.io/app/#/select/font');
      aid.info('Note: To the right of each Icon library is a menu with "Select All" and more...');
      aid.thickline();

      aid.info('Instructions:');
      aid.info('  http://chipcullen.com/how-to-use-icomoon-and-icon-fonts-part-1-basic-usage');
      aid.info('  http://chipcullen.com/how-to-use-icomoon-and-icon-fonts-part-2-a-workflow');
      aid.info('  http://chipcullen.com/how-to-use-icomoon-and-icon-fonts-part-3-7-ninja-tricks');
      aid.thinline();

      aid.info('Then download selected fontset in public/assets/ as icomoon.zip');
      aid.info('unzip icomoon.zip');
      aid.info('move style.css to styles/icomoon.css');
      aid.info('Keep only the /fonts folder under public/assets');
      aid.thickline();

      aid.info('Insert icon:');
      aid.info('  <span aria-hidden="true" data-icon="&#xe001;" class="down-arrow"></span>')      
      aid.info('  <i data-icon="&#xe001;" class="down-arrow"></i>');
      aid.thickline();

      aid.info('Ninja SASS tricks. Read the last section "Get your SASS on" in part 3 :)');
      aid.info('See this gist: https://gist.github.com/chippper/6157025');
    }
  }

  writing: {
    // see: https://github.com/kiwiupover/ember-weather/tree/master/public/assets/fonts
    // https://github.com/kiwiupover/ember-weather/blob/master/app/styles/_icons.scss
    iconFont: function () {
      if (!selected('iconfont')) return;
    },
  },

  default: {
    fontelloInfo: function () {
      if (!selected('fontello')) return;

      aid.info('Please help integrate fontello support in the generator');
      aid.info('See https://www.npmjs.org/package/grunt-fontello');  
      aid.info('Sample config.json:  https://github.com/jubalm/grunt-fontello/blob/master/test/config.json');
    }    
  },

  install: {
    installFontAwesome: function () {
      if (!selected('fontawesome')) return;

      aid.install('font-awesome');
    },

    installPuseFeather: function() {
      if (!selected('puse-feather')) return;

      aid.info('See icons @ http://colebemis.com/feather')
      aid.info('To import css from node_modules, use: https://www.npmjs.org/package/npm-css');
      aid.info('build css file: npm-css /node_modules/puse-icons-feather/feather.css -o app/styles/feather.css')
      aid.install('puse-feather', 'puse-icons-feather');      
    }

    installIconFont: function () {
      // no such installer...
    }
  }
});

module.exports = EmberConfigFontsGenerator;


