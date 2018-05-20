'use strict'


import mongoose from 'mongoose';
import config from '../config';
import path from 'path';


export async function MongooseConfig() {
    let connect = mongoose.connect(config.env.db);
    mongoose.set('debug' , config.env.debug);
    require(path.resolve('./modules/users/models/user_model.js'))
    require(path.resolve('./modules/lecture/models/lecture_model.js'))
    
    return await connect;


}