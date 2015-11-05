

export default function nameValidator (name) {

  return name.split(/\s+/).length > 1;

}