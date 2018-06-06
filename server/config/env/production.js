export default {
    db : `mongodb://lucture:${process.env.MONGOPASS}@ds125016.mlab.com:25016/lecture`,
    secret : 'secret_lecture_key_production',
    port : 5000,
    ports : 5001,
    debug : false
}
