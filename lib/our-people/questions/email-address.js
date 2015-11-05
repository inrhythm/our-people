

import emailValidator from '../validators/email';


const invalidatedMessage = 'Please enter a valid email address.';


export default {
  
  type : 'input',
  name : 'email',
  message : 'Please enter email address :-',


  invalidatedMessage: invalidatedMessage,


  /**
   * Validates the input as a valid email address.
   */

  validate (email) {

    return emailValidator(email) || invalidatedMessage;

  }

};