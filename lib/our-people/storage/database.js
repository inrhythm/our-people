

import Sequelize from 'sequelize';


import config from './config';
import allModels from './models';


const sequelize = new Sequelize('database', '', '', config);


export default sequelize;

export const models = allModels(sequelize);
