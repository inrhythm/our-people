

export function filter (twitterHandle) {

  return 'https://twitter.com/' + twitterHandle;

}


export default {


  type: 'input',
  name: 'twitter',
  message: 'Please enter your Twitter handle: ',


  filter


};