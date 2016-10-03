import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import uuid from 'node-uuid';

export default function(app){
    app.use(cors());
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({extended:true, limit: '50mb'}));

    app.use(session({
        genid: function(req) {
            return uuid.v4();
        },
        secret: 'Z3]GJW!?9uP”/Kpe',
        resave: true,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());
}
