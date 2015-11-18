


import express from 'express';
import bodyParser from 'body-parser';


import { questionValidatorByName } from '../questions/add';
import pick from '../helpers/pick';
import generateGravatarLink from '../helpers/generate-gravatar-link';


/**
 * Returns the validator function for a given type.
 * 
 * @param  {String} name  name of validator
 * @return {Function}
 */
function validator (name) {

  return questionValidatorByName(name) || function () { return true; };

}


/**
 * Checks if an answer is valid.
 * 
 * @param  {String}  name    name of validator
 * @param  {String}  answer  user input
 * @return {Boolean}         validity of answer
 */
function isValid (name, answer) {

  return validator(name)(answer);

}


/**
 * Takes in an object of questions (keys) and answers (values)
 * and returns an array of errors for each invalid answer.
 * 
 * @param  {Object} answers
 * @return {Array<String>}
 */
function errorMessagesFromAnswers (answers) {

  return Object.keys(answers)
    
    .map((name) => isValid(name, answers[name]))

    .filter((validated) => typeof validated === 'string');

}


/**
 * Returns an object of answers with non-input answers omitted.
 * 
 * @param  {Object} answers [description]
 * @return {Object}
 */
function excludeProperties (answers) {

  const fields = [

    'name',
    'email',
    'github',
    'linkedin',
    'twitter',
    'phone'

  ];

  return pick(answers, fields);

}


/**
 * Checks if a given collection is a valid collection name.
 * 
 * @param  {String}         collectionName
 * @param  {Array<String>}  validCollections
 * @return {Boolean}
 */
function isValidCollection (collectionName, validCollections) {

  return validCollections.filter(
    (validCollection) => validCollection === collectionName).length > 0;

}


/**
 * Web API. Each endpoint accessible on '/'.
 * Includes basic CRUD operations using GET, POST, PUT, DELETE.
 * 
 * @param  {Storage} storage
 * @param  {String}  collection  name of collection
 * @return {Express App}
 */
export default function webApi (storage, validCollections) {


  const app = express();


  /*
   * Middleware
   */

  app.use(bodyParser.json());

  app.use('/:collection', (req, res, next) => {

    if (isValidCollection(req.params.collection, validCollections)) {

      next();

    } else {

      return res.status(404).json({ data : 'idk'});

    }

  });


  /**
   * Returns all engineers in storage.
   */

  app.get('/:collection', (req, res) => {

    storage(req.params.collection)
      .all()
      .then((store) => res.json(store));

  });


  /**
   * Finds the appropriate question validator and
   * validates each answer within the posted object.
   */

  app.post('/:collection', (req, res) => {

    const answers = req.body;

    const errorMessages = errorMessagesFromAnswers(answers);

    if (errorMessages.length > 0) {

      return res.json(errorMessages);

    }
    
    answers.gravatar = generateGravatarLink(answers.email);

    storage(req.params.collection)
      .add(answers)
      .then((store) => res.json(store));

  });


  /**
   * Finds the appropriate question validator and
   * validates each answer within the posted object.
   * Then updates the document with the given _id.
   */

  app.put('/:collection', (req, res) => {

    const answers = excludeProperties(req.body);

    const errorMessages = errorMessagesFromAnswers(answers);

    if (errorMessages.length > 0) {

      return res.json(errorMessages);

    }

    answers._id = req.body._id;
    
    storage(req.params.collection)
      .update(answers)
      .then((store) => res.json(store));

  });


  /**
   * Removes an engineer with the given id from storage.
   */

  app.delete('/:collection', (req, res) => {

    const data = req.body;

    storage(req.params.collection)
      .remove(data)
      .then((store) => res.json(store));

  });


  return app;

}