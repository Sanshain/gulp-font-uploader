// example of using with gulp-less:


var sourcemaps = require('gulp-sourcemaps');
var gulp = require('gulp');
var less = require('gulp-less');
var cache = require('gulp-cached');
var cssnano = require('gulp-cssnano');
var fontGetter = require('gulp-font-uploader');

gulp.task('less', function () {  

  return gulp.src('./style/packages/**/*.less')
    .pipe(cache('less', {
      optimizeMemory: true
    }))
    .pipe(sourcemaps.init())
    .pipe(less({}))    
    .pipe(fontGetter({static_url: '/static/'}))
    .pipe(cssnano())    
    .pipe(sourcemaps.write())  
    .pipe(gulp.dest('./style'));
});

gulp.task('watch', function () {
  console.log(78);
  gulp.watch('./style/packages/**/*.less', gulp.series('less'))
});

gulp.task('default', gulp.series('less', 'watch'));
