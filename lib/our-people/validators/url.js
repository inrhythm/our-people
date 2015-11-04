

const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;


export default function urlValidator(url) {

  return urlRegex.test(url);

}