//引入express框架
const express = require('express');
//引入MongoDB
const mongoose = require('mongoose')
    //引入中间件body-parser
const bodyParser = require('body-parser')
    //引入路由router.js
const users = require('./routers/api/users')
const profiles = require('./routers/api/profiles')
    //从keys.js 中取得MongoURL
const db = require('./config/keys').mongoURL
    //引入token验证的passport
const passport = require('passport')
    //实例化一个express
const app = express();

//实现与MongoDB的连接
mongoose.connect(db)
    .then(() => { console.log("mongoDb is connected") })
    .catch(err => {
        { console.log(err) }
    })
    //使用中间件body-parser
    //这个中间件必须在路由中间件之前配置
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//使用中间件router
app.use('/api/users', users)
app.use('/api/profiles', profiles)
    //实例化passport
app.use(passport.initialize());
//引入passport.js传递参数passport
require('./config/passport')(passport)
app.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});

//Run app, then load http://localhost:port in a browser to see the output.