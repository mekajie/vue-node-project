//@login register api
const express = require('express')
    //引入数据库model
const User = require('../../models/User')
    //引入第三方加密模块给password进行加密
const bcrypt = require('bcrypt');
//引入第三方gravatar获取邮箱的头像
const gravatar = require('gravatar');
//引入带三方token
const jwt = require('jsonwebtoken');
//引入passport
const passport = require('passport')
    //引入keys
const privateKey = require('../../config/keys').privateKey
const router = express.Router();

// $ route /api/users/test
// @ desc 返回json数据
// router.get('/test', (req, res) => {
//     res.send({ msg: 'succeed' })
// });

//$ route /api/users/register
//@desc 注册的接口
router.post('/register', (req, res) => {

    //查询数据库中邮箱是否被注册
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).send({ msg: "邮箱已经被注册！" })
            } else {
                const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar,
                    identity: req.body.identity
                })
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) return
                        newUser.password = hash
                        newUser.save()
                            .then((user) => {
                                res.send(user)
                            })
                            .catch(err => {
                                res.send(err)
                            })
                    });
                });
            }
        })
});
//$ route /api/users/login
//@desc 登录的接口，返回token
router.post('/login', (req, res) => {
    //获取登录是的邮箱和密码
    const email = req.body.email
    const password = req.body.password
        //查询数据库，检查邮箱是否存在
    User.findOne({ email })
        .then((user) => {
            if (!user) { //判断user是否存在
                res.status(404).send('用户不存在')
            } else {
                //检查密码
                bcrypt.compare(password, user.password)
                    .then((isMatch) => {
                        if (isMatch) {
                            const rule = {
                                id: user._id,
                                name: user.name,
                                identity: user.identity,
                                email: user.email,
                                avatar: user.avatar
                            }
                            jwt.sign(rule, privateKey, { expiresIn: 7200 },
                                (err, token) => {
                                    if (err) throw err
                                    res.send({
                                        succeed: true,
                                        token: 'Bearer ' + token
                                    })
                                });

                        } else {
                            res.status(404).send('密码错误')
                        }
                    })
            }
        })
});
//$ route /api/users/current
//@desc 测试token的验证，验证token然后返回数据
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    })
});


module.exports = router