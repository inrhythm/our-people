

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

// GET

function getEngineers () {

  return request(requestConfig('GET'));

}


// POST

function addEngineer () {

  return request(requestConfig('POST', createEngineer()));

}


// DELETE

function deleteEngineer (engineer) {

  return request(requestConfig('DELETE', engineer));

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
  

});