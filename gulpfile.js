var gulp       = require('gulp');
var nodemon    = require('gulp-nodemon');

var livereload = require('gulp-livereload');

gulp.task('develop', function () {
  nodemon({script: '.', ext: 'js hjs json', legacyWatch: true });
});


gulp.task('default', ['develop']);