# generator-swift [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> A generator for opensource swift

## Getting Started
 - Dependencies
    - Node.js: 
      - `brew install node` for macOS 
      - `choco install nodejs`for Windows OS
    - Yeoman: `npm install -g yo`
 - Install: `npm install -g generator-swift`
 
## Usage
 - yo swift shows a wizard for generating a new swift app or library
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

Apache-2.0 © [Jürgen Mülbert](https:/github.com/jmuelbert/generator-swift)

[Return to top](#top)

[npm-image]: https://badge.fury.io/js/generator-swift.svg
[npm-url]: https://npmjs.org/package/generator-swift
[travis-image]: https://travis-ci.org/jmuelbert/generator-swift.svg?branch=master
[travis-url]: https://travis-ci.org/jmuelbert/generator-swift
[daviddm-image]: https://david-dm.org/jmuelbert/generator-swift.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/jmuelbert/generator-swift
[coveralls-image]: https://coveralls.io/repos/jmuelbert/generator-swift/badge.svg
[coveralls-url]: https://coveralls.io/r/jmuelbert/generator-swift
