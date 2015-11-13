

import md5 from 'crypto-js/md5';


/**
 * Generates a gravatar link based on md5 has of a given email.
 * 
 * @param  {String} email email address
 * @return {String}       gravatar url
 */

export default function generateGravatarLink (email) {

  return 'https://s.gravatar.com/avatar/' + md5(email.trim().toLowerCase());

}