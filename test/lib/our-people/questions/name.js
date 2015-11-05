

import { expect } from 'chai';


import { validate, invalidatedMessage } from 'our-people/questions/name';
import { validName, invalidName } from '../../../helpers/name';


describe('name question', () => {


  describe('validate', () => {


    function validated () {

      return validate(validName);

    }


    function invalidated () {

      return validate(invalidName);

    }


    it('should validate with a valid name by returning true', () =>

      expect(validated()).to.be.true);


    it(`should invalidate with an invalid name by returning string ${invalidatedMessage}`, () =>

      expect(invalidated()).to.be.equal(invalidatedMessage));


  });


});