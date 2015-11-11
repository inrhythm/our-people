

import inquirer from 'inquirer';
import md5 from 'crypto-js/md5';
import Promise from 'bluebird';


import addQuestions from '../add-questions';
import removeQuestions from '../remove-questions';
import getSubdocument from '../helpers/subdocument';


const commands = {

  add: addEngineer,
  remove: removeEngineer

};


function generateGravatarLink (email) {

  return 'https://s.gravatar.com/avatar/' + md5(email.trim().toLowerCase());

}


function invalidCmd (arg) {

  console.log(`Invalid argument '${arg}'.`);

}


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


function commandByName (name) {

  return commands[name] || `Command '${name}' not found.`;

}


export default function cli (storage, collection) {

  const command = commandByName(process.argv[2]);

  if (typeof command !== 'function') {
    
    return console.log(command);

  }

  return command(storage, collection);

}
