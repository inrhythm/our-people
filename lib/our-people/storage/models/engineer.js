

import { modelName, schema } from '../schemas/engineer';


export default function engineer (database) {

  return database.define(modelName, schema);

}