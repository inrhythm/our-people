

import { expect } from 'chai';
import mockStdin from 'mock-stdin';
import crypto from 'crypto-js';
import fs from 'fs-extra';


import createFileStorage from 'our-people/storage/file';
import cli from 'our-people/cli';
import { validName } from '../../../helpers/name';
import { validEmailAddress } from '../../../helpers/email';
import { validGithubHandle } from '../../../helpers/github-handle';
import { validUrl } from '../../../helpers/url';
import { validTwitterHandle } from '../../../helpers/twitter-handle';
import { validPhoneNumber } from '../../../helpers/phone-number';


const random = () => crypto.lib.WordArray.random(128/8).toString();

const stdin = mockStdin.stdin();

const storageName = 'engineers';

function createStorage () {

  return createFileStorage({

    path: __dirname + '/' + random() + '-db.json'

  });

}


describe.only('cli', function () {


  after(() => 

    fs.removeSync(__dirname + '/*.json'));


  function answerQuestions (storage) {

    cli(storage, 'engineers');

    stdin.send(`${validName}\n`);
    stdin.send(`${validEmailAddress}\n`);
    stdin.send(`${validGithubHandle}\n`);
    stdin.send(`${validUrl}\n`);
    stdin.send(`${validTwitterHandle}\n`);
    stdin.send(`${validPhoneNumber}\n`);

  }


  
  function storedEngineers (storage, name) {

    answerQuestions(storage, name);

    return storage(name).all();

  }


  it('should have one stored engineer', () => 

    storedEngineers(createStorage(), storageName)
      .then((store) => expect(store).to.have.length(1)));


});