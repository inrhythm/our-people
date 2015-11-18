

import { expect } from 'chai';
import mockStdin from 'mock-stdin';
import fs from 'fs-extra';
import intercept from 'intercept-stdout';

import createFileStorage from 'our-people/storage/file-storage';
import randomString from 'our-people/helpers/random';
import { 

  cli, 
  updateCollectionItem, 
  selectionPrompt,
  renderUpdateOptions

} from 'our-people/cli';


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
function showDocuments (storage, collection) {
  
  return cli(storage, collection, 'show');

}


/**
 * Adds an engineer by answering the questions sequence in cli.
 * 
 * @param {Storage} storage
 * @param {String}  collection  name of collection
 */
function addDocument (storage, collection) {

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
function removeDocument (storage, collection, document) {

  const promise = cli(storage, collection, 'remove');

  sendAnswers([

    document._id

  ]);

  return promise;

}


function updateDocument (storage, collection, update) {

  const promise = cli(storage, collection, 'update', update.email);

  // console.log('update', update);
  sendAnswers([

    0,
    'email', //update.field,
    update.value

  ]);

  return promise;

}


/**
 * Updates a document in storage.
 * 
 * @param  {Storage} storage
 * @param  {String}  collectionName
 * @return {Promise}
 */
function updateDocument (storage, collectionName, document) {

  return new Promise(function (resolve, reject) {

    renderUpdateOptions(storage, collectionName, document._id)
      .then((items) => {

        return new Promise(function (resolve, reject) {

          const promise = selectionPrompt(storage, collectionName, items);

          sendAnswers([0]);

          promise
            .then((option) => {

              sendAnswers([
                'name',
                'John Oliver'
              ]);

              return updateCollectionItem(storage, collectionName, items[option]);

            })
            .then(resolve)
            .catch(reject);

        });

      })
      .then(resolve)
      .catch(reject);

  });

}


describe('cli', function () {


  after(() => 

    fs.removeSync(__dirname + '/*.json'));


  /**
   * Add document
   */
  it(`should store a document`, () => 

    addDocument(createStorage(), collection)
      .then((documents) => expect(documents).to.have.length(1)));


  /**
   * Show documents
   */
  it(`should respond with a document`, () => {

    let result = '';

    intercept((output) => {
      result = output.trim();
    });

    const storage = createStorage();

    return addDocument(storage, collection)
      .then(showDocuments(storage, collection))
      .then(() => JSON.parse(result))
      .then((documents) => expect(documents).to.have.length(1));

  });


  /**
   * Delete document
   */
  it(`should delete a document`, () => {

    const storage = createStorage();

    return addDocument(storage, collection)
      .then((documents) => removeDocument(storage, collection, documents[0]))
      .then((documents) => expect(documents).to.have.length(0));

  });


  /**
   * Update document
   */
  it(`should update a document`, () => {

    let result = '';

    let doc = {};

    const storage = createStorage();

    return addDocument(storage, collection)
      .then((documents) => {

        doc = documents[0];

        return updateDocument(storage, collection, doc);

      })
      .then(() => {

        intercept((output) => {
          result = output.trim();
        });

        return showDocuments(storage, collection);

      })
      .then(() => {

        const docList = JSON.parse(result);

        expect(docList[0].name).to.equal('John Oliver');
        
      });

  });


});

