

import engineer from './engineer';


export default function (database) {

  return {

    Engineer: engineer(database)

  };

}