/**
 * Created by luc on 02/08/16.
 */

// gulp
var gulp = require('gulp');
var gutil = require('gulp-util');
var sequence = require('run-sequence');
var notify = require('gulp-notify');

// utils
var lazyQuire = require('./gulp/utils/lazyQuire');
var pumped = require('./gulp/utils/pumped');
var notiFaker = require('./gulp/utils/notifaker');

// config
var config = require('./config.json');
// gulpfile booting message
gutil.log(gutil.colors.green('Starting to Gulp! Please wait...'));

// plugins
var run = require('run-sequence')
  , del = require('del')
  , watch = require('gulp-watch')
  , exec = require('gulp-exec')
  , sass = require('gulp-sass');

/**
 * CSS Distribution
 */
gulp.task('styles:clean', [], lazyQuire(require, './gulp/recipes/styles/clean'));

gulp.task('styles:jquery-toolbar', [], lazyQuire(require, './gulp/recipes/styles/jquery-toolbar'));
gulp.task('styles:dist', [], lazyQuire(require, './gulp/recipes/styles/dist-jquery-toolbar'));

gulp.task('dev-css', function (done) {
  sequence('styles:clean', 'styles:jquery-toolbar', function () {
    done();

    notiFaker(pumped('CSS Generated!'));
  });
});

gulp.task('dist-clean', function (done) {
  del(config.dist.path, {force: true})
    .then(function () {
      done();
    });
});

/**
 * JS distribution
 */
gulp.task('scripts:clean', [], lazyQuire(require, './gulp/recipes/scripts/clean'));

gulp.task('scripts:dev', [], lazyQuire(require, './gulp/recipes/scripts/dev'));
gulp.task('scripts:dist', [], lazyQuire(require, './gulp/recipes/scripts/dist'));

gulp.task('dev-js', function (done) {
  sequence('scripts:clean', 'scripts:dev', function () {
    done();

    notiFaker(pumped('JS Generated!'));
  });
});

/**
 * Copy images
 */
gulp.task('dev-images', function () {
  return gulp.src(config.source.images + "/**/*")
    .pipe(gulp.dest(config.destination.images));
});

/**
 * Watch
 */
gulp.task('watch', function () {
  gulp.watch(config.source.sass + "/**/*.scss", ['dev-css']);
  gulp.watch(config.source.js + "/**/*.js", ['dev-js']);
});

gulp.task('default', ['dev-css', 'dev-js', 'dev-images', 'watch']);

gulp.task('dist', function (done) {
  sequence('dist-clean', 'styles:dist', 'scripts:dist', function () {
    done();

    notiFaker(pumped('Completed distribution!!'));
  });
});