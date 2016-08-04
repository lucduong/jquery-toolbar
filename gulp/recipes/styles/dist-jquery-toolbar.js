/**
 * Created by luc on 03/08/16.
 */
var sass = require('gulp-sass');
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var csscomb = require('gulp-csscomb');
var header = require('gulp-header');
var minify = require('gulp-clean-css');
var rename = require("gulp-rename");
var plumber = require('gulp-plumber');

// config
var config = require('../../../config.json');

// options
var options = require('../../options/styles');


module.exports = function () {
  return gulp.src(config.source.sass + '/jquery-toolbar.scss')
    .pipe(plumber())
    .pipe(sass(options.sass))
    .pipe(autoprefixer(options.autoprefixer))
    .pipe(csscomb(options.csscomb))
    .pipe(header(options.banner))

    .pipe(minify(options.minify))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(config.dist.path));
};
