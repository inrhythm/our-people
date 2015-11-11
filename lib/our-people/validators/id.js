

const idRegex = /^[A-Za-z0-9]+$/;


export default function idValidator(id) {

  return idRegex.test(id);

}