

import createAngularApp from 'our-people-angular-ui';
import webApi from './our-people/web-api';
import fileStorage from './our-people/storage/file-storage';
import getConfiguration from './our-people/config';
import getBranchName from './our-people/helpers/branch-name';


getBranchName()
  .then((branchName) => getConfiguration(branchName))
  .then((configuration) => fileStorage(configuration))
  .then((storage) => webApi(storage, 'engineers'))
  .then((app) => {

    const angularApp = createAngularApp();
    angularApp.use('/engineers', app);

    angularApp.listen(3001);

  });

