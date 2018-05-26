'use strict'

import mongoose from 'mongoose'
import crypto from 'crypto';
const Schema = mongoose.Schema
const owasp = require('owasp-password-strength-test')
owasp.config({
    allowPassphrases: true,
    maxLength: 128,
    minLength: 10,
    minPhraseLength: 20,
    minOptionalTestsToPass: 4,
});

const userSchema = new Schema({
    firstname: {
        type: String,
        required: 'Please required lastname'

    },
    lastname: {
        type: String,
        required: 'Please required lastname'
    },
    username: {
        type: String,
        required: "Please required username.",
        unique: true
    },
    password: {
        type: String,
        required: "Please required password"
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider .'
    },
    providerId: String,
    providerData: {},
    create_at: {
        type: Date,
        default: Date.now
    },
    roles : {
        type:String ,
        default : 'user'
    }

})

userSchema.pre('save', function (next) {
    if (this.password && this.isModified('password') ) {
            this.salt = crypto.randomBytes(256).toString('base64');
            this.password = this.hashPassword(this.password);
    }
    next();
})

userSchema.methods.hashPassword = function (password) {

    if (password && this.salt) {
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
    }

}
userSchema.methods.authenticate = function (password, userpassword) {

    return this.password === this.hashPassword(password);


}

mongoose.model('User', userSchema)
