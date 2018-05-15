'use strict'
import express from 'express';
import { signIn, signUp, signOut, userNow } from '../controllers/user_controller'
import { checkAuth } from '../../checkAuth';
import config from '../../../config/config';
export function userRoute() {
    
    const route = express.Router()
    route.post('/signin', signIn)
    route.post('/signup', signUp)
    route.get('/signout', signOut)
    route.get('/usernow', checkAuth, userNow)
    return route;
}