

import { validName } from './name';
import { validEmailAddress } from './email';
import { validUrl } from './url';
import { validPhoneNumber } from './phone-number';

export default function createEngineer () {

  return {

    name: validName,
    email: validEmailAddress,
    phone: validPhoneNumber,

    github: validUrl,
    linkedin: validUrl,
    twitter: validUrl

  };

}