

import cliRun from './our-people/cli';
import fileStorage from './our-people/storage/file-storage';
import getConfiguration from './our-people/config';
import getBranchName from './our-people/helpers/branch-name';

function getArgs () {

	const args = process.argv;

	if (args.length > 3) {

		return args.slice(3, args.length);

	}

	return [];

}


getBranchName()
  .then((branchName) => getConfiguration(branchName))
  .then((configuration) => fileStorage(configuration))
  .then((storage) => cliRun(storage, 'engineers', process.argv[2], getArgs()));