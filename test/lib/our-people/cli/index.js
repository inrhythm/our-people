

import { expect } from 'chai';
import mockStdin from 'mock-stdin';


import cli from '../../../../lib/our-people/cli';
import createStorage from '../../../helpers/storage';
import { validName } from '../../../helpers/name';
import { validEmailAddress } from '../../../helpers/email';
import { validGithubHandle } from '../../../helpers/github-handle';
import { validUrl } from '../../../helpers/url';
import { validTwitterHandle } from '../../../helpers/twitter-handle';
import { validPhoneNumber } from '../../../helpers/phone-number';


const stdin = mockStdin.stdin();


describe('cli', function () {


  function answerQuestions (storage) {

    cli(storage);

    stdin.send(`${validName}\n`);
    stdin.send(`${validEmailAddress}\n`);
    stdin.send(`${validGithubHandle}\n`);
    stdin.send(`${validUrl}\n`);
    stdin.send(`${validTwitterHandle}\n`);
    stdin.send(`${validPhoneNumber}\n`);

  }


  
  function storedEngineers () {

    const storage = createStorage();

    answerQuestions(storage);

    return storage.engineers.all();

  }


  it('should have one stored engineer', () => 

    expect(storedEngineers()).to.have.length(1));


});