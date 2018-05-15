'use stirct';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
import http from 'http';
import https from 'https';
import { app } from './config/lib/express';
import config from './config/config';
import { MongooseConfig } from './config/lib/mongoose';
import { passportFunction } from './config/lib/passport';


MongooseConfig().then(suc => console.log(`DB connect : ${config.env.db}`)).catch(err => console.log(`Can't connect because : ${err} `))
/** start Database  */



http.createServer(app()).listen(config.env.port, () => {
    console.log(`Start Web site http on port : ${config.env.port}`)
});
https.createServer(app()).listen(config.env.ports, () => {
    console.log(`Start Web site https on port : ${config.env.ports}`)
});

passportFunction();
/** start passport */