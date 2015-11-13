

import { expect } from 'chai';
import request from 'request-promise';

import webApi from 'our-people/web-api';


import randomFileStorage, { removeAllRandomFileStorages } from '../../../helpers/random-file-storage';
import createEngineer from '../../../helpers/engineer';
import serve from '../../../helpers/serve';


const host = 'localhost';
const port = '4567';

const url = `http://${host}:${port}/`;


function requestConfig (method, body) {

  return {

    method: method,
    uri: url,

    body: body,

    json: true

  };
   
}


/**
 * Sends a GET request to retrieve a JSON list of engineers.
 * 
 * @return {Promise<String>} JSON string list of engineers.
 */
function getEngineers () {

  return request(requestConfig('GET'));

}


/**
 * Sends a POST request to add a new test engineer.
 *
 * @return {Promsise<String>} JSON string list of engineers.
 */
function addEngineer () {

  return request(requestConfig('POST', createEngineer()));

}


/**
 * Sends a DELETE request to remove an engineer.
 * 
 * @param  {Object} engineer requires `_id` property
 * @return {Promise<String>} JSON string list of remaining engineers.
 */
function deleteEngineer (engineer) {

  return request(requestConfig('DELETE', engineer));

}


/**
 * Sends a PUT request to update an engineer's document.
 * 
 * @param  {Object} engineer requires `_id` property.
 *                           updates all properties set on obj.
 * @return {Promise<String>} JSON string list of engineers.
 */
function updateEngineer (engineer) {

  return request(requestConfig('PUT', engineer));

}


describe('web-api', function () {


  let server = null;


  beforeEach((done) =>

    server = serve(
      webApi, 
      randomFileStorage(__dirname), 
      'engineers', 
      port,
      done));


  afterEach(() => {

    removeAllRandomFileStorages(__dirname);
    server.close();

  });


  describe('GET /', function () {

    
    it(`should return an empty array`, () =>

      getEngineers()
        .then((engineers) => expect(engineers).to.have.length(0)));


  });


  describe('POST /', function () {


    it(`should respond with an empty list`, () =>

      addEngineer()
        .then((engineers) => expect(engineers).to.have.length(1)));


    it(`should add an engineer`, () => 

      addEngineer()
        .then(getEngineers())
        .then((engineers) => expect(engineers).to.have.length(1)));


  });


  describe('DELETE /', function () {

    it(`should respond with an empty list`, () =>

      addEngineer()
        .then((engineers) => deleteEngineer(engineers[0]))
        .then((engineers) => expect(engineers).to.have.length(0)));


    it(`should delete an engineer`, () => 

      addEngineer()
        .then(getEngineers())
        .then((engineers) => deleteEngineer(engineers[0]))
        .then((engineers) => expect(engineers).to.have.length(0)));


  });


  describe('PUT /', function () {

    it(`should update an engineer`, () => 

      addEngineer()
        .then(getEngineers())
        .then((engineers) => {

          let engineer = engineers[0];

          engineer.name = 'Iron Man';

          return updateEngineer(engineer);

        })
        .then((engineers) => expect(engineers[0].name).to.equal('Iron Man')));

  });
  

});