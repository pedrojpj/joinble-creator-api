import bodyParser from 'body-parser';
import cors from 'cors';
import config from '~/src/lib/config';
import passport from 'passport';

import { SecureService } from '~/src/lib/services';
import { UserModel } from '~/src/lib/models/user';

const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;

export default function(app){
    app.use(cors());
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({extended:true, limit: '50mb'}));

    passport.use(new jwtStrategy({
        jwtFromRequest: extractJwt.fromAuthHeader(),
        secretOrKey: config.secret
    }, async (jwtPayload, done) => {

        let user = await UserModel.findOne({_id: jwtPayload.id});

        if (user) {
            done(null, user);
        } else {
            done(null, true);
        }

    }))

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    app.use(passport.initialize());

}
