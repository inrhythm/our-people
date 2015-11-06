

import { expect } from 'chai';


import randomString from 'our-people/helpers/random';


describe('random', function () {
  

  it(`should return a string`, () =>

    expect(randomString()).to.be.a('string'));


});