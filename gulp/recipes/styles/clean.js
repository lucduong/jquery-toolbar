/**
 * Created by luc on 02/08/16.
 */
var del = require('del');

// config
var config = require('../../../config.json');

module.exports = function (done) {
  del(config.destination.css + '/**/*.css', {force: true})
    .then(function () {
      done();
    });
};
