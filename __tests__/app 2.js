'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

jest.mock('superb', () => () => "cat's meow");
jest.mock('npm-name', () => () => Promise.resolve(true));

const builderSettings = {
  name : 'MyTest',
  className : 'MyClass',
};

const requiredFilesForBasic = [ 'public/class.swift', 'public/README.md' ];

describe('generator:swift', () => {
  // Basic tests

  describe('Basic swift with one class file', () => {
    beforeEach(() => {
      bluemixSettings.name = 'MyClass';

      return helpers.run(path.join(__dirname, '../generators/app'))
          .inTmpDir()
          .withOptions(
              {bluemix : JSON.stringify(bluemixSettings), framework : 'None'});
    });

    it('basic files', () => { assert.file(requiredFilesForBasic); });

    it('starter swift app', () => {
      assert.fileContent('public/class.swift', 'public class MyClass {');
    });
  });
  /*
  Describe('defaults', () => {
    beforeEach(() => {
      return helpers.run(path.join(__dirname,
  '../generators/app')).withPrompts({ name: 'generator-swift', description: 'A
  swift generator', homepage: 'http://github.com/jmuelbert/generator-swift',
        githubAccount: 'jmuelbert',
        authorName: 'Jürgen Mülbert',
        authorEmail: 'juergen.muelbert@gmail.com',
        authorUrl: 'http://github.com/jmuelbert/generator-swift',
        keywords: [],
        license: 'Apache 2.0'
      });
    });

    it('created and CD into a folder named like the generator', () => {
      assert.equal(path.basename(process.cwd()), 'generator-temp');
    });

    it('creates files', () => {
      const expected = [
        'README.md',
        'package.json',
        'generators/app/index.js',
        'generators/app/templates/dummyfile.txt',
        '__tests__/app.js'
      ];

      assert.file(expected);
    });

    it('fills package.json with correct information', () => {
      // eslint-disable-next-line new-cap
      assert.JSONFileContent('package.json', {
        name: 'generator-temp',
        dependencies: {
          'yeoman-generator':
  generatorGeneratorPkg.dependencies['yeoman-generator'], chalk:
  generatorGeneratorPkg.dependencies.chalk, yosay:
  generatorGeneratorPkg.dependencies.yosay
        },
        devDependencies: {
          'yeoman-test': generatorGeneratorPkg.devDependencies['yeoman-test'],
          'yeoman-assert':
  generatorGeneratorPkg.devDependencies['yeoman-assert']
        },
        keywords: ['yeoman-generator']
      });
    });

    it('fills the README with project data', () => {
      assert.fileContent('README.md', '# generator-temp');
      assert.fileContent('README.md', 'npm install -g yo');
      assert.fileContent('README.md', 'npm install -g generator-temp');
      assert.fileContent('README.md', 'yo temp');
      assert.fileContent('README.md', 'yeoman/generator-temp');
    });
    */
  // it('fills the .eslintignore with correct content', () => {
  //  assert.fileContent('.eslintignore', '**/templates\n');
  // });
  // });
});
