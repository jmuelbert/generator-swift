// @ts-check
'use strict';

/**
 * @module submodule class-generator
 */
const util = require('util');
const ScriptBase = require('../script-base.js');


let NamedGenerator = module.exports = function NamedGenerator() {
    ScriptBase.apply(this, arguments);
};

util.inherits(NamedGenerator, ScriptBase);

NamedGenerator.prototype.createNamedItem = function() {
    const extension = '.swift';
    this.generateTemplateFile(
        'class.swift',
        extension, {
            namespace: this.namespace(),
            classname: this.classNameWithoutExtension(extension)
        });
};