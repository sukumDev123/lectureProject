'use strict'
const jwt = require('jsonwebtoken')
import config from '../config/config';
const User = require('mongoose').model('User')

export async function checkAuth(req, res, next) {
    if (req.headers.authorization) {
        const auth = req.headers.authorization.split(' ')[1]
        try {
            let token = await jwt.verify(auth, config.env.secret)
            User.findById(token._id).then(user => {
                req.user = user;
                next()

            }).catch(err => {
                req.errors = err;

                next();
            })
        } catch (error) {
            req.errors = error;
            next();
        }

    } else {
        next('Unauthorization')
    }


}