//@user model to login and register
//引入mongoose
const mongoose = require('mongoose')
    //引入Schema
const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now

    },
    avatar: {
        type: String
    },
    identity: {
        type: String,
        required: true
    }
})

//导出
module.exports = User = mongoose.model('users', userSchema)