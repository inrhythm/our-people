

import { expect } from 'chai';


import randomString from 'our-people/helpers/random';
import createFileStorage from 'our-people/storage/file-storage';
import fs from 'fs-extra';


const validName = 'engineers';
const validValue = { name: 'jesse', _id: '7e6068ca80ea4f66c23c0295c8716100' };


function createStorage () {

  return createFileStorage({

    path: __dirname + '/' + randomString() + '-db.json'

  });

}


describe('file store', function () {


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


  function updatedStore (storage, update) {
    
    return storage(validName)
      .update(update);

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


  describe('update', function () {


    it('should update a value in the store', () => {

      const storage = createStorage();

      valueAddedToStore(storage)
        .then((store) => {

          let value = store[0];

          value.name = 'Marty McFly';

          return updatedStore(storage, value);

        })
        .then((store) => expect(store[0].name).to.equal('Marty McFly'));

    });

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