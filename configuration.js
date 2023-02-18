/* global process */
const findup = require('findup-sync');
const path = require('path');
const abstractionsStr = '.Abstractions';

/**
 * GetNamespace
 *
 * @return {string} - namespace
 *  * default 'MyClass'
 *  * the defined string in project.json in tooling.defaultNamespace
 *  * a part of filesystem.directory without '.Abstractions'.
 */
function getBaseNamespace() {
  'use strict';

  const projectJsonPath = module.exports.getProjectJsonPath();

  if (!projectJsonPath) {
    return 'MyClass';
  }

  const projectJson = require(projectJsonPath);
  if (projectJson && projectJson.tooling &&
      projectJson.tooling.defaultNamespace) {
    return projectJson.tooling.defaultNamespace;
  }

  const projectPath = path.resolve(path.dirname(projectJsonPath));
  let namespace = path.basename(projectPath);
  // If it ends in .Abstractions, we want the common namespace by default.
  if (namespace.indexOf(abstractionsStr) ===
      namespace.length - abstractionsStr.length) {
    namespace = namespace.substr(0, namespace.length - abstractionsStr.length);
  }
  return namespace;
}

module.exports = {
  /**
   * Get the namespace relative to the cwd
   *
   * @param {string} fs
   * @return [string} - The Namespace
   */
  getNamespace(fs) {
    'use strict';

    const baseNamespace = getBaseNamespace(fs);
    const cwd = process.cwd();
    const baseDirectory =
        path.resolve(path.dirname(this.getProjectJsonPath() || ''));
    const relativePath = path.relative(baseDirectory, cwd);

    if (relativePath) {
      return [ baseNamespace ].concat(relativePath.split(path.sep)).join('.');
    }

    return baseNamespace;
  },

  /**
   * Get the Path to the Project.json file
   *
   * @return {string} - The Path
   */
  getProjectJsonPath() {
    'use strict';

    return findup('project.json');
  },

  /**
   * Get the Contents of to project.json
   *
   * @param {string} - fs
   * @return {string} - the content of project.json or an emtpy string.
   */
  getProjectJson(fs) {
    'use strict';

    const path = module.exports.getProjectJsonPath();
    if (!path) {
      return {};
    }

    return fs.readJSON(path, {});
  },

  /**
   * Get the Path to the global.json file
   *
   * @return {string} - the path
   */
  getGlobalJsonPath() {
    'use strict';

    return findup('global.json');
  },

  /**
   * Get the Contents of to global.json
   *
   * @param {string} - fs
   * @return {string} - the content of global.json or an emtpy string.
   */
  getGlobalJson(fs) {
    'use strict';

    const path = module.exports.getGlobalJsonPath();
    if (!path) {
      return {};
    }

    return fs.readJSON(path, {});
  }
};
