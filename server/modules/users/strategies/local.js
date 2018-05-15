'use strict'
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User')


export function passportLocal() {
    passport.use(new LocalStrategy(function (username, password, done) {

        User.findOne({ username: username }, function (err, user) {
            if (err) { return err };

            if (!user || !user.authenticate(password, user.password)) {
                return done(null, false, {
                    message: 'Invalid username or password.'
                })
            }
            return done(null, user);
        })
    }))

}