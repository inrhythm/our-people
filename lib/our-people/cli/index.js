

import inquirer from 'inquirer';
import md5 from 'crypto-js/md5';
import Promise from 'bluebird';


import addQuestions from '../questions/add';
import removeQuestions from '../questions/remove';


const commands = {

  add: addEngineer,
  remove: removeEngineer,
  show: showEngineers

};


/**
 * Generates a gravatar link based on md5 has of a given email.
 * 
 * @param  {String} email email address
 * @return {String}       gravatar url
 */
function generateGravatarLink (email) {

  return 'https://s.gravatar.com/avatar/' + md5(email.trim().toLowerCase());

}


/**
 * Logs (stdout) a JSON string of engineers list.
 * 
 * @param  {Array} engineers  list of engineer documents
 * @return {Void}
 */
function listEngineers (engineers) {

  console.log(JSON.stringify(engineers));

}


/**
 * Gathers a list of engineers from a collection,
 * then stdouts it using listEngineers().
 * 
 * @param  {Storage} storage
 * @param  {String}  collection  name of collection
 * @return {Promise<Void>}
 */
function showEngineers (storage, collection) {

  return storage(collection)
      .all()
      .then(listEngineers);

}


/**
 * Asks the user to input (stdin) a series of answers
 * to logged (stdout) questions that inquires details
 * about the engineer.
 * 
 * @param  {Storage} storage
 * @param  {String}  collection  name of collection
 * @return {Promise<Array>}
 */
function addEngineer (storage, collection) {

  return new Promise(function (resolve, reject) {

    inquirer.prompt(addQuestions, (answers) => {

      answers.gravatar = generateGravatarLink(answers.email);

      storage(collection)
        .add(answers)
        .then(resolve)
        .catch(reject);
      
    });

  });

}


/**
 * Prompts the user to stdin the `_id` of the engineer.
 * 
 * @param  {Storage} storage
 * @param  {String}  collection  name of collection
 * @return {Promise<Array>}
 */
function removeEngineer (storage, collection) {

  return new Promise(function (resolve, reject) {

    inquirer.prompt(removeQuestions, (answers) => {

      storage(collection)
        .remove(answers)
        .then(resolve)
        .catch(reject);
      
    });

  });

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
 * Command line interface for CRUD operations on engineers.
 * 
 * @param  {Storage} storage
 * @param  {String}  collection  the name of the collection
 * @param  {String}  command     command to run:
 *                               (`add`, `remove`, `update`, `show`)
 * @return {Promise}             result of cli command
 */
export default function cli (storage, collection, command) {

  const cmd = commandByName(command);

  if (typeof cmd !== 'function') {
    
    return console.log(cmd);

  }

  return cmd(storage, collection);

}
