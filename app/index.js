/* global __dirname */
// @ts-check
/**
 * @module swift-generator
 */
'use strict';

const yeoman = require('yeoman-generator');
const path = require('path');
const chalk = require('chalk');
const yosay = require('yosay');
const updateNotifier = require('update-notifier');
const stringLength = require('string-length');
const projectName = require('vs_projectname');
const packageJSON = require('../package.json');

/**
 * Update check
 */
const checkForUpdates = () => {
    const notifier = updateNotifier({
        pkg: packageJSON
            // ,updateCheckInterval: 1
            // useful for debugging 
    });

    let message = [];
    let retVal;

    if (notifier.update) {
        message.push("Update available: " + chalk.green.bold(notifier.update.latest) + chalk.gray(" (current: " + notifier.update.current + ")"));
        message.push("Run " + chalk.magenta("npm install -g " + packageJSON.name) + " to update.");
        retVal = yosay(message.join(" "), { maxLength: stringLength(message[0]) });
    }
    return retVal;
};

/**
 * The SwiftGenerator
 */
let SwiftGenerator = yeoman.Base.extend({
    /**
     * The constructor for the yeoman generator
     *
     * The name 'constructor' is important here
     */
    constructor: function() {
        // Calling the super constructor is important sa our generator is correctly set up
        yeoman.Base.apply(this, arguments);
    },

    /**
     * Init the generator
     */
    init: function() {
        // Have swiftGenerator greet the user.
        const welcomeMessage = yosay('Welcome to the super-excellent ' + chalk.red('swift') + ' generator!');
        const updateMessage = checkForUpdates();

        // Have Yeoman greet the user
        if (updateMessage) {
            this.log(updateMessage);
        } else {
            this.log(welcomeMessage);
        }

        this.props = {};
        this.templatedata = {};
    },

    /**
     * Ask the User what
     */
    askFor: function() {
        const done = this.async();

        const prompts = [{
            type: 'list',
            name: 'type',
            message: 'What type of project do you want create?',
            choices: [{
                name: 'Empty',
                value: 'empty'
            }, {
                name: 'Console Application',
                value: 'console'
            }, {
                name: 'Library',
                value: 'library'
            }]
        }];
        this.prompt(prompts, function(props) {
            this.type = props.type;

            done();
        }.bind(this));
    },

    /**
     * Ask the user for name
     */
    askForName: function() {
        const done = this.async();
        let app = '';

        switch (this.type) {
            case 'empty':
                app = 'EmptyApplication';
                break;

            case 'console':
                app = 'ConsoleApplication';
                break;

            case 'library':
                app = 'Library';
                break;

            default:
                this.log('Unknown project type');
        }

        const prompts = [{
            name: 'applicationName',
            message: 'What\'s the name of your swift application/library?',
            default: app
        }];

        this.prompt(prompts, function(props) {
            this.templatedata.swiftProject = projectName(props.applicationName);
            this.templatedata.applicationname = props.applicationName;
            this.applicationName = props.applicationName;

            done();
        }.bind(this));
    },

    /**
     * Write the template to the dir
     */
    writing: function() {
        this.sourceRoot(path.join(__dirname, './templates/projects'));

        switch (this.type) {
            case 'empty':
                this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
                this.copy(this.sourceRoot() + '/../../gitignore', this.applicationName + '/.gitignore');
                this.template(this.sourceRoot() + '/Package.swift', this.applicationName + '/Package.swift', this.templatedata);
                this.template(this.sourceRoot() + '/project.json', this.applicationName + '/project.json', this.templatedata);
                this.template(this.sourceRoot() + '/main.swift', this.applicationName + '/Sources/main.swift', this.templatedata);
                break;

            case 'console':
                this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
                this.fs.copy(this.sourceRoot() + '/../../gitignore', this.applicationName + '/.gitignore');
                this.fs.copyTpl(this.sourceRoot() + '/Package.swift', this.applicationName + '/Package.swift', this.templatedata);
                this.fs.copyTpl(this.sourceRoot() + '/main.swift', this.applicationName + '/Sources/main.swift', this.templatedata);
                this.fs.copyTpl(this.sourceRoot() + '/project.json', this.applicationName + '/project.json', this.templatedata);
                this.fs.copyTpl(this.sourceRoot() + '/package.json', this.applicationName + '/package.json', this.templatedate);
                this.fs.copy(this.sourceRoot() + '/gulpfile.js', this.applicationName + '/gulpfile.js');
                this.fs.copyTpl(this.templatePath('README.md'), this.applicationName + '/README.md');
                break;

            case 'library':
                this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
                this.fs.copy(this.sourceRoot() + '/../../gitignore', this.applicationName + '/.gitignore');
                this.fs.copyTpl(this.sourceRoot() + '/Package.swift', this.applicationName + '/Package.swift', this.templatedata);
                this.fs.copyTpl(this.sourceRoot() + '/library.swift', this.applicationName + '/Sources/' +
                    this.applicationName + '.swift', this.templatedata);
                this.fs.copyTpl(this.sourceRoot() + '/project.json', this.applicationName + '/project.json', this.templatedata);
                this.fs.copyTpl(this.sourceRoot() + '/package.json', this.applicationName + '/package.json', this.templatedate);
                this.fs.copy(this.sourceRoot() + '/gulpfile.js', this.applicationName + '/gulpfile.js');
                this.fs.copyTpl(this.templatePath('README.md'), this.applicationName + '/README.md');
                break;

            default:
                this.log('Unknown project type');
        }
    },

    end: function() {
        this.log('\r\n');
        this.log('Your Project is now created, you can now begin :-)');
        this.log('\r\n');
    }
});

module.exports = SwiftGenerator;