

export default class Collection {


  constructor (store, collection) {

    this.store = store;
    this.collection = collection;

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