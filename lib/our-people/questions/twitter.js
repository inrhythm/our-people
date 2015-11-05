

export default {


  type: 'input',
  name: 'twitter',
  message: 'Please enter your twitter handle :-',


  filter (twitterHandle) {

    return 'https://twitter.com/' + twitterHandle;

  }


};