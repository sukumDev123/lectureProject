'use strcit'
import passport from 'passport';
import jwt from 'jsonwebtoken'
import config from '../../../config/config';
const User = require('mongoose').model('User')

function signIn(req, res, next) {
    passport.authenticate('local', { session: false }, function (err, user, info) {
        if (err || !user) {
            res.status(400).json(
                {
                    status: 400,
                    message: 'Invalid username or password.'
                }
            )
        } else {
            user.password = undefined;
            user.salt = undefined;

            req.login(user, { session: false }, async function (err) {
                if (err) {
                    return res.status(400).json({
                        status: 400,
                        message: `You're login not success : ${err}`
                    })
                } else {

                    const token = await jwt.sign(user.toObject(), config.env.secret);
                    return res.json({ id_token: 'Bearer ' + token });

                }
            })


        }
    })(req, res, next)
}

function signUp(req, res) {
    if (!req.user) {

        let user = new User(req.body);
        user.provider = 'local'
        user.save(err => {
            if (err) {
                return res.status(400).json({
                    message: err
                })
            }
            else {
                user.password = undefined
                user.salt = undefined
                req.login(user, async err => {
                    if (err) {
                        return res.status(400).json({
                            message: "Login not success"
                        })
                    } else {
                        const token = await jwt.sign(user.toObject(), config.env.secret);
                        return res.json({ id_token: 'Bearer ' + token });
                    }
                })

            }

        })
    } else {
        return res.json({
            message: "You here !",
            status: 200
        })
    }

}
function signOut(req, res) {
    req.logout()
    res.redirect('/');
}

function userIs (req,res){
    if(req.user){
        return res.json(req.user);
    }
}

function editInfo(){
    if(req.user){
        let user = req.user;
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.save(err => {
            if(err) {
                return res.status(404).json({
                    message : " You can't update your information. please try again "
                })
            }else{
                return res.json({
                    message : 'Update your information done.',
                    user : user
                })
            }
        })
    }
}
export { signIn, signUp, signOut , editInfo , userIs};
