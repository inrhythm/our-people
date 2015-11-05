

import Promise from 'bluebird';
import fs from 'fs';


const writeFile = Promise.promisify(fs.writeFile);


export default function (path) {

  return (obj)=> writeFile(path, JSON.stringify(obj));

}