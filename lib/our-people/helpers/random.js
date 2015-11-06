

import crypto from 'crypto-js';


export default function randomString () {

  return crypto.lib.WordArray.random(128/8).toString();

}