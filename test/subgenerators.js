/* global $scope */
/* global describe */
'use-strict';
const util = require('./test-utility');
const path = require('path');

/*
 * Test for a Subgenerator with a argument 
 */
describe('swift:class create a class', function () {
    const arg = 'TestClass';
    const filename = 'Sources/TestClass.swift';
    util.goCreateWithArgs('class', [arg]);
    util.fileCheck('should create ' + filename + ' file', filename);
    util.fileContentCheck(filename, 'Check file content', /init/);    
});