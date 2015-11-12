

import inquirer from 'inquirer';
import md5 from 'crypto-js/md5';
import Promise from 'bluebird';


import addQuestions from '../questions/add';
import removeQuestions from '../questions/remove';


const commands = {

  add: addEngineer,
  remove: removeEngineer,
  update: updateEngineer,
  show: showEngineers

};


function generateGravatarLink (email) {

  return 'https://s.gravatar.com/avatar/' + md5(email.trim().toLowerCase());

}


function parseUpdateArgs (args) {

  let data = { _id: args[0] };

  data[args[1]] = args[2];

  return data;

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


function updateEngineer (storage, collection, args) {

  return new Promise(function (resolve, reject) {

    storage(collection)
      .update(parseUpdateArgs(args))
      .then(resolve)
      .catch(reject);

  });

}


function showEngineers (storage, collection) {

  return storage(collection)
    .all()
    .then((engineers) => console.log(JSON.stringify(engineers)));

}


function commandByName (name) {

  return commands[name] || `Command '${name}' not found.`;

}


export default function cli (storage, collection, command, args) {

  const cmd = commandByName(command);

  if (typeof cmd !== 'function') {
    
    return console.log(cmd);

  }

  return cmd(storage, collection, args);

}
