'use stirct';
import http from 'http';
import { chalkF } from './config/chalk'
import https from 'https';
import { app } from './config/lib/express';
import config from './config/config';
import { MongooseConfig } from './config/lib/mongoose';
import { passportFunction } from './config/lib/passport';


MongooseConfig().then(suc => chalkF([204, 239, 64], `DB connect : ${config.env.db}`))
    .catch(err => chalkF([239, 104, 64], `Can't connect because : ${err}`))
/** start Database  */



http.createServer(app()).listen(config.env.port, () => {
    chalkF([255, 255, 255], `\tStart server env : ${process.env.NODE_ENV}`)

    chalkF([239, 206, 64], `\tStart Web site http on port : ${config.env.port}`)
});
https.createServer(app()).listen(config.env.ports, () => {
    chalkF([239, 206, 64], `\tStart Web site https on port : ${config.env.ports}`)
});

passportFunction();
/** start passport */