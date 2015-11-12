

import fs from 'fs-extra';
import Promise from 'bluebird';


import randomString from '../../helpers/random';


const readFile = Promise.promisify(fs.readFile);
const writeJson = Promise.promisify(fs.writeJson);
const ensureFile = Promise.promisify(fs.ensureFile);
const assign = Promise.promisify(Object.assign);


export default class FileStorage {


  constructor (config) {

    this.path = config.path;

  }


  ready () {

    if (!this.cachedReady) {
    
      const { path } = this;

      this.cachedReady = ensureFile(path)
        .then(() => readFile(path, 'utf8'))
        .then((contents) => isEmptyString(contents) ? {} : JSON.parse(contents)); 

    }

    return this.cachedReady;

  }


  add (collection, document) {

    return this.ready()
      .then((store) => ensureStoreHasCollection(store, collection))
      .then((store) => addDocumentToCollection(store, collection, document))
      .then((store) => writeStore(this.path, store))
      .then((store) => store[collection]);

  }


  update (collection, document) {

    return this.ready()
      .then((store) => ensureStoreHasCollection(store, collection))
      .then((store) => updateDocumentInCollection(store, collection, document))
      .then((store) => writeStore(this.path, store))
      .then((store) => store[collection]);

  }


  remove (collection, document) {

    return this.ready()
      .then((store) => ensureStoreHasCollection(store, collection))
      .then((store) => removeDocumentFromCollection(store, collection, document))
      .then((store) => writeStore(this.path, store))
      .then((store) => store[collection]);

  }


  all (collection) {

    return this.ready()
      .then((store) => store[collection] || []);

  }


  drop (collection) {

    return this.ready()
      .then((store) => clearStoreOfCollection(store, collection))
      .then((store) => writeStore(this.path, store))
      .then((store) => store[collection]);

  }


}



function isEmptyString (s) {

  return s.replace(/\s+/g, '') === '';

}


function mergeDocuments (...docs) {

  return new Promise(function (resolve, reject) {

    let d = {};

    docs.forEach(doc => {

      Object.assign(d, doc)

    });

    resolve(d);

  });

}


function ensureStoreHasCollection (store, name) {

  if (!store[name]) {

    store[name] = [];

  }

  return store;

}


function getDocumentFromCollection (store, collection, document) {

  const docs = store[collection]
    .filter((_document) => _document._id === document._id);

  return docs[0];

}


function addDocumentToCollection (store, collection, document) {
  
  const id = randomString();

  document._id = id;

  store[collection]
    .push(document);

  return store;

}


function updateDocumentInCollection (store, collection, document) {

  store[collection] = store[collection]
    .filter((_document) => {

      if (_document._id === document._id) {

        return Object.assign(_document, document);

      }

      return _document;

    });

  return store;

}


function removeDocumentFromCollection (store, collection, document) {

  store[collection] = store[collection]
    .filter((_document) => _document._id !== document._id);

  return store;

}


function writeStore (path, store) {

  return writeJson(path, store)
    .then(() => store);

}


function clearStoreOfCollection (store, collection) {

  store[collection] = [];
  return store;

}