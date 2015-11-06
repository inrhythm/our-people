

import fs from 'fs-extra';
import Promise from 'bluebird';


import randomString from '../../helpers/random';


const readFile = Promise.promisify(fs.readFile);
const writeJson = Promise.promisify(fs.writeJson);
const ensureFile = Promise.promisify(fs.ensureFile);


class Store {


  constructor (config) {

    this.path = config.path;

  }


  ready () {

    const { path } = this;

    return ensureFile(path)
      .then(() => readFile(path, 'utf8'))
      .then((contents) => isEmptyString(contents) ? {} : JSON.parse(contents)); 

  }

}



class Collection {


  constructor (collection, path, store) {


    this.collection = collection;
    this.path = path;
    
    this.ready = store.ready();
    

  }

      
  add (document) {

    return this.ready
      .then((store) => ensureStoreHasCollection(store, this.collection))
      .then((store) => addDocumentToCollection(store, this.collection, document))
      .then((store) => writeStore(this.path, store))
      .then((store) => store[this.collection]);

  }


  remove (document) {

    return this.ready
      .then((store) => removeDocumentFromCollection(store, this.collection, document))
      .then((store) => writeStore(this.path, store))
      .then((store) => store[this.collection]);

  }

  
  all () {

    return this.ready
      .then((store) => store[this.collection] || []);

  }


  drop () {

    return this.ready
      .then((store) => clearStoreOfCollection(store, this.collection))
      .then((store) => writeStore(this.path, store))
      .then((store) => store[this.collection]);

  }


}



function isEmptyString (s) {

  return s.replace(/\s+/g, '') === '';

}


function ensureStoreHasCollection (store, name) {

  if (!store[name]) {

    store[name] = [];

  }

  return store;

}


function addDocumentToCollection (store, collection, document) {
  
  const id = randomString();
  document._id = id;

  store[collection]
    .push(document);

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


export default function createFileStore (config) {

  
  const path = config.path;
  const store = new Store(config);


  return function fileStore(collection) {

    return new Collection(collection, path, store);

  };


}