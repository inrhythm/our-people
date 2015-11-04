

import chai, { expect } from 'chai';
import chaiAsPromise from 'chai-as-promised';


import questions from 'our-people/questions';


chai.use(chaiAsPromise);


describe('questions', () => {


  it('questions should eventually be an array', () =>

    expect(questions).to.eventually.be.an('array'));


});