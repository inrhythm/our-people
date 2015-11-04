

import { expect } from 'chai';

import { validUrl , invalidUrl} from '../../../helpers/url';

import urlValidator from 'our-people/validators/url';


describe('url validator', () => {

    function validatedUrl(){

        return urlValidator(validUrl);

    }

    function invalidatedUrl(){

        return urlValidator(invalidUrl);

    }

    it('should return true when a valid url is provided', () => {

        expect(validatedUrl()).to.be.true;


    });
    it('should return false when a invalid url is provided', () => {

        expect(invalidatedUrl()).to.be.false;

    });

});