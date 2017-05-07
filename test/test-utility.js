/* global __dirname */

'use strict';
var util = (function() {
    const assert = require('yeoman-assert');
    const mock = require('yeoman-test');
    const path = require('path');
    const os = require('os');
    const crypto = require('crypto');

    function makeTempDir() {
        return path.join(os.tmpdir(), crypto.randomBytes(20).toString('hex'));
    }

    function goCreate(subgenerator, tempDir) {
        let testDirectory;
        if (tempDir) {
            // Don't clear the test directory, we need it to have previous contents.
            before(function() {
                testDirectory = mock.testDirectory;
                mock.testDirectory = function(dir, cb) {
                    process.chdir(dir);
                    cb();
                };
            });
            after(function() {
                mock.testDirectory = testDirectory;
            });
        }
        before(function(done) {
            const ctx = mock.run(path.join(__dirname, '../' + subgenerator));

            if (tempDir) {
                ctx.inDir(tempDir);
            }

            ctx.on('end', done);
        });
    }

    function goCreateWithArgs(subgenerator, args, tempDir) {
        let testDirectory;
        if (tempDir) {
            // Don't clear the test directory, we need it to have previous contents.
            before(function() {
                testDirectory = mock.testDirectory;
                mock.testDirectory = function(dir, cb) {
                    process.chdir(dir);
                    cb();
                };
            });
            after(function() {
                mock.testDirectory = testDirectory;
            });
        }
        before(function(done) {
            const ctx = mock.run(path.join(__dirname, '../' + subgenerator))
                .withArguments(args);

            if (tempDir) {
                ctx.inDir(tempDir);
            }

            ctx.on('end', done);
        });
    }

    function goCreateApplication(type, applicationName, tempDir) {
        before(function(done) {
            const mockPrompt = {
                type: type,
                applicationName: applicationName
            };

            const ctx = mock.run(path.join(__dirname, '../app'))
                .withPrompts(mockPrompt);

            if (tempDir) {
                ctx.inDir(tempDir);
            }

            ctx.on('end', done);
        });
    }

    function goCreateApplicationWithOptions(type, applicationName, options) {
        before(function(done) {
            const mockPrompt = {
                type: type,
                applicationName: applicationName
            };

            mock.run(path.join(__dirname, '../app'))
                .withPrompts(mockPrompt)
                .withOptions(options)
                .on('end', done);
        });
    }

    function dirsCheck(dirs) {
        describe('Directories Creation', function() {
            for (let i = 0; i < dirs.length; i++) {
                /*jshint loopfunc: true */
                it(dirs[i] + ' created.', function() {
                    assert.file(dirs[i]);
                });
            }
        });
    }

    function filesCheck(file) {
        it(file + ' created.', function() {
            assert.file(file);
        });
    }

    function dirCheck(message, dir) {
        describe('Directory Creation', function() {
            it(message, function() {
                assert.file(dir);
            });
        });
    }

    function fileCheck(message, file) {
        describe('File Creation', function() {
            it(message, function(done) {
                return new Promise(function(resolve) {
                        assert.file(file);
                        console.log('Check file: ' + file);
                    })
                    .then(done);
            });
        });
    }

    function fileContentCheck(file, message, content) {
        it(message, function(done) {
            return new Promise(function(resolve) {
                    assert.fileContent(file, content);
                    resolve();
                })
                .then(done);
        });
    }


    /**
     * The opposite function: specific content cannot be found
     * in a file assertion
     * @param  {String} file
     * @param  {String} message
     * @param  {String} content
     * @return {Boolean} true if condition is met
     */
    function noFileContentCheck(file, message, content) {
        it(message, function() {
            assert.noFileContent(file, content);
        });
    }


    const methods = {
        goCreateApplication: goCreateApplication,
        goCreateApplicationWithOptions: goCreateApplicationWithOptions,
        goCreate: goCreate,
        goCreateWithArgs: goCreateWithArgs,
        fileCheck: fileCheck,
        filesCheck: filesCheck,
        dirCheck: dirCheck,
        dirsCheck: dirsCheck,
        fileContentCheck: fileContentCheck,
        noFileContentCheck: noFileContentCheck,
        makeTempDir: makeTempDir
    };

    return methods;
})();

module.exports = util;