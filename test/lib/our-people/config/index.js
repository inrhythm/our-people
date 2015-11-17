

import { expect } from 'chai';


import getConfiguration from 'our-people/config';


describe('config', function () {


  /**
   * Returns a list of branches.
   * 
   * @return {Array<String>} list of branch names
   */
  function branches () {

    return [  

      'master',
      'staging',
      'random/branch/name'

    ];

  }


  /**
   * Returns a list of configurations.
   * 
   * @return {Array<String>}
   */
  function configurations () {

    return branches()
      .map((branchName) => getConfiguration(branchName));

  }
  

  it(`should have 3 configuration objects`, () =>

    expect(configurations()).to.have.length(3));


});