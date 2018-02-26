const path = require('path');
const config = require('../../parameters.json');

config.uploadPath = path.join('./uploads/');
config.translations = ['en', 'es', 'de', 'fr', 'pt'];
config.DB_URI = process.env.MONGO_URI;
config.PORT = parseInt(process.env.PORT) || 8000;

module.exports = config;
