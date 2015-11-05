

import inquirer from 'inquirer';
import md5 from 'crypto-js/md5';


import questions from '../questions';


function generateGravatarLink (email) {

  return 'https://s.gravatar.com/avatar/' + md5(email.trim().toLowerCase());

}

export default function cli (storage) {

  inquirer.prompt(questions, (answers) => {

    answers.gravatar = generateGravatarLink(answers.email);

    storage.engineers.add(answers);

  });

}
