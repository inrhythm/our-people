

import inquirer from 'inquirer';
import Promise from 'bluebird';


import addQuestions from '../questions/add';
import removeQuestions from '../questions/remove';
import generateGravatarLink from '../helpers/generate-gravatar-link';


const commands = {

  add: addCollectionItem,
  remove: removeCollectionItem,
  update: updateCollectionItem,
  show: showCollection

};


function generateGravatarLink (email) {

  return 'https://s.gravatar.com/avatar/' + md5(email.trim().toLowerCase());

}


function parseUpdateArgs (args) {

  let data = { _id: args[0] };

  data[args[1]] = args[2];

}


/**
 * Asks the user to input (stdin) a series of answers
 * to logged (stdout) questions that inquires details
 * about the collection item.
 * 
 * @param  {Storage} storage
 * @param  {String}  collectionName  name of collection
 * @return {Promise<Array>}
 */
function addCollectionItem (storage, collectionName) {

  return new Promise(function (resolve, reject) {

    inquirer.prompt(addQuestions, (answers) => {

      answers.gravatar = generateGravatarLink(answers.email);

      storage(collectionName)
        .add(answers)
        .then(resolve)
        .catch(reject);
      
    });

  });

}


/**
 * Prompts the user to stdin the `_id` of the collection item.
 * 
 * @param  {Storage} storage
 * @param  {String}  collectionName  name of collection
 * @return {Promise<Array>}
 */
function removeCollectionItem (storage, collectionName) {

  return new Promise(function (resolve, reject) {

    inquirer.prompt(removeQuestions, (answers) => {

      storage(collectionName)
        .remove(answers)
        .then(resolve)
        .catch(reject);
      
    });

  });

}


/**
 * Updates an item in a collection.
 * @param  {Storage} storage
 * @param  {String} collectionName
 * @param  {Array<String>} args           arguments containing the following:
 *                                   - 
 * @return {Promise<Array>}                [description]
 */
function updateCollectionItem (storage, collectionName, args) {

  return new Promise(function (resolve, reject) {

    storage(collectionName)
      .update(parseUpdateArgs(args))
      .then(resolve)
      .catch(reject);

  });

}


/**
 * Stdout's a JSON list of a collection.
 * 
 * @param  {Storage} storage
 * @param  {String}  collectionName  name of collection
 * @return {Promise<Void>}
 */
function showCollection (storage, collectionName) {

  return storage(collectionName)
    .all()
    .then((collection) => console.log(JSON.stringify(collection)));

}


/**
 * Determines the correct function to use if the command
 * is found or a string of an error message otherwise.
 * 
 * @param  {String} name     the name of the command to run
 * @return {Function\String} function from command (or error)
 */
function commandByName (name) {

  return commands[name] || `Command '${name}' not found.`;

}


/**
 * Command line interface for CRUD operations on collection items.
 * 
 * @param  {Storage} storage
 * @param  {String}  collectionName  the name of the collection
 * @param  {String}  command         command to run:
 *                                   (`add`, `remove`, `update`, `show`)
 * @return {Promise}                 result of cli command
 */
export default function cli (storage, collectionName, command, args) {

  const cmd = commandByName(command);

  if (typeof cmd !== 'function') {
    
    return console.log(cmd);

  }

  return cmd(storage, collectionName, args);

}
