

import emailValidator from '../validators/email';


export const invalidatedMessage = 'Please enter a valid email address.';


export function validate (email) {

  return emailValidator(email) || invalidatedMessage;

}


export default {
  
  type : 'input',
  name : 'email',
  message : 'Please enter email address :-',


  invalidatedMessage: invalidatedMessage,


  /**
   * Validates the input as a valid email address.
   */

  validate

};