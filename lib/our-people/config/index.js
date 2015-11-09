

const path = __dirname + '/../../../data/engineers.json';
const developmentPath = __dirname + '/../../../data/engineers.dev.json';


const configuration = {

  master: {

    path

  },


  staging: {

    path

  },


  development: {

    path: developmentPath

  }

};


Object.freeze(configuration);


export default function getConfiguration (env) {

  if (env !== 'master' || env !== 'staging') {
    env = 'development';
  }

  return configuration[env];

}