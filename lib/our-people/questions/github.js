

export default {


  type: 'input',
  name: 'github',
  message: 'Please enter your github handle :-',


  filter: function (githubHandle) {

    return 'https://github.com/' + githubHandle;

  }


};