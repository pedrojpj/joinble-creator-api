import bodyParser from 'body-parser';
import cors from 'cors';
import config from '~/src/lib/config';
import passport from 'passport';

import { SecureService, JsonService } from '~/src/lib/services';
import { UserModel } from '~/src/lib/models/user';
import { TokenModel } from '~/src/lib/models/token';

const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;

export default function(app){
    app.use(cors());
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({extended:true, limit: '50mb'}));

    passport.use(new jwtStrategy({
        jwtFromRequest: extractJwt.fromAuthHeader(),
        passReqToCallback: true,
        secretOrKey: config.secret,
        ignoreExpiration: true
    }, (request, jwtPayload, done) => {

        let jwtToken = request.headers.authorization.replace('JWT ', '');
        let user = null;
        let token = null;

        return SecureService.verifyToken(jwtToken, jwtPayload.id)
            .then((response) => {
                return TokenModel.findOne({token: jwtToken});
            })
            .then((response) => {
                token = response;
                return UserModel.findOne({_id: jwtPayload.id});
            })
            .then((response) => {
                user = response;
                done(null, user);
            })
            .catch((response) => {
                done(null, false);
            })

    }))

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    app.use(passport.initialize());

    app.all('*', function(req, res, next) {
        passport.authenticate('jwt', function(err, user, info) {
            if (err) return next(err);
            if (user) {
                req.user = user;
            }

            next();


        })(req, res, next);
    });

}
