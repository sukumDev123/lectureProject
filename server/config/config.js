'use stirct';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import defaultFiles from './default/default';
import glob from 'glob';
let files = {
    models: glob.sync(defaultFiles.models)
}
export default {
    default: files,
    env: require('./env/' + process.env.NODE_ENV + '.js').default
}