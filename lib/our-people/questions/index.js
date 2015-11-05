

import name from './name';
import emailAddress from './email-address';
import github from './github';
import linkedin from './linkedin';
import twitter from './twitter';
import phoneNumber from './phone-number';


const questions = [
  
  name,
  emailAddress,
  github,
  linkedin,
  twitter,
  phoneNumber

];


export function questionByName (name) {

  return questions.filter((question) =>
    question.name === name)[0];
  
}


export function questionValidatorByName (name) {

  return questionByName(name).validate;

}


export default questions;