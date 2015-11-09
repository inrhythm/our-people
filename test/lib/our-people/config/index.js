

import { expect } from 'chai';


import getConfiguration from 'our-people/config';


describe.only('config', function () {


  function branches () {

    return [  

      'master',
      'staging',
      'random/branch/name'

    ];

  }


  function configurations () {

    return branches()
      .map((branchName) => getConfiguration(branchName));

  }
  

  it(`should have 3 configuration objects`, () =>

    expect(configurations()).to.have.length(3));


});