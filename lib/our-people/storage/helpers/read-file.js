

import Promise from 'bluebird';
import fs from 'fs';


const readFile = Promise.promisify(fs.readFile);


export default function (path) {

  return () => readFile(path, 'utf8');

}