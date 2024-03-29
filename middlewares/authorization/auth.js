const CustomError = require('../../helpers/error/CustomError');
const jwt = require('jsonwebtoken');
const asyncErrorWrapper = require('express-async-handler');

const { isTokenIncluded,getAccessTokenFromHeader } = require('../../helpers/authorization/tokenHelpers');
const Quiz = require('../../models/Quiz');
const Question = require('../../models/Question');
const Answer = require('../../models/Answer');

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

const getQuestionOwnerAccess = asyncErrorWrapper(async (req, res, next) => {
    const { question_id } = req.params;
    const id = req.user.id;

    const question = await Question.findById(question_id);

    if (question.createdUser != id) return next(new CustomError("Only Owner Quiz Can Handle This Operation", 403));

    next();

});

const getAnswerOwnerAccess = asyncErrorWrapper(async (req, res, next) => {
    const { answer_id } = req.params;
    const id = req.user.id;

    const answer = await Answer.findById(answer_id);

    if (answer.createdUser != id) return next(new CustomError("Only Owner Answer Can Handle This Operation", 403));

    next();

 });

module.exports = {getAccessToRoute,getQuizOwnerAccess,getQuestionOwnerAccess,getAnswerOwnerAccess}