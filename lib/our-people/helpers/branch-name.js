

import { exec } from 'child_process';
import Promise from 'bluebird';


const execp = Promise.promisify(exec);


export default function branchName () {

  return execp(`git rev-parse --abbrev-ref HEAD`);

}