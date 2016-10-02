import bodyParser from 'body-parser';
import cors from 'cors';

export default function(app){
    app.use(cors());
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({extended:true, limit: '50mb'}));
}
