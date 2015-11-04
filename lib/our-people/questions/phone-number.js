
import phoneNumberValidator from '../validators/phone-number';

const invalidatedMessage = 'Please enter a valid phone number';

export default {


    type : "input",
    name : "phone",
    message :  "What's your phone number (Existing :TODO)?",

    invalidatedMessage : invalidatedMessage,

    /**
     * Validates the input as a valid email address.
     */

    validate ( phoneNumber ) {
        return phoneNumberValidator(phoneNumber) || invalidatedMessage;
    }



    /*filter ( val ) {
        if( val ) {
            return val;
        }
        else return temp.phone;
    }*/
}