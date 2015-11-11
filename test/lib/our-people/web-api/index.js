

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

function deleteEngineer (engineers) {

  const payload = { _id : engineers[0]._id };

  return request(requestConfig('DELETE', payload));

}



describe('web-api', function () {


  before((done) =>

    serve(
      webApi, 
      randomFileStorage(__dirname), 
      'engineers', 
      port, 
      done));


  beforeEach(() =>

    removeAllRandomFileStorages(__dirname));


  after(() =>

    removeAllRandomFileStorages(__dirname));
  

  it(`should add an engineer`, () => 

    addEngineer()
      .then(getEngineers())
      .then((engineers) => expect(engineers).to.have.length(1)));


  it(`should delete an engineer`, () => 

    getEngineers()
      .then((engineers) => deleteEngineer(engineers))
      .then((engineers) => expect(engineers).to.have.length(0)));


});