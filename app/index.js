/**
 * @module swift-generator
 */
'use strict';
var yeoman      = require('yeoman-generator');
var path        = require('path');
var mkdirp      = require('mkdirp');
var _           = require('lodash');
var extend      = require('deep-extend');
var askName     = require('inquirer-npm-name');
var chalk       = require('chalk');
var yosay       = require('yosay');
var fs          = require('fs');
var projectName = require('vs_projectname');


function makeName(name) {
    name = _.camelCase(name);
    return name;
}

var SwiftGenerator = yeoman.generators.Base.extend({
    
    // The name 'constructor' is important here
    constructor: function() {
        // Calling the super constructor is important sa our generator is correctly set up
        yeoman.generators.Base.apply(this, arguments);
    },
    
    init: function() {
        // Have swiftGenerator greet the user.
        this.log(yosay(
            'Welcome to the super-excellent ' + chalk.red('swift') + ' generator!'
        ));
        this.props = {};
        this.templatedata = {};
    },
    askFor: function () {
        var done =this.async();
        
        var prompts = [{
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
   
    askForName: function() {
        var done = this.async();
        var app = '';
        
        switch(this.type) {
            case 'empty':
                app = 'EmptyApplication';
                break;
            case 'console':
                app = 'ConsoleApplication';
                break;
            case 'library':
                app = 'Library';
                break;
        }
           
           
        var prompts = [{
            name: 'applicationName',
            message: 'What\'s the name of your swift application/library?',
            default: 'app'
        }];
        
        this.prompt(prompts, function (props) {
            this.templatedata.swiftProject = projectName(props.applicationName);  
            this.templatedata.applicationname = props.applicationName;
            this.applicationName = props.applicationName;
                  
            done();
        }.bind(this));
    },
          
    writing:  function() {
        this.sourceRoot(path.join(__dirname, './templates/projects'));
        
        switch(this.type) {
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
                this.fs.copyTpl(this.sourceRoot() + '/project.json', this.applicationName + '/project.json', this.templatedata);
                this.fs.copyTpl(this.sourceRoot() + '/main.swift', this.applicationName + '/Sources/main.swift', this.templatedata);
                this.fs.copyTpl(this.templatePath('README.md'), this.applicationName + '/README.md');      
                break;
                
            case 'library':
                console.log(this.templatePath());   
                this.sourceRoot(path.join(__dirname, '../templates/projects/' + this.type));
                this.fs.copy(this.sourceRoot() + '/../../gitignore', this.applicationName + '/.gitignore');
                this.fs.copyTpl(this.sourceRoot() + '/Package.swift', this.applicationName + '/Package.swift', this.templatedata);
                this.fs.copyTpl(this.sourceRoot() + '/project.json', this.applicationName + '/project.json', this.templatedata);
                this.fs.copyTpl(this.sourceRoot() + '/library.swift', this.applicationName + '/Sources/' + 
                    this.applicationName + '.swift', this.templatedata);
                this.fs.copyTpl(this.templatePath('README.md'), this.applicationName + '/README.md');      
                break;
              
            default:
                this.log('Unknown project type');          
        }    
     },

    end: function () {
        this.log('\r\n');
        this.log('Your Project is now created, you can now begin :-)');
        this.log('\r\n');
    }
});

module.exports = SwiftGenerator;