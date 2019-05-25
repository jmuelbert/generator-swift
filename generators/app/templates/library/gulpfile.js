'use strict';
const gulp = require('gulp');
const shell = require('shelljs');

gulp.task('lint', () => {
  let lintcmd = '';
  const lintargs = '';

  if (shell.which('swiftlint')) {
    lintcmd = 'swiftlint';
  } else {
    console.log('Sorry, the swiftlint tool installed');
    return;
  }
  shell.exec(lintcmd, lintargs, (code, stdout, stderr) => {
    console.log('Exit code:', code);
    console.log('Program output:', stdout);
    console.log('Program stderr:', stderr);
  });
});

gulp.task('build', () => {
  shell.exec('swift', 'build', (code, stdout, stderr) => {
    console.log('Exit code:', code);
    console.log('Program output:', stdout);
    console.log('Program stderr:', stderr);
  });
});

gulp.task('default', ['lint', 'build']);
