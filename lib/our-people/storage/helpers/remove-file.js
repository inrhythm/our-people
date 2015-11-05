

import fs from 'fs-extra';
import Promise from 'bluebird';


const remove = Promise.promisify(fs.remove);


export default function (path) {

  return () => remove(path);

}