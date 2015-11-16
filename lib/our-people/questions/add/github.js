
export function filter (githubHandle) {

  return 'https://github.com/' + githubHandle;

}

export default {


  type: 'input',
  name: 'github',
  message: 'Please enter your github handle: ',


  filter


};