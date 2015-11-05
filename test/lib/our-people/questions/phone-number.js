

import { expect } from 'chai';


import { validate, invalidatedMessage } from 'our-people/questions/phone-number';
import { validPhoneNumber, invalidPhoneNumber } from '../../../helpers/phone-number';


describe('phone number question', () => {


  describe('validate', () => {


    function validated () {

      return validate(validPhoneNumber);

    }


    function invalidated () {

      return validate(invalidPhoneNumber);

    }


    it('should validate with a valid phone number by returning true', () =>

      expect(validated()).to.be.true);


    it(`should invalidate with a invalid phone number by returning string ${invalidatedMessage}`, () =>

      expect(invalidated()).to.be.equal(invalidatedMessage));


  });


});