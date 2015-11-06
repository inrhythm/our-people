

import createStorage from './';
import FileStorage from './file';


export default function createFileStorage (config) {


  return createStorage({

    store: FileStorage,

    options: {

        path: config.path

      }

  });


}