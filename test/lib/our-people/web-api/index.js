

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

function engineers () {

  return request(url);

}


// POST

function addEngineer () {

  return request(requestConfig('POST', createEngineer()));

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
      .then(engineers())
      .then((engineers) => expect(engineers).to.have.length(1)));


});