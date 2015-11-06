


import cliRun from './our-people/cli';
import fileStore from './our-people/storage/file';

const storage = fileStore({
  path: __dirname +'/db.json'
})


cliRun(storage, 'engineers');