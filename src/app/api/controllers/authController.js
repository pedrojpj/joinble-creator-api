import passport from 'passport';
let LocalStrategy = require('passport-local').Strategy;

import { UserModel } from '~/src/lib/models/user';
import { SecureService } from '~/src/lib/services';

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    async (email, password, done) => {

        password = SecureService.encodePassword(password);
        let user = await UserModel.findOne({email: email, password: password});

        console.log(user);
        
        if (!user) {
            let error = 'invalid username or password';
            return done(error);
        }
        return done(null, user);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(
    async(id, done) => {

        let user = await UserModel.findOne({id: id});

        if (!user) {
            throw new Error('Invalid user');
        }

        return done(user);
    }
);

export default passport;
