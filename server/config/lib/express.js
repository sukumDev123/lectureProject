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
const methodOverride = require('method-override')
function sessionFunction(express_s) {




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


}

function viewEngine(express_s) {
    express_s.set('views', './');
    express_s.set('view engine', 'ejs');
    express_s.use(express.static('dist'));
}
function routerFunction(express_s) {
    const test = express.Router()
    const { userRoute } = require(path.resolve('./modules/users/routes/user_route'))
    const { lectureRoute } = require(path.resolve('./modules/lecture/routes/lecture_route'))

    
    express_s.use('/api/auth', userRoute())
    express_s.use('/api/lecture', lectureRoute())
    express_s.get('*' , (req,res) => {
        res.sendFile(path.resolve('./dist/index.html') )
    })
}
function middlewareF(express_s) {
    express_s.use(cookieParser())

    express_s.use(bodyParser.urlencoded({
        extended: true
    }));
    express_s.use(bodyParser.json());
    express_s.use(methodOverride())
    express_s.use(logErrors)
    express_s.use(clientErrorHandler)
    express_s.use(errorHandler)

    express_s.use(function (req, res, next) {

        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
        next();
    });


}
function app() {
    const express_lib = express();
    if (process.env.NODE_ENV == 'development') {
        express_lib.use(morgan());
    }
    /** session set express and passport  */
    sessionFunction(express_lib);

    middlewareF(express_lib);

    /** engine set */
    viewEngine(express_lib);
    /** route for view template */
    routerFunction(express_lib);


    return express_lib;
}

export { app };

function logErrors(err, req, res, next) {
    console.error(err.stack)
    next(err)
}
function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' })
    } else {
        next(err)
    }
}
function errorHandler(err, req, res, next) {
    res.status(500)
    res.render('error', { error: err })
}
