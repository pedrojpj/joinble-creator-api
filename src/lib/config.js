import path from 'path';
import config from '~/parameters.json';

config.uploadPath = path.join('./uploads/');
config.translations = ['en', 'es', 'de', 'fr', 'pt'];

export default config;
