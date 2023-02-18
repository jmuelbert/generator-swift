/*
 * SPDX-FileCopyrightText: 2018-2022 Jürgen Mülbert <juergen.muelbert@gmail.com>
 * SPDX-License-Identifier:    Apache-2.0
 */
/**
 * @module swift-generator
 */
"use strict";

const Generator = require("yeoman-generator");
const Handlebars = require("handlebars");

const defaultNodeVersion = "^8.11.0";

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.framework = opts.framework;
    this.nodeVersion = opts.nodeVersion || defaultNodeVersion;

    if (typeof opts.builderSettings === "string") {
      this.builderSettings = JSON.parse(opts.builderSettings || "{}");
    } else {
      this.builderSettings = opts.builderSettings;
    }

    if (opts.cloudContext) {
      this.opts = opts.cloudContext;
      this.opts.libertyVersion = opts.libertyVersion;
    } else {
      this.opts = opts;
    }

    this.humanNameLanguage = {
      NODE : "Node.js",
      SWIFT : "Swift",
      JAVA : "Java",
      PYTHON : "Python",
      DJANGO : "Django",
      GO : "Go"
    };
  }

  paths() {
    this.sourceRoot();
    this.templatePath("index.js");
  }

  prompting() {
    const prompts = [];
    if (this.builderSettings === undefined) {
      prompts.push(
          {type : "input", name : "name", message : "Your project name"});
    }

    return this.prompt(prompts).then(this._processAnswers.bind(this));
  }

  _processAnswers(answers) {
    this.builderSettings.backendPlatform =
        answers.language || this.builderSettings.backendPlatform;
    this.framework = answers.framework || this.framework;
    this.builderSettings.name = answers.name || this.builderSettings.name;
    this.nodeVersion = answers.nodeVersion || this.nodeVersion;
  }

  write() {
    switch (this.framework) {
    case "None":
      this._generateClass();
      break;
    case "Class":
      this._generateClass();
      break;
    case "Console":
      this._generateConsoleApp();
      break;
    case "Library":
      this._generateLibrary();
      break;
    default:
      this._generateClass();
      break;
    }
  }

  /**
   * This will generate a simple class for swift.
   */
  _generateClass() {
    this._writeHandlebarsFile("basic/README.md", "public/README.md", {
      applicationName : this.builderSettings.name,
      language : this.humanNameLanguage[this.builderSettings.backendPlatform]
    });
    this._writeHandlebarsFile("basic/class.swift", "public/class.swift", {
      applicationName : this.builderSettings.name,
      language : this.humanNameLanguage[this.builderSettings.backendPlatform]
    });
  }

  /**
   * This will generate the code for a console app.
   */
  _generateConsoleApp() {
    this._writeHandlebarsFile("basic/README.md", "public/README.md", {
      applicationName : this.builderSettings.name,
      language : this.humanNameLanguage[this.builderSettings.backendPlatform]
    });
    this._writeHandlebarsFile("basic/class.swift", "public/class.swift", {
      applicationName : this.builderSettings.name,
      language : this.humanNameLanguage[this.builderSettings.backendPlatform]
    });
  }

  /**
   * This will generate the code for a library
   */
  _generateLibrary() {}

  _writeHandlebarsFile(templateFile, destinationFile, data) {
    const template = this.fs.read(this.templatePath(templateFile));
    const compiledTemplate = Handlebars.compile(template);
    const output = compiledTemplate(data);
    this.fs.write(this.destinationPath(destinationFile), output);
  }
};
