
//使用passport来验证token
//使用passport-jwt来验证token
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose')
const User = mongoose.model("users")
const keys = require('./keys')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.privateKey;
module.exports = passport => { //获取传来的passport
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // console.log(jwt_payload)
        User.findById(jwt_payload.id)
            .then((user) => {
                if (user) {
                    return done(null, user)
                }
                return done(null, false)
            })
            .catch(err => {
                console.log(err)
            })
    }))
}