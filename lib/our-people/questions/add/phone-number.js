

import phoneNumberValidator from '../../validators/phone-number';


export const invalidatedMessage = 'Please enter a valid phone number';


export function validate (phoneNumber) {

  return phoneNumberValidator(phoneNumber) || invalidatedMessage;

}


export default {


  type: 'input',
  name: 'phone',
  message: 'Please enter your phone number: ',


  invalidatedMessage,


  validate


};