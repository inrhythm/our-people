

const phoneNumberRegex = /^([01]{1})?[\-\.\s]?\(?(\d{3})\)?[\-\.\s]?(\d{3})[\-\.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i;


export default function phoneNumberValidator(phoneNumber) {

  return phoneNumberRegex.test(phoneNumber);

}