

import dir from 'node-dir';
import Promise from 'bluebird';


const files = Promise.promisify(dir.files);


export default files(__dirname)

  .then((files) =>

    files.filter((file) =>
      file.indexOf('index.js') === -1))

  .then((files) =>

    files.map((file =>
      require(file))));