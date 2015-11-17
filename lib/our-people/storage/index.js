

import Collection from './collection';


/**
 * Initializes and returns an instance of storage.
 * 
 * @param  {Objects} config  options
 * @return {Storage}
 */
export default function createStorage (config) {

  const Store = config.store;
  const options = config.options;

  const store = new Store(options);


  /**
   * Creates and returns an instance of a collection.
   * 
   * @param  {String} 			name of collection
   * @return {Array<Object>}    array of docs in collection
   */
  return function fileStore(collection) {

    return new Collection(store, collection);

  };


}