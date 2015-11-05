
import database, { models } from './database';
import dropEngineersTable from './helpers/drop-engineers-table';
import createEngineersTable from './helpers/create-engineers-table';
import readFile from './helpers/read-file';
import writeFile from './helpers/write-file';
import removeFile from './helpers/remove-file';
import bulkCreate from './helpers/bulk-create';
import allJson from './helpers/all-json';
import parse from './helpers/json-parse';


const engineersJsonPath = __dirname + '/engineers.json';
const databasePath = __dirname + '/database.sqlite';


function recreateEmptyDatabase () {

  return removeFile(databasePath)()
    .then(createEngineersTable(database));

}


function addEngineersToDatabase () {

  return readFile(engineersJsonPath)()
    .then(parse())
    .then(bulkCreate(models.Engineer));

}


function removeEngineersJson () {

  return removeFile(engineersJsonPath);

}


function dumpEngineersToJson () {

  return allJson(models.Engineer)()
    .then(writeFile(engineersJsonPath));

}


function getModels () {

  return models;

}


export default function setup () {

  return recreateEmptyDatabase()
    .then(addEngineersToDatabase)
    .then(removeEngineersJson)
    .then(dumpEngineersToJson)
    .then(getModels);

}

