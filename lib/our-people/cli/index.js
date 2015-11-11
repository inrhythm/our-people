

import inquirer from 'inquirer';
import md5 from 'crypto-js/md5';
import Promise from 'bluebird';


import addQuestions from '../add-questions';
import removeQuestions from '../remove-questions';
import getSubdocument from '../helpers/subdocument';


// const prompt = Promise.promisify(inquirer.prompt);


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


export default function cli (storage, collection) {

  const args = process.argv;

  if (args.length >= 3) {

    switch (args[2]) {

      case 'add':

        return addEngineer(storage, collection);

        break;

      case 'remove':

        return removeEngineer(storage, collection);

        break;

      default:

        return invalidCmd(args[2]);

        break;
    }
  }

}
