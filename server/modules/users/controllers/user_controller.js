'use strcit'
import passport from 'passport';
import jwt from 'jsonwebtoken'
import config from '../../../config/config';
const _ = require('lodash');
var whitelistedFields = ['firstname', 'lastname'];
const User = require('mongoose').model('User')

function signIn(req, res, next) {
    passport.authenticate('local', { session: false }, function (err, user, info) {
        if (err || !user) {
            res.status(400).json(
                {
                    status: 400,
                    message: 'Invalid username or password.'
                }
            )
        } else {
            user.password = undefined;
            user.salt = undefined;

            req.login(user, { session: false }, async function (err) {
                if (err) {
                    return res.status(400).json({
                        status: 400,
                        message: `You're login not success : ${err}`
                    })
                } else {

                    const token = await jwt.sign(user.toObject(), config.env.secret, { expiresIn: config.env.timeSession });
                    return res.json({ id_token: 'Bearer ' + token });

                }
            })


        }
    })(req, res, next)
}

function signUp(req, res) {
    if (!req.user) {

        let user = new User(req.body);
        user.provider = 'local'
        user.save(err => {
            if (err) {
                return res.status(400).json({
                    message: err
                })
            }
            else {
                user.password = undefined
                user.salt = undefined
                req.login(user, async err => {
                    if (err) {
                        return res.status(400).json({
                            message: "Login not success"
                        })
                    } else {
                        const token = await jwt.sign(user.toObject(), config.env.secret, { expiresIn: config.env.timeSession });
                        return res.json({ id_token: 'Bearer ' + token });
                    }
                })

            }

        })
    } else {
        return res.json({
            message: "You here !",
            status: 200
        })
    }

}
function signOut(req, res) {
    req.logout()
    res.redirect('/');
}

function userIs(req, res) {
    if (req.user) {
        let user = req.user;
        user.password = undefined;
        user.salt = undefined;
        return res.json(user);
    } else {
        return res.status(401).json({
            status: 401,
            message: req.errors
        })
    }

}

function editInfo(req, res) {



    var user = req.user;

    if (user) {
        // Update whitelisted fields only
        user = _.extend(user, _.pick(req.body, whitelistedFields));
        user.save(function (err) {
            if (err) {
                return res.status(422).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                req.login(user, async function (err) {
                    user.password = undefined;
                    user.salt = undefined;
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        const token = await jwt.sign(user.toObject(), config.env.secret);
                        return res.json({ id_token: 'Bearer ' + token });
                    }
                });
            }
        });
    } else {
        res.status(401).send({
            message: 'User is not signed in'
        });
    }




}
export { signIn, signUp, signOut, editInfo, userIs };
