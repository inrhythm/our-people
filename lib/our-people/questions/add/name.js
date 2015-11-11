

import nameValidator from '../../validators/name';


export const invalidatedMessage = 'Please enter a valid name.';

export function validate (name) {

  return nameValidator(name) || invalidatedMessage;

}

export default {


  type: 'input',
  name: 'name',
  message: 'What is your name?',


  invalidatedMessage,


  validate 


};