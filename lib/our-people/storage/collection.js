
class MyClass {

}

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

      
  add (document) {

    return this.store
      .add(this.collection, document);

  }


  remove (document) {

    return this.store
      .remove(this.collection, document);

  }

  
  all () {

    return this.store
      .all(this.collection);

  }


  drop () {

    return this.store
      .drop(this.collection);

  }


}