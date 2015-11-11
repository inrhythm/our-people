

import urlValidator from '../../validators/url';


export const invalidatedMessage = 'Please enter a valid linkedin url';


export function validate (url) {

  return urlValidator(url) || invalidatedMessage;
  
}


export default {


  type: 'input',
  name: 'linkedin',
  message: 'Please enter your linkedin profile link :-',

  
  invalidatedMessage,


  validate


};