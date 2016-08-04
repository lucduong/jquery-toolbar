/**
 * Js
 * configuration
 * object
 *
 */
// config
var config = require('../../config.json');
var pkg = require('../../package.json');
var banner = '/*!\n' +
  ' * ' + pkg.name + ' (' + pkg.homepage + ')\n' +
  ' * Copyright ' + new Date().getFullYear() + ' ' + pkg.author.name + ' (' + pkg.author.email + ')' + '\n' +
  ' * Licensed under the ' + pkg.license + '\n' +
  ' */\n';

module.exports = {
  banner: banner,
  sass: {
    precision: 6,
    sourcemap: 'auto',
    outputStyle: 'expanded',
    trace: true,
    bundleExec: true,
    includePaths: [
      config.source.sass
    ]
  },
  autoprefixer: {
    browsers: config.autoprefixerBrowsers
  },
  csscomb: {
    configPath: config.source.sass + '/.csscomb.json'
  },
  minify: {
    compatibility: 'ie8',
    keepSpecialComments: '*',
    advanced: false
  }
};
