'use stirct';

import defaultFiles from './default/default';
import  glob from 'glob';
let envNow = require('./env/'+process.env.NODE_ENV+'.js');
let files = {
    models : glob.sync(defaultFiles.models)
}
export default {
    default : files,
    env : envNow.default
}