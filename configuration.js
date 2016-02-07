const findup    = require('findup-sync');
const path      = require('path');
const abstractionsStr = '.Abstractions';

function getBaseNamespace(fs) {
    'use strict';
    
    let projectJsonPath = module.exports.getProjectJsonPath();
    
    if (!projectJsonPath) {
        return 'MyClass';
    }
    
    const projectJson = require(projectJsonPath);
    if (projectJson && projectJson.tooling && projectJson.tooling.defaultNamespace) {
        return projectJson.tooling.defaultNamespace;
    }
    
    const projectPath = path.resolve(path.dirname(projectJsonPath));
    let namespace = path.basename(projectPath); 
    // If it ends in .Abstractions, we want the common namespace by default.
    if (namespace.indexOf(abstractionsStr) === namespace.length - abstractionsStr.length) {
        namespace = namespace.substr(0, namespace.length - abstractionsStr.length);
    }
    return namespace;
 }
 
 module.exports = {
  // Get the namespace relative to the cwd
  getNamespace: function(fs) {
    'use strict';

    var baseNamespace = getBaseNamespace(fs);
    var cwd = process.cwd();
    var baseDirectory = path.resolve(path.dirname(this.getProjectJsonPath()));
    var relativePath = path.relative(baseDirectory, cwd);
    if (relativePath) {
      return [baseNamespace].concat(relativePath.split(path.sep)).join('.');
    }

    return baseNamespace;
  },
  getProjectJsonPath: function() {
    'use strict';

    return findup('project.json');
  },
  getProjectJson: function(fs) {
    'use strict';

    var path = module.exports.getProjectJsonPath();
    if (!path) {
      return {};
    }

    return fs.readJSON(path, {});
  },
  getGlobalJsonPath: function() {
    'use strict';

    return findup('global.json');
  },
  getGlobalJson: function(fs) {
    'use strict';

    var path = module.exports.getGlobalJsonPath(path);
    if (!path) {
      return {};
    }

    return fs.readJSON(path, {});
  },
};
