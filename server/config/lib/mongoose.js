'use strict'


import mongoose from 'mongoose';
import config from '../config';
import path from 'path';
function modelsFunction(){
    config.default.models.forEach(route => {
        require(path.resolve(route))
        console.log(route)
    })
}

export async function MongooseConfig() {
    let connect = mongoose.connect(config.env.db)
    mongoose.set('debug' , config.env.debug);
    modelsFunction()
    return await connect;


}