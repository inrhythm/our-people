
export function filter (githubHandle) {

  return 'https://github.com/' + githubHandle;

}

export default {


  type: 'input',
  name: 'github',
  message: 'Please enter your GitHub handle: ',


  filter


};