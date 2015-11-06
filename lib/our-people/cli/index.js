

import inquirer from 'inquirer';
import md5 from 'crypto-js/md5';


import questions from '../questions';
import Promise from 'bluebird';


// const prompt = Promise.promisify(inquirer.prompt);


function generateGravatarLink (email) {

  return 'https://s.gravatar.com/avatar/' + md5(email.trim().toLowerCase());

}

export default function cli (storage, storageName) {

  return new Promise(function (resolve, reject) {

    inquirer.prompt(questions, (answers) => {

      answers.gravatar = generateGravatarLink(answers.email);

      storage(storageName)
        .add(answers)
        .then(resolve)
        .catch(reject);
      
    });

  });

}
