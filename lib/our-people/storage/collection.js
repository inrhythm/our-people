

/**
 * The Collection class allows a persistance
 * agnostic solution to storing a small 
 * amount of data.
 */
export default class Collection {


  /**
   * @param {StorageInterface}   store       - The store must conform to a certain interface.
   * @param {string} collection.
   *
   * @return this is returned.
   */

  constructor (store, collection) {

    this.store = store;
    this.collection = collection;

  }


  /**
   *
   */
  ready () {

    return this.store
      .ready();

  }


  /**
   * Adds an engineer to the collection.
   * 
   * @param  {Object}          document to add.
   * @return {Promise<Array>}  list of documents in collection
   */
  add (document) {

    return this.store
      .add(this.collection, document);

  }


  /**
   * Updates a specified document in the collection.
   * 
   * @param  {Object}          document to update
   *                           requires `_id` property
   * @return {Promise<Array>}  list of documents in collection
   */
  update (document) {

    return this.store
      .update(this.collection, document);

  }


  /**
   * Removes a specified document from the collection.
   * @param  {Object}          document to remove
   *                           requires `_id` property
   * @return {Promise<Array>}  list of documents remaining in collection
   */
  remove (document) {

    return this.store
      .remove(this.collection, document);

  }

  
  /**
   * Returns all documents in the collection.
   * 
   * @return {Promise<Void>}
   */
  all () {

    return this.store
      .all(this.collection);

  }


  /**
   * Removes the collection.
   * 
   * @return {Promise<Void>}
   */
  drop () {

    return this.store
      .drop(this.collection);

  }


}