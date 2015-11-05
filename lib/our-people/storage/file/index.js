

import fs from 'fs-extra';
import Promise from 'bluebird';
import crypto from 'crypto-js';


const readFile = Promise.promisify(fs.readFile);
const writeJson = Promise.promisify(fs.writeJson);
// const remove = Promise.promisify(fs.remove);
const ensureFile = Promise.promisify(fs.ensureFile);
const random = () => crypto.lib.WordArray.random(128/8).toString();


function isEmptyString (s) {

  return s.replace(/\s+/g, '') === '';

}


function fileStoreReady (path) {

  return ensureFile(path)
    .then(() => readFile(path, 'utf8'))
    .then((contents) => isEmptyString(contents) ? {} : JSON.parse(contents)); 

}


function ensureStoreHasDocumentsName (store, name) {

  if (!store[name]) {

    store[name] = [];

  }

  return store;

}


/**
 * Weird helper method to make a push operation on an array
 * return the array rather than a length.
 */
function pushValueOnKeyWithStore (store, key, value) {
  
  value._id = random();
  store[key].push(value);
  return store;

}


function removeValueOnKeyWithStore (store, key, value) {

  store[key] = store[key]
    .filter((document) => value._id !== document._id);

  return store;

}


function writeStore (path, store) {

  return writeJson(path, store)
    .then(() => store);

}


function clearStoreName (store, name) {

  store[name] = [];
  return store;

}


export default function asyncMemoryStore (config) {

  
  const path = config.path;
  const ready = fileStoreReady(path);


  return function documents(name) {


    return {

      
      add (document) {

        return ready
          .then((store) => ensureStoreHasDocumentsName(store, name))
          .then((store) => pushValueOnKeyWithStore(store, name, document))
          .then((store) => writeStore(path, store))
          .then((store) => store[name]);

      },


      remove (document) {

        return ready
          .then((store) => removeValueOnKeyWithStore(store, name, document))
          .then((store) => writeStore(path, store))
          .then((store) => store[name]);

      },

      
      all () {

        return ready
          .then((store) => store[name] || []);

      },


      drop () {

        return ready
          .then((store) => clearStoreName(store, name))
          .then((store) => writeStore(path, store))
          .then((store) => store[name]);

      }


    };

  };


}