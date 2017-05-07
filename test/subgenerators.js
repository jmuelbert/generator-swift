/* global $scope */
/* global describe */
'use-strict';
const path = require('path');
const util = require('./test-utility');


/*
 * Test for a Subgenerator with a argument
 */
describe('swift:class create a class', function() {
    const arg = 'TestClass';
    const filename = 'TestClass.swift';
    const dir = util.makeTempDir();



    util.goCreateApplication('swiftclass', 'Source', dir);
    util.goCreateWithArgs('class', [arg], path.join(dir, 'Source'));
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /init/);
});
