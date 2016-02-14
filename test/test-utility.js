/* global process */
/* global before */
/* global __dirname */
/* global describe */
/* global it */
'use strict';
const assert = require('yeoman-assert');
const mock = require('yeoman-test');
const path = require('path');
/**
 * @module util
 */
let util = (function () {
  
  function goCreate(subgenerator, tempDir) {
    var testDirectory;
    if (tempDir) {
      before(function () {
        testDirectory = mock.testDirectory;
        mock.testDirectory = function (dir, cb) {
          process.chdir(dir);
          cb();
        };
      });
      after(function () {
        mock.testDirectory = testDirectory;
      });
    }
    before(function (done) {
      const context = mock.run(path.join(__dirname, '../' + subgenerator));
      
      if (tempDir) {
        context.inDir(tempDir);
      }
      
      context.on('end', done);
    });
  }
  
  function goCreateWithArgs(subgenerator, args, tempDir) {
    var testDirectory;
    if (tempDir) {
      before(function () {
        testDirectory = mock.testDirectory;
        mock.testDirectory = function (dir, cb) {
          process.chdir(dir);
          cb();
        };
      });
      after(function () {
        mock.testDirectory = testDirectory;
      });
    }
    before(function (done) {
      const context = mock.run(path.join(__dirname, '../' + subgenerator))
        .withArguments(args);
      
      if (tempDir) {
        context.inDir(tempDir);
      }
      
      context.on('end', done);
    });
  }
  
  function goCreateApplication(type, applicationName, tempDir) {
    before(function (done) {
      var mockPrompt = {
        type: type,
        applicationName: applicationName
      };

      const context = mock.run(path.join(__dirname, '../app'))
        .withPrompts(mockPrompt);

      if (tempDir) {
        context.inDir(tempDir);
      }

      context.on('end', done);
    });
  }

  function goCreateApplicationWithOptions(type, applicationName, options) {
    before(function (done) {
      var mockPrompt = {
        type: type,
        applicationName: applicationName
      };

      mock.run(path.join(__dirname, '../app'))
        .withPrompts(mockPrompt)
        .withOptions(options)
        .on('end', done);
    });
  }

  function filesCheck(file) {
    it(file + ' created.', function () {
      assert.file(file);
    });
  }

  function fileCheck(message, file) {
    describe('File Creatoon', function () {
      it(message, function () {
        assert.file(file);
      });
    });
  }
  
  function fileContentCheck(file, message, content) {
    it(message, function () {
      assert.fileContent(file, content);
    });
  }

  const methods = {
    goCreateApplication: goCreateApplication,
    goCreateApplicationWithOptions: goCreateApplicationWithOptions,
    goCreateWithArgs: goCreateWithArgs,
    fileCheck: fileCheck,
    filesCheck: filesCheck,
    fileContentCheck: fileContentCheck
  };

  return methods;
})();

module.exports = util;
