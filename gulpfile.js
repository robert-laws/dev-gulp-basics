// include gulp
var gulp = require('gulp')

// include plugins
var jshint = require('gulp-jshint')
var sass = require('gulp-sass')
var minifyCSS = require('gulp-minify-css')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')

// local server
var browserSync = require('browser-sync').create()

// lint task
gulp.task('lint', function() {
  return gulp.src('./src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
})

// compile sass
gulp.task('sass', function() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

// concatenate and minify js
gulp.task('scripts', function() {
  return gulp.src('./src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

// 

// browser sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
})

gulp.task('watch', ['browserSync', 'sass', 'scripts'], function() {
  gulp.watch('./src/scss/*.scss', ['sass'])
  gulp.watch('./dist/*.html', browserSync.reload)
  gulp.watch('./src/js/*.js', ['scripts'])
})

gulp.task('default', ['watch'])
