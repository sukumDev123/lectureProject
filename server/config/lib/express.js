'use strict';

import express from 'express'
import config from '../config';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import session from 'express-session'
const MongoStore = require('connect-mongo')(session)

function sessionFunction(express_s) {

    express_s.use(cookieParser())

    express_s.use(bodyParser.urlencoded({
        extended: true
    }));
    express_s.use(bodyParser.json());


    express_s.use(session({
        secret: config.env.secret,
        proxy: true,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },

        store: new MongoStore({
            mongooseConnection: mongoose.connection
        })
    }))



    express_s.use(passport.initialize());
    express_s.use(passport.session());

    //express_s.use(cors())
    express_s.use(function (req, res, next) {

        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
        next();
    });

}

function viewEngine(express_s) {
    express_s.set('views', './');
    express_s.set('view engine', 'ejs');
    express_s.use(express.static('./'));
}
function routerFunction(express_s) {
    const test = express.Router()
    const { userRoute } = require(path.resolve('./modules/users/routes/user_route'))
    express_s.use('/api/auth', userRoute())

}
function app() {
    const express_lib = express();
    if (process.env.NODE_ENV == 'development') {
        express_lib.use(morgan());
    }
    /** session set express and passport  */
    sessionFunction(express_lib);
    /** engine set */
    viewEngine(express_lib);
    /** route for view template */
    routerFunction(express_lib);


    return express_lib;
}

export { app };
