/* eslint-disable import/no-commonjs */
const fs = require('fs-extra');
const path = require('path');

/**
 * @param {string} name
 */
function copyProject(name) {
  console.log(`copying ${name}`);

  const OUTPUT = path.join(__dirname, `./docs/public/${name}`);
  const DIR = path.join(path.dirname(require.resolve(`@wakeadmin/${name}/package.json`)), 'dist');

  if (fs.pathExistsSync(OUTPUT)) {
    fs.emptyDirSync(OUTPUT);
  } else {
    fs.mkdirSync(OUTPUT);
  }

  fs.copySync(DIR, OUTPUT);
}

['k8s-deploy'].forEach(name => {
  copyProject(name);
});
