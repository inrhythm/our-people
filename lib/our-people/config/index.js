

const path = __dirname + '/../../../data/engineers.json';
const stagingPath = __dirname + '/../../../data/engineers.staging.json';
const developmentPath = __dirname + '/../../../data/engineers.dev.json';


const configuration = {

  master: {

    path

  },


  staging: {

    path: stagingPath

  },


  development: {

    path: developmentPath

  }

};


Object.freeze(configuration);


export default function getConfiguration (env) {
  
  env = env.replace(/\s+/, '').toLowerCase();

  if (env !== 'master' && env !== 'staging') {
    env = 'development';
  }

  return configuration[env];

}