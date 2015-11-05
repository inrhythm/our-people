

import nameValidator from '../validators/name';


const invalidatedMessage = 'Please enter a valid name.';


export default {


  type: 'input',
  name: 'name',
  message: 'What is your name?',


  invalidatedMessage,


  validate (name) {

    return nameValidator(name) || invalidatedMessage;

  }


};