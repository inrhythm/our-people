

import { expect } from 'chai';
import request from 'request-promise';

import webApi from 'our-people/web-api';


import randomFileStorage, { removeAllRandomFileStorages } from '../../../helpers/random-file-storage';
import serve from '../../../helpers/serve';
import createEngineer from '../../../helpers/engineer';

const host = 'localhost';
const port = '4567';

const url = `http://${host}:${port}/engineers`; // could be designers?


function requestConfig (method, body) {

  return {

    method: method,
    uri: url,

    body: body,

    json: true

  };
   
}


/**
 * Sends a GET request to retrieve a JSON list of documents.
 * 
 * @return {Promise<String>} JSON string list of documents.
 */
function getDocuments () {

  return request(requestConfig('GET'));

}


/**
 * Sends a POST request to add a new test document.
 *
 * @return {Promsise<String>} JSON string list of documents.
 */
function addDocument () {

  return request(requestConfig('POST', createEngineer()));

}


/**
 * Sends a DELETE request to remove an document.
 * 
 * @param  {Object} document requires `_id` property
 * @return {Promise<String>} JSON string list of remaining documents.
 */
function deleteDocument (document) {

  return request(requestConfig('DELETE', document));

}


/**
 * Sends a PUT request to update an document's document.
 * 
 * @param  {Object} document requires `_id` property.
 *                           updates all properties set on obj.
 * @return {Promise<String>} JSON string list of documents.
 */
function updateDocument (document) {

  return request(requestConfig('PUT', document));

}


describe('web-api', function () {


  let server = null;


  beforeEach((done) =>

    server = serve(
      webApi, 
      randomFileStorage(__dirname), 
      [
        'engineers',
        'designers'
      ], 
      port,
      done));


  afterEach(() => {

    removeAllRandomFileStorages(__dirname);
    server.close();

  });


  describe('GET /:collection', function () {

    
    it(`should return an empty array`, () =>

      getDocuments()
        .then((documents) => expect(documents).to.have.length(0)));


  });


  describe('POST /:collection', function () {


    it(`should respond with an empty list`, () =>

      addDocument()
        .then((documents) => expect(documents).to.have.length(1)));


    it(`should add an document`, () => 

      addDocument()
        .then(getDocuments())
        .then((documents) => expect(documents).to.have.length(1)));


  });


  describe('DELETE /:collection', function () {

    it(`should respond with an empty list`, () =>

      addDocument()
        .then((documents) => deleteDocument(documents[0]))
        .then((documents) => expect(documents).to.have.length(0)));


    it(`should delete an document`, () => 

      addDocument()
        .then(getDocuments())
        .then((documents) => deleteDocument(documents[0]))
        .then((documents) => expect(documents).to.have.length(0)));


  });


  describe('PUT /:collection', function () {

    it(`should update an document`, () => 

      addDocument()
        .then(getDocuments())
        .then((documents) => {

          let document = documents[0];

          document.name = 'Iron Man';

          return updateDocument(document);

        })
        .then((documents) => expect(documents[0].name).to.equal('Iron Man')));

  });
  

});