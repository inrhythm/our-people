

export const invalidatedMessage = 'Please enter a valid field to update: ';

const validFields = [

  'name',
  'email',
  'github',
  'linkedin',
  'twitter',
  'phone',

];


export function validate (field) {

	return (validFields.indexOf(field) !== -1) || invalidatedMessage;

}


export default {
  
  type : 'input',
  name : 'field',
  message : 'Please enter the field to update: ',


  invalidatedMessage: invalidatedMessage,


  /**
   * Validates the input as a valid field.
   */

  validate

};