

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


  /**
   * Adds a document to a collection.
   * 
   * @param  {String}         collection  collection name
   * @param  {Object}         document    document to insert
   * @return {Promise<Array>}             array of documents in the collection
   */
  add (collection, document) {

    return this.ready()
      .then((store) => ensureStoreHasCollection(store, collection))
      .then((store) => addDocumentToCollection(store, collection, document))
      .then((store) => writeStore(this.path, store))
      .then((store) => store[collection]);

  }


  /**
   * Updates a document in a collection.
   * 
   * @param  {String}         collection  name of the collection
   * @param  {Object}         document    document to update
   * @return {Promise<Array>}             array of documents in the collection
   */
  update (collection, document) {

    return this.ready()
      .then((store) => ensureStoreHasCollection(store, collection))
      .then((store) => updateDocumentInCollection(store, collection, document))
      .then((store) => writeStore(this.path, store))
      .then((store) => store[collection]);

  }


  /**
   * Filters (searches) documents in a given collection for a given query.
   * 
   * @param  {String}  collection name of collection
   * @param  {Object}  query      query to filter documetns by
   *                               - key: property
   *                               - value: search string
   * @return {Promise<Array>}      array of documents in the collection
   */
  filter (collection, query) {

    return this.ready()
      .then((store) => filterDocumentsInCollection(store, collection, query));

  }


  /**
   * Removes a document from a collection.
   * 
   * @param  {String}         collection  name of the collection
   * @param  {Object}         document    document to remove
   *                                      property `_id` is required
   * @return {Promise<Array>}             all documents remaining in collection
   */
  remove (collection, document) {

    return this.ready()
      .then((store) => ensureStoreHasCollection(store, collection))
      .then((store) => removeDocumentFromCollection(store, collection, document))
      .then((store) => writeStore(this.path, store))
      .then((store) => store[collection]);

  }


  /**
   * Retrieves a list of all documents in a collection.
   * 
   * @param  {String} collection  name of the collection
   * @return {Promise<Array>}     array of documents in collection
   */
  all (collection) {

    return this.ready()
      .then((store) => store[collection] || []);

  }


  /**
   * Removes the collection.
   * 
   * @param  {String} collection  name of the collection to remove
   * @return {Promise<Array>}     array of documents in collection
   */
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


/**
 * Creates collection of given name if one does not already exist.
 * 
 * @param  {Object} store  storage
 * @param  {String} name   name of collection to ensure exists
 * @return {Object}        storage
 */
function ensureStoreHasCollection (store, name) {

  if (!store[name]) {

    store[name] = [];

  }

  return store;

}


/**
 * Adds a document to a collection.
 * 
 * @param  {Object} store     storage
 * @param  {String} name      name of collection to ensure exists
 * @param  {Object} document  document to insert
 * @return {Object}           storage
 */
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


/**
 * Removes a document from a collection.
 * 
 * @param  {Object} store    storage
 * @param  {String} name     name of collection to ensure exists
 * @param  {Object} document document to remove
 *                           requires `_id` property
 * @return {Object}          storage
 */
function removeDocumentFromCollection (store, collection, document) {

  store[collection] = store[collection]
    .filter((_document) => _document._id !== document._id);

  return store;

}


/**
 * Searches for documents in a collection by a given query.
 * 
 * @param  {Storage} store
 * @param  {String}  collection name of collection
 * @param  {Object}  query      query to filter documetns by
 *                              will search value of every property
 * @return {[type]}             [description]
 */
function filterDocumentsInCollection (store, collection, query) {

  return store[collection]
    .filter((_document) => {

      for(let key of Object.keys(_document)) {

        if(_document[key].toString().indexOf(query) !== -1) {

          return true;

        }

      }

      return false;

    });

}


/**
 * Writes storage to file.
 * 
 * @param  {String}          path   file location of storage
 * @param  {Object}          store  storage object
 * @return {Promise<Object>}        storage object
 */
function writeStore (path, store) {

  return writeJson(path, store)
    .then(() => store);

}


/**
 * Removes all documents from collection.
 * 
 * @param  {Object} store       storage object
 * @param  {String} collection  name of collection
 * @return {Object}             storage object
 */
function clearStoreOfCollection (store, collection) {

  store[collection] = [];
  return store;

}