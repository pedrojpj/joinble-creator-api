import passport from 'passport';
let LocalStrategy = require('passport-local').Strategy;

import { UserModel } from '~/src/lib/models/user';
import { SecureService } from '~/src/lib/services';

passport.use(new LocalStrategy(({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    async (email, password, done) => {
        password = SecureService.encodePassword(password);

        let user = await UserModel.findOne({email: email, password: password});

        if (!user) {
            throw new Error('invalid username or password');
        }
        return done();
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
