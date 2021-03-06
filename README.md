# generator-swift

A generator for opensource swift

---

[![Gitpod-Ready-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/jmuelbert/generator-swift)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/caf2526829cb447b9ca6091cccebad27)](https://app.codacy.com/manual/jmuelbert/generator-swift?utm_source=github.com&utm_medium=referral&utm_content=jmuelbert/generator-swift&utm_campaign=Badge_Grade_Dashboard)
[![NPM version][npm-image]][npm-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Coverage percentage][coveralls-image]][coveralls-url]
[![GitHub All Releases](https://img.shields.io/github/downloads/jmuelbert/generator-swift/total?label=downloads%40all)](https://github.com/jmuelbert/generator-swift/releases)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit&logoColor=white)](https://github.com/pre-commit/pre-commit)
[![Help wanted issues](https://img.shields.io/github/issues/jmuelbert/generator-swift/help%20wanted)](https://github.com/jmuelbert/generator-swift/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)


[Features](https://github.com/jmuelbert/generator-swift) | [Documentation](https://jmuelbert.github.io/generator-swift/) | [Changelog](CHANGELOG.md) | [Contributing](CONTRIBUTING.md) | [FAQ](https://github.com/jmuelbert/generator-swift/wiki/FAQ) | [deutsch](README_de-DE.md)

## Getting Started

- Dependencies
  - Install Node.js on macOS

    ```bash
      install node
    ```

  - Install Node.js on Windows OS

    ```cmd
       choco install nodejs
    ```

  - Yeoman: ``` npm install -g yo ```
  - Install: ``` npm install -g generator-swift ```

## Usage

- `yo swift` shows a wizard for generating a new swift app or library
- For using [swiftlint](https://github.com/realm/SwiftLint) must install this with: `brew install swiftlint`

## Template projects

Full, template based projects available in generator:

- Empty Application
- Console Application
- Class Library

### Additional for the Console Application and the Class Library

 Now its provided a gulpfile for do an lintcheck for the swiftfile's
 This is only available on macOS. Init with `npm install`

    - Call with `gulp`do a linkcheck and build
    - Call with `gulp lint`only the lintcheck.

 ## Subcommand available:

    - `swift:class` - Create a new class template in the Sources Directory
        - `swift:class` `name` The new class name
        - `swift:class` `path/name` write the template in the subdirectory

## License

Apache-2.0 © [Jürgen Mülbert](https:/github.com/jmuelbert/generator-swift)

[Return to top](#top)

[npm-Bild]: https://badge.fury.io/js/generator-swift.svg
[npm-url]: https://npmjs.org/package/generator-swift
[daviddm-image]: https://david-dm.org/jmuelbert/generator-swift.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/jmuelbert/generator-swift
[coveralls-image]: https://coveralls.io/repos/jmuelbert/generator-swift/badge.svg
[coveralls-url]: https://coveralls.io/r/jmuelbert/generator-swift
