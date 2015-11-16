

import createStorage from './';
import FileStorage from './file';


/**
 * Creates file storage instance with given options.
 * 
 * @param  {Object} config  options
 * @return {Storage}        file storage instance
 */
export default function createFileStorage (config) {

  return createStorage({

    store: FileStorage,

    options: {

        path: config.path

      }

  });

}