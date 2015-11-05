

import { expect } from 'chai';


import { filter } from 'our-people/questions/twitter';
import validTwitterHandle from '../../../helpers/twitter-handle.js';


describe('twitter question', () => {


  describe('filter', () => {


    function filterOutput () {

      return filter(validTwitterHandle);

    }


    it('should create create a valid link with a valid twitter handle', () =>

      expect(filterOutput()).to.be.a('string'));


  });


});