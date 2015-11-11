

import emailValidator from '../validators/email';

export default function getSubdocument (data) {

	if (emailValidator(data)) {

		return { email : data };

	}

	return { _id : data };
	
}