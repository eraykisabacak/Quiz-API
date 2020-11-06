const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    username: {
        type: String,
        minlength: 4,
        required: true,
        unique:true
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
        select:false
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    },
    role: {
        type: String,
    },
    createdAt: {
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema);
