

import createFileStorage from 'our-people/storage/file-storage';
import randomString from 'our-people/helpers/random';
import fs from 'fs-extra';


export function removeAllRandomFileStorages (directory) {

  return fs.removeSync(directory + '/*.json');

}


export default function createRandomFileStorage (directory) {

  return createFileStorage({

    path: directory + '/' + randomString() + '-db.json'

  });

}