const User = require('../models/User');
const asyncErrorWrapper = require('express-async-handler');
const bcrypt = require('bcrypt')

const CustomError = require('../helpers/error/CustomError');

const { sendToJWTToToken } = require('../helpers/authorization/tokenHelpers');

const login = asyncErrorWrapper(async (req, res, next) => {
    
    const { email, password } = req.body;

    if (!email && !password) return next(new CustomError("Email and Password required", 400));

    const user = await User.findOne({ email }).select("+password");

    console.log(user);

    if (!bcrypt.compareSync(password, user.password)) return next(new CustomError("Please Check Your Credentials", 400));

    sendToJWTToToken(user,res)
});

const logout = asyncErrorWrapper(async (req, res, next) => {
    const {NODE_ENV } = process.env;

    return res.status(200).cookie({
        httpOnly: true,
        expires: new Date(Date.now()),
        secure:NODE_ENV=='development' ? false : true
    }).json({
        success: true,
        message:"Logout Successfull"
    })
})

const register = asyncErrorWrapper(async (req, res, next) => {
    
    const { email, username, password,role } = req.body;
    const user = await User.create({ email, username, password, role });
    
    sendToJWTToToken(user, res);
});

const tokentest = asyncErrorWrapper(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Welcome"
    })
});

const getLoggedInUser = async (req, res, next) => {
    res.status(200).json({
        success: true,
        data:req.user
    })
}; 

module.exports = {login, register, tokentest,getLoggedInUser,logout};
