

/**
 * Given an object, returns a clone of that object with only
 * the specified properties.
 * 
 * @param  {Object}         object  object
 * @param  {Array<String>}  fields  properties to include
 * @return {Object}         object  with included properties
 */
export default function pick (object, fields) {

  return fields.reduce((a, x) => {

      if(object.hasOwnProperty(x)) {

        a[x] = object[x];

      } 

      return a;

  }, {});

}