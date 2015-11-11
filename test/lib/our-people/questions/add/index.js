

import { expect } from 'chai';


import questions, { questionByName, questionValidatorByName } from 'our-people/questions/add';


describe('questions', () => {


  it('questions should be an array', () =>

    expect(questions).to.be.an('array'));


  describe('questionByName', () => {


    it('should return a question object', () =>

      expect(questionByName('name')).to.be.a('object'));


  });


  describe('questionValidatorByName', () => {
  
  
    it('should return a validator function from the question', () =>

      expect(questionValidatorByName('name')).to.be.a('function'));
  

  });


});