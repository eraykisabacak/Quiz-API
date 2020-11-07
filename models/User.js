const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true,"Please provide a email"],
        unique: true,
         match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            'Please provide a valid email',
        ],
    },
    username: {
        type: String,
        minlength: [4,'Please provide a username min length 4'],
        required: [true,"Please provide a username"],
        unique:true
    },
    password: {
        type: String,
        minlength: [6,'Please provide a password min length 6'],
        required: [true,"Please provide a email"],
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
        default: "user",
        enum: ['user', 'admin']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            this.password = hash;
            next();
        })
    })
});

UserSchema.methods.generateJWTFromUser = function () {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;

    const payload = {
        id: this._id,
        username: this.username
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE });

    return token;
}

module.exports = mongoose.model('User', UserSchema);
