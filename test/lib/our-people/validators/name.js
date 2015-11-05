

import { expect } from 'chai';


import { validName, invalidName } from '../../../helpers/name';
import nameValidator from 'our-people/validators/name';


describe('name validator', () => {

  
  function validatedName () {

    return nameValidator(validName);

  }


  function invalidatedName () {

    return nameValidator(invalidName);

  }


  it('should return true when a valid name is provided', () =>

    expect(validatedName()).to.be.true);


  it('should return false when an invalid name is provided', () => 

    expect(invalidatedName()).to.be.false);




});