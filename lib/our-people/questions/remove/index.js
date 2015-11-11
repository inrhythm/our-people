

import id from './id';


const questions = [ id ];


export function questionByName (name) {

  return questions.filter((question) =>
    question.name === name)[0];
  
}


export function questionValidatorByName (name) {

  return questionByName(name).validate;

}


export default questions;