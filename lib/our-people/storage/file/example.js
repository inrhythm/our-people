

import createFileStore from './';


console.log(createFileStore.toString());


const storage = createFileStore({

  path: __dirname + '/db.json'

});

// 
storage('engineers').all().then((engineers) => console.log(engineers));


// storage('engineers').add({
//     'name': 'jesse'
//   })
//   .then((result) =>
//     console.log(result));

// storage('engineers').add({
//     'name': 'bill'
//   })
//   .then((result) =>
//     console.log(result));