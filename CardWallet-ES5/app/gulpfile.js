const gulp = require('gulp');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const source  = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
const concat = require('gulp-concat');
const less = require('gulp-less');
const clean = require('gulp-clean');

const bundlePaths = {
  mainJS: 'public/js/main.js',
  sourceJS: ['public/js/main.js', 'public/js/**/*.js'],
  mainLess: 'public/less/main.less',
  sourceLess: ['public/less/main.less', 'public/js/**/*.less'],
  mainHtml: 'public/index.html',
  sourceAssets: 'public/assets/**/*',
  sourceMockApi: 'public/mock-api/**/*.json'
};

const bundler = browserify( bundlePaths.mainJS, {debug:true})
  .transform(babelify, { presets: ['es2015', 'stage-1'] });

function bundle () {
  return bundler.bundle()
  .on('error', (error) => { console.error(error); this.emit('end') })
  .pipe(source('dist.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./dist/js'))
};

gulp.task('js', bundle);

gulp.task('clean', () => {
  return gulp.src('./dist/**/*')
  .pipe(clean({force: true}))
});

gulp.task('less', () => {
    return gulp.src(bundlePaths.sourceLess)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(concat('dist.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'))
});

gulp.task('copy', () => {
  gulp.src(bundlePaths.mainHtml)
  .pipe(gulp.dest('./dist'))
});

gulp.task('assets', () => {
  gulp.src([bundlePaths.sourceAssets])
  .pipe(gulp.dest('./dist/assets'))
});

gulp.task('mocks', () => {
    gulp.src(bundlePaths.sourceMockApi)
    .pipe(gulp.dest('./dist/api'))
});

gulp.task('watch', () => {
  gulp.watch(bundlePaths.mainHtml, ['copy']);
  gulp.watch(bundlePaths.sourceJS, ['js']);
  gulp.watch(bundlePaths.sourceLess, ['less']);
  gulp.watch(bundlePaths.sourceMockApi, ['mocks']);
});

gulp.task('default', ['js', 'less', 'assets', 'mocks', 'copy', 'watch' ]);
