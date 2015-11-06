

import webApi from './our-people/web-api';
import fileStorage from './our-people/storage/file';


const storageName = 'engineers';

const storage = fileStorage({

  path: __dirname + '/db.json'

});

const app = webApi(storage, storageName);

const listener = app.listen(3001, () => {

  console.log(`http://locahost:${listener.address().port}`);

});

