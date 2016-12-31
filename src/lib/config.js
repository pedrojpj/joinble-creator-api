import path from 'path';
import config from '~/parameters.json';

config.uploadPath = path.join('./uploads/');
config.translations = ['en', 'es', 'de', 'fr', 'pt'];
config.DB_URI = process.env.MONGO_URI;
config.PORT = parseInt(process.env.PORT) || 8000;

export default config;
