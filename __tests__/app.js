"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const generatorGeneratorPkg = require("../package.json");

jest.mock("superb", () => () => "cat's meow");
jest.mock("npm-name", () => () => Promise.resolve(true));

describe("generator:app", () => {
  describe("defaults", () => {
    beforeEach(() => {
      return helpers.run(path.join(__dirname, "../generators/app"))
          .withPrompts({
            name : "generator-swift",
            description : "Yeoman generator for opensource swift projects",
            homepage : "https://github.com/jmuelbert/generator-swift#readme",
            githubAccount : "jmuelbert",
            authorName : "Jürgen Mülbert",
            authorEmail : "juergen.muelbert@gmail.com",
            authorUrl : "https://github.com/jmuelbert",
            keywords : [],
            license : "Apache-2.0"
          });
    });

    it("created and CD into a folder named like the generator", () => {
      assert.equal(path.basename(process.cwd()), "generator-swift");
    });

    it("creates files", () => {
      const expected = [
        ".eslintignore", "README.md", "package.json", "generators/app/index.js",
        "generators/app/templates/console/main.swift", "__tests__/app.js"
      ];

      assert.file(expected);
    });

    it("fills package.json with correct information", () => {
      // eslint-disable-next-line new-cap
      assert.JSONFileContent("package.json", {
        name : "generator-swift",
        dependencies : {
          "yeoman-generator" :
              generatorGeneratorPkg.dependencies["yeoman-generator"],
          chalk : generatorGeneratorPkg.dependencies.chalk,
          yosay : generatorGeneratorPkg.dependencies.yosay
        },
        devDependencies : {
          "yeoman-test" : generatorGeneratorPkg.devDependencies["yeoman-test"],
          "yeoman-assert" :
              generatorGeneratorPkg.devDependencies["yeoman-assert"]
        },
        keywords : [ "yeoman-swift" ]
      });
    });

    it("fills the README with project data", () => {
      assert.fileContent("README.md", "# generator-swift");
      assert.fileContent("README.md", "npm install -g yo");
      assert.fileContent("README.md", "npm install -g generator-swift");
      assert.fileContent("README.md", "yo swift");
      // assert.fileContent("README.md", "yeoman/generator-temp");
    });

    it("fills the .eslintignore with correct content",
       () => { assert.fileContent(".eslintignore", "**/templates\n"); });
  });
});
