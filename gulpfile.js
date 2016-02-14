'use strict';
const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const coverage = require('gulp-coverage');
const istanbul = require('gulp-babel-istanbul');
const excludeGitignore = require('gulp-exclude-gitignore');
const jsdoc = require('gulp-jsdoc3');
const jshint = require('gulp-jshint');
const nsp = require('gulp-nsp');
const mocha = require('gulp-spawn-mocha');
const plumber = require('gulp-plumber');
const mergeStream = require('merge-stream');
const runSequence = require('run-sequence');

const MOCHA_SETTINGS = {
  reporter: 'spec',
  growl: true,
  env: {
    NODE_ENV: 'test'
  }
};

const JSDOC_SETTINGS = {
  access: 'all', //show all access levels (public, private, protected)
  // configure: './conf.json',
  source: {
    exclude: ['src/ui/vendor']
  },
  opts: {
    destination: './docs/jsdocs'
  },
  tags: {
    allowUnknownTags: true
  }
  // plugins: [
  //   'plugins/markdown'
  // ],
  // templates: {
  //   cleverLinks: false,
  //   monospaceLinks: false,
  //   default: {
  //     outputSourceFiles: true
  //   },
  //   path: 'ink-docstrap',
  //   theme: 'cerulean',
  //   navType: 'vertical',
  //   linenums: true,
  //   dateFormat: 'MMMM Do YYYY, h:mm:ss a'
  // }
};

gulp.task('nsp', function (cb) {
  nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('jshint', () => {
  return _init(gulp.src(['configuration.js',
             'script-base.js',
             'app/*.js',
             'class/*.js']))
             .pipe(jshint())
             .pipe(jshint.reporter('jshint-stylish'))
             .pipe(jshint.reporter('fail')); 
});

gulp.task('jsdoc', (next) => {
  gulp.src(['README.md',
             'CONTRUBUTION.md',
             'configuration.js',
             'script-base.js',
             'app/*.js',
             'class/*.js'], {
               read: false
             })
             .pipe(jsdoc(JSDOC_SETTINGS, next));
});

gulp.task('coverage', function (cb) {
  return gulp.src(['*.js',
             'app/*.js',
             'class/*.js'], 
             { read: false})
             .pipe(coverage.instrument({
               pattern: ['**/test*'],
               debugDirectory: 'debug'
             }))
             .pipe(mocha())
             .pipe(coverage.gather())
             .pipe(coverage.format())
             .pipe(gulp.dest('docs/reports'));
});

gulp.task('test', function (cb) {
  mergeStream(
    gulp.src(['app/*.js', 'class/*.js', '*.js'])
      .pipe(istanbul()),
    gulp.src(['test/*.js'])
      .pipe(babel())
  ).pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src(['test/*.js'])
       .pipe(mocha())
       .pipe(istanbul.writeReports()) // Creating the reports after tests ran 
       .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } })) // Enforce a coverage of at least 90% 
       .on('end', cb);
    });
});

gulp.task('watch', function () {
  gulp.watch(['*.js', 'app/**', 'class/**', 'test/**'], ['test']);
});

gulp.task('prepublish', ['nsp']);

gulp.task('default', ['jshint', 'test', 'coverage']);

/* =========================================================================
 * Helper Functions
 * =========================================================================
 */
function _init(stream) {
  stream.setMaxListeners(0);
  return stream;
}