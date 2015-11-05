

import urlValidator from '../validators/url';


const invalidatedMessage = 'Please enter a valid linkedin url';


export default {


  type: "input",
  name: "linkedin",
  message: "Please enter your linkedin profile link :-",

  
  invalidatedMessage,


  validate (url) {

    return urlValidator(url) || invalidatedMessage;
    
  }


};