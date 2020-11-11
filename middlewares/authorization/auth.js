const CustomError = require('../../helpers/error/CustomError');
const jwt = require('jsonwebtoken');
const asyncErrorWrapper = require('express-async-handler');

const { isTokenIncluded,getAccessTokenFromHeader } = require('../../helpers/authorization/tokenHelpers');
const Quiz = require('../../models/Quiz');

const getAccessToRoute = (req, res, next) => {

    const { JWT_SECRET_KEY } = process.env;

    if (!isTokenIncluded(req)) {
        return next(new CustomError("You are not authorized to access this route",401))
    }

    accessToken = getAccessTokenFromHeader(req);

    jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
        if (err) return next(new CustomError("You are not authorized to access this route", 401))
        
        req.user = {
            id: decoded.id,
            username: decoded.username
        };
        
        next();
    });
};

const getQuizOwnerAccess = asyncErrorWrapper(async (req, res, next) => { 
    const { quiz_id } = req.params;
    const id = req.user.id;

    const quiz = await Quiz.findById(quiz_id);
    
    if (quiz.createdUser != id) return next(new CustomError("Only Owner Quiz Can Handle This Operation", 403))
    
    next();
});

module.exports = {getAccessToRoute,getQuizOwnerAccess}