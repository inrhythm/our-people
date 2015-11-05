

import Promise from 'bluebird';


import setup from './setup';
import allJson from './helpers/all-json';
import writeFile from './helpers/write-file';


function curriedEngineers (models) {

  return allJson(models.Engineer);

}


function dumpEngineersToJson (models) {

  return allJson(models.Engineer)()
    .then(writeFile(engineersJsonPath));

}


function api (models) {

  return Object.freeze({

    engineers: curriedEngineers(models),

    addEngineer (options) {

      return models.Engineer.create(options);

    },

    save () {

      const engineersJsonPath = __dirname + '/engineers.json';

      return allJson(models.Engineer)()
        .then(writeFile(engineersJsonPath));

    }

  });

}


export default function storage () {

  return setup()
    
    .then((models) => api(models));

}

// TODO: Add an API that looks like
//  storage.addEngineer().then();
storage()
  .then(function (api) {

    api.addEngineer({
      'phone': '9083991635',
      'gravatar': 'https://s.gravatar.com/avatar/57f196ed148fb7cc75a3bfcc2b0e821d',
      'twitter': 'https://twitter.com/bing',
      'github': 'https://github.com/bing',
      'linkedin': 'https://bing.com',
      'name': 'Bob Bombadill'
    })
      // .then(api.save)
      .then(api.engineers)
      .then((engineers) => console.log(engineers));

  });