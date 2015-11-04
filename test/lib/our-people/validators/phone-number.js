import { expect } from 'chai';

import { validPhoneNumber , invalidPhoneNumber } from '../../../helpers/phone-number';

import phoneNumberValidator from 'our-people/validators/phone-number';

describe('phone number validator', () => {

    function validatedPhoneNumber(){

        return phoneNumberValidator(validPhoneNumber);

    }

    function invalidatedPhoneNumber(){

        return phoneNumberValidator(invalidPhoneNumber);

    }

    it('should return true when a valid phone number is provided', () => {

        expect(validatedPhoneNumber()).to.be.ture;

    });


    it('should return false when a invalid phone number is provided', () => {

        expect(invalidatedPhoneNumber()).to.be.false;

    });

});