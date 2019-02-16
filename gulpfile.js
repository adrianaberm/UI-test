var gulp = require('gulp')
var pug = require('gulp-pug')
var sass = require('gulp-sass')
var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')
var eslint = require('gulp-eslint')
var gulpSequence = require('gulp-sequence')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var postcssPresetEnv = require('postcss-preset-env')
var precss = require('precss')
var babel = require("gulp-babel");
var data = require('gulp-data');


var browserSync = require('browser-sync').create('Server')
var reload = browserSync.reload

var exec = require('child_process').exec;

var rulesEsLint = {
  'env': {
    'es6': true,
    'browser': true,
  },
  'parserOptions': {
    'ecmaVersion': 6,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  'extends': 'eslint:recommended',
  'rules': {
    'no-console': ['error', {
      allow: ['warn', 'error', 'log']
    }]
  }
}

var noWebkitTransform = function (css) {
  css.walkDecls('transition-property', function (decl) {
    if (decl.value.indexOf('-webkit-transform') >= 0) decl.remove()
  })
}

gulp.task('html', function () {
  return gulp.src('./src/snippets/*.pug')
	  .pipe(data(function(file) {
	      return { require: require }
	    }))
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('dist'))
})

gulp.task('css', function () {
  var processors = [
    autoprefixer({
      browsers: ['last 15 version']
    }),
    postcssPresetEnv,
    precss,
    noWebkitTransform
  ]
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist/static/css'))
})

gulp.task('js', function () {
  return gulp.src(['./src/js/*.js'])
    .pipe(eslint(rulesEsLint))// Inicio LintJs
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())// Fin LintJs
    .pipe(sourcemaps.init())
    .pipe(babel())
    .on('error', console.error.bind(console))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/static/js'))
})


function reloadBrowserMsg(){
  browserSync.reload();
  browserSync.resume()
}


gulp.task('guiaEstilos', function (cb) {
  exec('node ./node_modules/.bin/nucleus', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task('guiaEstilos-css', function () {
  var processors = [
    autoprefixer({
      browsers: ['last 15 version']
    }),
    postcssPresetEnv,
    precss,
    noWebkitTransform
  ]
  return gulp.src('./src/TemplateNucleus/styles/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist/styleguide/styles'))
})


gulp.task('js-watch', ['js'], function (done) {
  reloadBrowserMsg()
  done();
});

gulp.task('html-watch', ['html'], function (done) {
  reloadBrowserMsg()
  done();
});

gulp.task('css-watch', ['css', 'guiaEstilos'], function (done) {
  reloadBrowserMsg()
  done();
});

gulp.task('guiaEstilos-watch', ['guiaEstilos'], function (done) {
  reloadBrowserMsg()
  done();
});

gulp.task('guiaEstilosCSS-watch', ['guiaEstilos-css'], function (done) {
  reloadBrowserMsg()
  done();
});

// Static server
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './dist',
      open: true,
      browser: 'google chrome'
    }
  })
})

//'guiaEstilos', 'guiaEstilos-css',
gulp.task('gulp-sequence', gulpSequence('js', 'css',  'html', 'browser-sync'))
gulp.task('default', ['gulp-sequence'], function () {
  gulp.watch('./src/scss/**/*.scss', ['css-watch'])
  gulp.watch('./src/TemplateNucleus/**/*.pug', ['guiaEstilos-watch'])
  gulp.watch('./src/TemplateNucleus/styles/**/*.scss', ['guiaEstilosCSS-watch'])
  gulp.watch('./src/snippets/**/*.pug', ['html-watch'])
  gulp.watch('./src/js/*.js', ['js-watch'])
})