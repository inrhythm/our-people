

import { expect } from 'chai';


import { validUrl , invalidUrl } from '../../../../helpers/url';
import { validate , invalidatedMessage } from 'our-people/questions/add/linkedin';


describe('linkedin question', () => {


  describe('validate', () => {


    function validated () {

      return validate(validUrl);

    }


    function invalidated () {

      return validate(invalidUrl);

    }


    it('should validate with a valid linkedin url by returning true', () =>

      expect(validated()).to.be.true);


    it(`should invalidate with a invalid linkedin url by returning string "${invalidatedMessage}"`, () =>

      expect(invalidated()).to.be.equal(invalidatedMessage));


  });


});
