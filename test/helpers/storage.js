

export default function createStorage() {


  const collection = [];


  const engineers = {


    add (model) {

      collection.push(model);

    },


    all () {

      return collection;

    }


  };


  return {

    engineers

  };


}