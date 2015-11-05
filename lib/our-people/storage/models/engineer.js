

import { name, schema } from '../schemas/engineer';


export default function engineer (database) {

  return database.define(name, schema);

}