// include gulp
var gulp = require('gulp')

// include plugins
var jshint = require('gulp-jshint')
var sass = require('gulp-sass')
var minifyCSS = require('gulp-minify-css')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var sourcemaps = require('gulp-sourcemaps')
var babel = require('gulp-babel')
var jade = require('gulp-jade')
var pug = require('gulp-pug')

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
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

// concatenate and minify js
gulp.task('scripts', function() {
  return gulp.src('./src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

// jade
gulp.task('pug', function() {
  return gulp.src('./src/pug/**/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

// browser sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
})

gulp.task('watch', ['browserSync', 'sass', 'scripts', 'pug'], function() {
  gulp.watch('./src/scss/*.scss', ['sass'])
  gulp.watch('./src/pug/**/*.pug', ['pug'])
  gulp.watch('./src/js/*.js', ['scripts'])
})

gulp.task('default', ['watch'])
