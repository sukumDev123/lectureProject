'use strict'
const jwt = require('jsonwebtoken')
import config from '../config/config';


export async function checkAuth(req, res, next) {
    if (req.headers.authorization) {
        const auth = req.headers.authorization.split(' ')[1]
        let token = await jwt.verify(auth, config.env.secret)

        req.user.user = token
        console.log(req.user)
        next()
    } else {
        return res.status(401).json({
            'message': 'Unauthorization'
        })
    }



}