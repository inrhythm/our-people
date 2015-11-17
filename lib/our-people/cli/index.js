

import inquirer from 'inquirer';
import Promise from 'bluebird';
import 'colors';

import addQuestions from '../questions/add';
import removeQuestions from '../questions/remove';
import updateQuestions from '../questions/update';
import generateGravatarLink from '../helpers/generate-gravatar-link';


const commands = {

  add: addCollectionItem,
  remove: removeCollectionItem,
  update: update,
  show: showCollection

};


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
 * @return {Promise<Array>}
 */
function filterCollectionItems (storage, collectionName, args) {

  return new Promise(function (resolve, reject) {

    storage(collectionName)
      .filter(args)
      .then(resolve)
      .catch(reject);

  });

}


/**
 * Prompts user to input an option. Keeps prompting them
 * until they answer correctly.
 * 
 * @param  {Number}          limit max # they can input
 * @return {Promise<Number>}
 */
function inquireOption (limit) {

  return new Promise(function (resolve, reject) {

    inquirer.prompt([{

      type : 'input',
      name : 'option',
      message : 'Please select an option to update: '

    }], (answer) => {

      let option = answer.option;

      if (option <= limit - 1) {

        resolve (option);

      } else {

        console.log('Invalid option.'.red);

        return inquireOption(limit);

      }

    });

  });

}


/**
 * Renders an update subdocument from a series of answers and existing item.
 * 
 * @param  {Object} answers
 * @param  {Object} item
 * @return {Object} subdocument
 */
function renderDocumentFromFields (answers, item) {

  const doc = { _id : item._id };

  doc[answers.field] = answers.value;

  return doc;

}


/**
 * Updates a document in a collection.
 *
 * @param  {Storage} storage
 * @param  {String}  collectionName
 * @param  {Object}  item
 * @return {Promise<Array>}
 */
function updateCollectionItem (storage, collectionName, item) {

  return new Promise(function (resolve, reject) {

    inquirer.prompt(updateQuestions, (answers) => {

      const doc = renderDocumentFromFields(answers, item);

      storage(collectionName)
        .update(doc)
        .then(resolve)
        .catch(reject);

    });

  });

}


/**
 * Stdout a list of given documents.
 * 
 * @param  {String} collectionName
 * @param  {Array}  items
 * @return {[type]}                [description]
 */
function selectionPrompt (storage, collectionName, items) {

  return new Promise(function (resolve, reject) {

    if(items.length > 0) {

      console.log(('The following documents were found:').green);

      items.forEach(function(item, index) {

        console.log((index + ') ' + item.name + '').magenta);

      });

      inquireOption(items.length)
        .then(resolve)
        .catch(reject);

    } else {

      console.log(('No matching documents were found.').red);

    }

  });

}


/**
 * Fetches a list of documents for a given search query.
 * 
 * @param  {Storage} storage
 * @param  {String}  collectionName
 * @param  {String}  args           cli args
 * @return {Promise<Array>}
 */
function renderUpdateOptions (storage, collectionName, args) {

  const query = args[0] || '';

  return new Promise(function (resolve, reject) {

    filterCollectionItems(storage, collectionName, query)
      .then(resolve)
      .catch(reject);

  });
  
}


/**
 * Updates a document in storage.
 * 
 * @param  {Storage} storage
 * @param  {String}  collectionName
 * @return {Promise}
 */
function update (storage, collectionName) {

  return new Promise(function (resolve, reject) {

    renderUpdateOptions(storage, collectionName)
      .then((items) => selectionPrompt(storage, collectionName, items))
      .then((option) => updateCollectionItem(storage, collectionName, items[option]))
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
 * @param  {String} name      the name of the command to run
 * @return {Function<String>} function from command (or error)
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
function cli (storage, collectionName, command, args) {

  const cmd = commandByName(command);

  if (typeof cmd !== 'function') {
    
    return console.log(cmd);

  }

  return cmd(storage, collectionName, args);

}

export {

  cli,
  updateCollectionItem,
  selectionPrompt,
  renderUpdateOptions

}
