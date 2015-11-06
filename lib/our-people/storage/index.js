

import Collection from './collection';


export default function createStorage (config) {

  const Store = config.store;
  const options = config.options;

  const store = new Store(options);

  return function fileStore(collection) {

    return new Collection(store, collection);

  };


}