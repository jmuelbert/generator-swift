'use strict';

const util = require('util');
const path = require('path');
const yeoman = require('yeoman-generator');
const chalk = require('chalk');

let NamedGenerator = module.exports = function NamedGenerator() {
  yeoman.NamedBase.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, './templates'));

  this.namespace = function () {
    return require('./configuration').getNamespace(this.fs);
  }.bind(this);
};

util.inherits(NamedGenerator, yeoman.generators.NamedBase);

NamedGenerator.prototype.generateTemplateFile = function (templateFile, extension, templateData) {
  // the target file is created from *name* property
  let targetFile = this.createTargetFile(extension);
  this.log('You called the swift subgenerator with the arg ' + chalk.green(this.arguments[0] || targetFile));
  let swiftTargetFile = path.join('Sources', targetFile);
  if (templateData !== null) {
    this.fs.copyTpl(this.templatePath(templateFile), this.destinationPath(swiftTargetFile), templateData);
  }
  if (templateData === null) {
    this.fs.copyTpl(this.templatePath(templateFile), this.destinationPath(swiftTargetFile));
  }
  this.log(chalk.green(swiftTargetFile) + ' created.');
};

/**
 * User can type supported extension together with filename
 * when generator is called.
 * Normalize a filename based on existing *name* property and
 * expected extension.
 * Extension should start with a dot character
 * @param {string} extension
 * @return {string} a filename based on name property and extension
 */
NamedGenerator.prototype.createTargetFile = function (extension) {
  let targetFile = null;
  extension = this._normalizeExtension(extension);
  if (path.extname(this.name) === extension) {
    targetFile = this.name;
  } else {
    targetFile = this.name + extension;
  }
  return targetFile;
};

/**
 * Create class name based on name property
 * If user passed extension as part of filename
 * removes that part from return class of name
 * @param {string} exetension
 * @return {string} class name based on name property
 */
NamedGenerator.prototype.classNameWithoutExtension = function (extension) {
  extension = this._normalizeExtension(extension);
  if (path.extname(this.name) === extension) {
    return path.basename(this.name, extension);
  }
  return path.basename(this.name);
};

/**
 * A little helper to normalize extension to '.XXXX'
 * @param {string} extension
 * @return {string} normalized extension
 */
NamedGenerator.prototype._normalizeExtension = function (extension) {
  if (extension && extension.charAt(0) !== '.') {
    extension = '.' + extension;
  }
  return extension;
};
