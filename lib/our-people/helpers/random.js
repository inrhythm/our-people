

import crypto from 'crypto-js';


/**
 * Generates + returns a string of 24 random 
 * alphanumeric chars (A-Z, a-z, or 0-9).
 * 
 * @return {String}
 */
export default function randomString () {

  return crypto.lib.WordArray.random(128/8).toString();

}