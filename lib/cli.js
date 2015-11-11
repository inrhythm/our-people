

import cliRun from './our-people/cli';
import fileStorage from './our-people/storage/file-storage';
import getConfiguration from './our-people/config';
import getBranchName from './our-people/helpers/branch-name';


getBranchName()
  .then((branchName) => getConfiguration(branchName))
  .then((configuration) => fileStorage(configuration))
  .then((storage) => cliRun(storage, 'engineers', process.argv[2]));