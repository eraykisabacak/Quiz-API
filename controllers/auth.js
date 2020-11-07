const User = require('../models/User');
const asyncErrorWrapper = require('express-async-handler');
const bcrypt = require('bcrypt')

const CustomError = require('../helpers/error/CustomError');

const { sendToJWTToToken } = require('../helpers/authorization/tokenHelpers');

const login = asyncErrorWrapper(async (req, res, next) => {
    
    const { email, password } = req.body;
    console.log(email, password);

    if (!email && !password) return next(new CustomError("Email and Password required", 400));

    const user = await User.findOne({ email }).select("+password");

    console.log(user);

    if (!bcrypt.compareSync(password, user.password)) return next(new CustomError("Please Check Your Credentials", 400));

    sendToJWTToToken(user,res)
});

const register = asyncErrorWrapper(async (req, res, next) => {
    
    console.log(req.body);
    const { email, username, password,role } = req.body;
    const user = await User.create({ email, username, password, role });
    
    sendToJWTToToken(user, res);
});

module.exports = {login, register};
