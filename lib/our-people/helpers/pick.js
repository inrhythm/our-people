

export default function pick (object, fields) {

  return fields.reduce((a, x) => {

      if(object.hasOwnProperty(x)) {

        a[x] = object[x];

      } 

      return a;

  }, {});

}