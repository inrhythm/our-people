

import idValidator from '../validators/id';


export const invalidatedMessage = 'Please enter a valid _id.';


export function validate (id) {

  return idValidator(id) || invalidatedMessage;

}


export default {
  
  type : 'input',
  name : '_id',
  message : 'Please enter the _id of the engineer to delete: ',


  invalidatedMessage: invalidatedMessage,


  /**
   * Validates the input as a valid email address.
   */

  validate

};