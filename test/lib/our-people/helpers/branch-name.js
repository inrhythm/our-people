

import { expect } from 'chai';


import branchName from 'our-people/helpers/branch-name';


describe('branchName', function () {
  

  it(`should return a string`, () =>

    branchName()
      .then((name) => expect(name).to.be.a('string')));


});