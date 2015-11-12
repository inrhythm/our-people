

import webApi from './our-people/web-api';
import fileStorage from './our-people/storage/file-storage';
import getConfiguration from './our-people/config';
import getBranchName from './our-people/helpers/branch-name';


getBranchName()
  .then((branchName) => getConfiguration(branchName))
  .then((configuration) => fileStorage(configuration))
  .then((storage) => webApi(storage, 'engineers'))
  .then((app) => app.listen(3001))
  .then(() => console.log(`\nAPI now listening on http://localhost:3001`));
