

import phoneNumberValidator from '../validators/phone-number';


const invalidatedMessage = 'Please enter a valid phone number';


export default {


  type: 'input',
  name: 'phone',
  message: 'What\'s your phone number (Existing :TODO)?',


  invalidatedMessage,


  validate (phoneNumber) {

    return phoneNumberValidator(phoneNumber) || invalidatedMessage;

  }


};