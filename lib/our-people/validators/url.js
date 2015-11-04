
const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

module.exports = function urlValidator(url) {

    return urlRegex.test(url);

};