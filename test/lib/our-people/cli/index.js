

import { expect } from 'chai';
import mockStdin from 'mock-stdin';
import fs from 'fs-extra';
import intercept from 'intercept-stdout';

import createFileStorage from 'our-people/storage/file-storage';
import randomString from 'our-people/helpers/random';
import createEngineer from '../../../helpers/engineer';
import cli from 'our-people/cli';


import { validName } from '../../../helpers/name';
import { validEmailAddress } from '../../../helpers/email';
import { validGithubHandle } from '../../../helpers/github-handle';
import { validUrl } from '../../../helpers/url';
import { validTwitterHandle } from '../../../helpers/twitter-handle';
import { validPhoneNumber } from '../../../helpers/phone-number';


const stdin = mockStdin.stdin();
const collection = 'engineers';


/**
 * Initializes a new instance of `Storage`.
 * 
 * @return {Storage} new storage instance
 */
function createStorage () {

  return createFileStorage({

    path: __dirname + '/' + randomString() + '-db.json'

  });

}


/**
 * For each answer, sends cli input of it.
 * 
 * @param  {Array<String>} answers list of answers to questions
 * @return {Void}
 */
function sendAnswers (answers) {

  answers
    .forEach((answer) => stdin.send(`${answer}\n`));

}


/**
 * Returns the cli result containing json array of engineers.
 * 
 * @param  {Storage} storage
 * @param  {String}  collection  name of collection
 * @return {Promise<Void>}
 */
function showEngineers (storage, collection) {
  
  return cli(storage, collection, 'show');

}


/**
 * Adds an engineer by answering the questions sequence in cli.
 * 
 * @param {Storage} storage
 * @param {String}  collection  name of collection
 */
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


/**
 * Removes an engineer from a collection in storage
 * 
 * @param  {Storage} storage    
 * @param  {String}  collection  name of collection that engineer is in
 * @param  {Object}  engineer    engineer to remove
 *                               requires `_id` property
 * @return {Promise<Void>}
 */
function removeEngineer (storage, collection, engineer) {

  const promise = cli(storage, collection, 'remove');

  sendAnswers([

    engineer._id

  ]);

  return promise;

}


function updateEngineer (storage, collection, args) {

  return cli(storage, collection, 'update', args);

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


  it(`should update an engineer`, () => {

    let result = '';

    const storage = createStorage();

    return addEngineer(storage, collection)
      .then((engineers) => {

        const args = [
          engineers[0]._id,
          'name',
          'John Oliver'
        ];

        return updateEngineer(storage, collection, args);

      })
      .then(() => {

        let interceptClose = intercept((output) => {
          result = output.trim();
        });

        return showEngineers(storage, collection);

      })
      .then(() => {

        return new Promise(function (resolve) {

          resolve(JSON.parse(result));


        });
        
      })
      .then((engineers) => expect(engineers[0].name).to.equal('John Oliver'));

  });


});

