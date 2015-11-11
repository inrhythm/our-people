


import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';


import { questionValidatorByName } from '../questions/add';


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


export default function webApi (storage, collection) {


  const app = express();


  /*
   * Middleware
   */

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());


  /**
   * Returns all engineers from storage.
   */

  app.get('/', (req, res) => {


    storage(collection)
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
    
    storage(collection)
      .add(answers)
      .then((store) => res.json(store));

  });


  /**
   * Removes an engineer with the given id from storage.
   */

  app.delete('/', (req, res) => {

    const data = req.body;

    storage(collection)
      .remove(data)
      .then((store) => res.json(store));

  });


  return app;

}