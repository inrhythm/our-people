

import webApi from './our-people/web-api';
import fileStorage from './our-people/storage/file';


const storageName = 'engineers';

const storage = fileStorage({

  path: __dirname + '/db.json'

});


webApi(storage, storageName).listen(3001);