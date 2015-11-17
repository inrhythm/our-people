
import field from './field';
import value from './value';


const questions = [ 

	field,
	value

];


export function questionByName (name) {

  return questions.filter((question) =>
    question.name === name)[0];
  
}


export function questionValidatorByName (name) {

  return questionByName(name).validate;

}


export default questions;