

import { expect } from 'chai';


import fileStore from 'our-people/storage/file';
import crypto from 'crypto-js';
import fs from 'fs-extra';


const validName = 'engineers';
const validValue = { name: 'jesse' };
const random = () => crypto.lib.WordArray.random(128/8).toString();


function createStorage () {

  return fileStore({
    path: __dirname + '/' + random() + '-db.json'
  });

}


describe.only('file store', function () {


  after(() => 

    fs.removeSync(__dirname + '/*.json'));

  
  function valueAddedToStore (storage) {

    return storage(validName)
      .add(validValue);

  }


  function droppedStore (storage) {

    return valueAddedToStore(storage)
      .then(() => storage(validName).drop());

  }


  function allStoreValues (storage) {

    return valueAddedToStore(storage)
      .then(() => storage(validName).all());


  }


  function emptyStore (storage) {

    return storage(validName).all();

  }


  function storeWithRemovedValue (storage) {

    return valueAddedToStore(storage)
      .then((store) => storage(validName).remove(store[0]));

  }


  describe('drop', function () {


    it('should drop the store', () =>

      droppedStore(createStorage())
        .then((store) => expect(store).to.have.length(0)));


  });

  
  describe('add', function () {


    it('should have the value added to the store', () => 

      valueAddedToStore(createStorage())
        .then((store) => expect(store[0]).to.equal(validValue)));


  });


  describe('remove', function () {


    it('should remove the value from the store', () => 

      storeWithRemovedValue(createStorage())
        .then((store) => expect(store).to.have.length(0)));


  });


  describe('all', function () {


    it('should be an empty store', () =>

      emptyStore(createStorage())
        .then((store) => expect(store).to.have.length(0)));


    it('should return all values in store', () => 

      allStoreValues(createStorage())
        .then((store) => expect(store).to.have.length(1)));

  });


});