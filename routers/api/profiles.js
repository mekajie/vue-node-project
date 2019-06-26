//@manage date api
const express = require('express')
    //引入数据model
const Profile = require('../../models/profile')
    //引入加密的passport
const passport = require('passport')

// $ app  Get /api/prpfiles/test
// @ desc 返回json数据
const app = express.Router()
app.get('/test', (req, res) => {
    res.send('succeed')
});

// $ app POst /api/profiles/add
// @ desc 添加数据信息 private
app.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const profileFiles = {}
    if (req.body) {
        profileFiles.type = req.body.type,
            profileFiles.incame = req.body.incame,
            profileFiles.expend = req.body.expend,
            profileFiles.cash = req.body.cash,
            profileFiles.describe = req.body.describe,
            profileFiles.remark = req.body.remark
    }
    new Profile(profileFiles).save()
        .then(profile => {
            res.send(profile)
        })
});

// $ app Get /api/profiles/
// @ desc 获取所有的信息并返回 private
app.get('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.find()
            .then((profiles) => {
                if (!profiles) {
                    return res.status(404).send('没有任何内容')
                }
                res.send(profiles)
            }).catch((err) => {
                res.status(404).send(err)
            });
    });

// $ app Get /api / profiles /
// @ desc 获取所有的信息并返回 private
app.get('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.find()
            .then((profiles) => {
                if (!profiles) {
                    return res.status(404).send('没有任何内容')
                }
                res.send(profiles)
            }).catch((err) => {
                res.status(404).send(err)
            });
    });
// $ app Get /api/profiles/:id
// @ desc 获取单个信息并返回 private
app.get('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ _id: req.params.id })
            .then((profiles) => {
                if (!profiles) {
                    return res.status(404).send('查询不存在')
                }
                res.send(profiles)
            }).catch((err) => {
                res.status(404).send(err)
            });
    });

// $ app POst /api/profiles/edit/:id
// @ desc 更新数据信息 private
app.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const profileFiles = {}
    if (req.body) {
        profileFiles.type = req.body.type,
            profileFiles.incame = req.body.incame,
            profileFiles.expend = req.body.expend,
            profileFiles.cash = req.body.cash,
            profileFiles.describe = req.body.describe,
            profileFiles.remark = req.body.remark
    }
    Profile.findOneAndUpdate({ _id: req.params.id }, { $set: profileFiles }, { new: true }).then(profile => {
        if (profile) {
            res.send(profile)
        }
        res.status(404).send('更新失败！')
    })
});
// $ app delete /api/profiles/deletee/:id
// @ desc 删除单个信息并返回 private
app.delete('/delete/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOneAndRemove({ _id: req.params.id })
            .then((profile) => {
                profile.save().then(profile => res.send(profile))
            }).catch((err) => {
                res.status(404).send(err)
            });
    });




module.exports = app