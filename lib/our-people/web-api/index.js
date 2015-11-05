


import express from 'express';
import bodyParser from 'body-parser';


import { questionValidatorByName } from '../questions';


function validator (name) {

  return questionValidatorByName(name) || function () { return true; };

}


function isValid (name, answer) {

  return validator(name)(answer);

}


function errorMessagesFromAnswers (answers) {

  return Object.keys(answers)
    
    .map((name) => isValid(name, answers[name]))

    .filter((validated) => typeof validated === 'string');

}


export default function webApi (storage, storageName) {


  const app = express();


  /*
   * Middleware
   */

  app.use(bodyParser());


  /**
   * Returns all engineers from storage.
   */

  app.get('/', (req, res) => {

    storage(storageName)
      .all()
      .then((store) => res.json(store));

  });


  /**
   * Finds the appropriate question validator and
   * validates each answer within the posted object.
   */

  app.post('/', (req, res) => {

    const answers = req.body;

    const errorMessages = errorMessagesFromAnswers(answers);

    if (errorMessages.length > 0) {

      return res.json(errorMessages);

    }
    
    storage(storageName)
      .add(answers)
      .then((store) => res.json(store));

  });


  return app;

}