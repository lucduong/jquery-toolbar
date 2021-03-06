/**
 * Scripts
 * configuration
 * object
 *
 */
// config
var config = require('../../config.json');
var pkg = require('../../package.json');
var banner = '/*!\n' +
  ' * ' + pkg.name + ' - ' + pkg.version + ' (' + pkg.homepage + ')\n' +
  ' * Copyright ' + new Date().getFullYear() + ' ' + pkg.author.name + ' (' + pkg.author.email + ')' + '\n' +
  ' * Licensed under the ' + pkg.license + '\n' +
  ' */\n';

module.exports = {
  banner: banner
};
