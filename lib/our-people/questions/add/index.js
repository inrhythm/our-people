

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


/**
 * Loads a Question instance by name (Question type).
 * 
 * Struct of Question instance:
 * {
 * 	name: <String>,
 * 	type: <String>,
 * 	message: <String>,
 * 	invalidatedMessage: <String>,
 * 	validate: <Function>
 * }
 * 
 * @param  {String}               name of Question
 * @return {Struct<Question>}     instance of Question
 */
export function questionByName (name) {

  return questions.filter((question) =>
    question.name === name)[0];
  
}


/**
 * Returns instance of validator function for a given Question.
 * 
 * @param  {String}   name  name of Question
 * @return {Function}  		validator function
 */
export function questionValidatorByName (name) {

  return questionByName(name).validate;

}


export default questions;