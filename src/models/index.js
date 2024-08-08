/* eslint-disable no-undef */

import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config.js';

const basename = path.basename(new URL(import.meta.url).pathname);
const env = process.env.NODE_ENV || 'development';
const configData = config[env];
const db = {};

// Create a new Sequelize instance with configuration
const sequelize = new Sequelize(configData.url, {
    dialect: configData.dialect,
});

// Read the models directory and import each model file
const modelsDir = new URL('.', import.meta.url).pathname;
fs.readdirSync(modelsDir)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach(async (file) => {
        const model = await import(path.join(modelsDir, file));
        const modelInstance = model.default(sequelize, DataTypes);
        db[modelInstance.name] = modelInstance;
    });

// Setup associations if they exist
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
