

import { expect } from 'chai';
import mockStdin from 'mock-stdin';
import fs from 'fs-extra';
import intercept from 'intercept-stdout';

import createFileStorage from 'our-people/storage/file-storage';
import randomString from 'our-people/helpers/random';
import cli from 'our-people/cli';


import { validName } from '../../../helpers/name';
import { validEmailAddress } from '../../../helpers/email';
import { validGithubHandle } from '../../../helpers/github-handle';
import { validUrl } from '../../../helpers/url';
import { validTwitterHandle } from '../../../helpers/twitter-handle';
import { validPhoneNumber } from '../../../helpers/phone-number';


const stdin = mockStdin.stdin();
const collection = 'engineers';


function createStorage () {

  return createFileStorage({

    path: __dirname + '/' + randomString() + '-db.json'

  });

}


function sendAnswers (answers) {

  answers
    .forEach((answer) => stdin.send(`${answer}\n`));

}


function showEngineers (storage, collection) {
  
  return cli(storage, collection, 'show');

}


function addEngineer (storage, collection) {

  const promise = cli(storage, collection, 'add');

  sendAnswers([

    validName,
    validEmailAddress,
    validGithubHandle,
    validUrl,
    validTwitterHandle,
    validPhoneNumber

  ]);

  return promise;

}


function removeEngineer (storage, collection, engineer) {

  const promise = cli(storage, collection, 'remove');

  sendAnswers([

    engineer._id

  ]);

  return promise;

}


describe('cli', function () {


  after(() => 

    fs.removeSync(__dirname + '/*.json'));


  it(`should store an engineer`, () => 

    addEngineer(createStorage(), collection)
      .then((engineers) => expect(engineers).to.have.length(1)));


  it(`should respond with an engineer`, () => {

    let result = '';

    intercept((output) => {
      result = output.trim();
    });

    const storage = createStorage();

    return addEngineer(storage, collection)
      .then(showEngineers(storage, collection))
      .then(() => JSON.parse(result))
      .then((engineers) => expect(engineers).to.have.length(1));

  });


  it(`should delete an engineer`, () => {

    const storage = createStorage();

    return addEngineer(storage, collection)
      .then((engineers) => removeEngineer(storage, collection, engineers[0]))
      .then((engineers) => expect(engineers).to.have.length(0));

  });


});

