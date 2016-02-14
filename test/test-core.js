/* global __dirname */
'use strict';
const assert = require('yeoman-assert');
const util = require('./test-utility');

/**
 * can be imported
 */
describe('swift generator', function () {
  it('can be imported', function () {
    const app = require('../app');
    assert.notEqual(app, undefined);
  });
});

/**
 * yo swift Empty Application
 */
describe('swift - Empty Application', function () {
  util.goCreateApplication('empty', 'emptyTest');

  describe('Checking directories', function () {
    it('Application directory created', function () {
      assert.file('emptyTest/');
    });

    const files = [
      'emptyTest/project.json',
      'emptyTest/Package.swift',
      'emptyTest/Sources/main.swift',
      'emptyTest/.gitignore'
    ];
    describe('Checking files', function () {
      for (var i = 0; i < files.length; i++) {
        util.filesCheck(files[i]);
      }
    });
  });
});

/**
 * yo swift Console Application
 */
describe('swift - Console Application', function () {
  util.goCreateApplication('console', 'consoleTest');

  describe('Checking directories', function () {
    it('Application directory created', function () {
      assert.file('consoleTest/');
    });

    const files = [
      'consoleTest/project.json',
      'consoleTest/Package.swift',
      'consoleTest/Sources/main.swift',
      'consoleTest/README.md',
      'consoleTest/.gitignore'
    ];
    describe('Checking files', function () {
      for (var i = 0; i < files.length; i++) {
        util.filesCheck(files[i]);
      }
    });
  });
});

/**
 * yo swift Library
 */
describe('swift - Library', function () {
  util.goCreateApplication('library', 'libraryTest');

  describe('Checking directories', function () {
    it('Application directory created', function () {
      assert.file('libraryTest/');
    });

    const files = [
      'libraryTest/project.json',
      'libraryTest/Package.swift',
      'libraryTest/Sources/libraryTest.swift',
      'libraryTest/README.md',
      'libraryTest/.gitignore'
    ];
    describe('Checking files', function () {
      for (var i = 0; i < files.length; i++) {
        util.filesCheck(files[i]);
      }
    });
  });
});
