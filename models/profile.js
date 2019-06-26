//@profile model to manage data
//引入mongoose
const mongoose = require('mongoose')
    //引入Schema
const Schema = mongoose.Schema
const profileSchema = new Schema({

    date: {
        type: Date,
        default: Date.now

    },
    type: {
        type: String,

    },
    incame: {
        type: String,
        required: true
    },
    expend: {
        type: String,
        required: true
    },
    cash: {
        type: String,
        required: true
    },
    remark: {
        type: String,
    },
    describe: {
        type: String,
    }

})

//导出
module.exports = Profile = mongoose.model('frofiles', profileSchema)