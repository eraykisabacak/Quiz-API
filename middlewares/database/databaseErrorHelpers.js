const CustomError = require('../../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');
const Quiz = require('../../models/Quiz');
const Question = require('../../models/Question');

const checkQuizExist = asyncErrorWrapper(async (req, res, next) => {
    const { quiz_id } = req.params;

    const quiz = await Quiz.findById(quiz_id);

    if (!quiz) return next(new CustomError("There is no such quiz with that id", 400));

    req.quiz = await quiz;

    next();
});

const checkQuestionExist = asyncErrorWrapper(async (req, res, next) => {
    const { question_id } = req.params;

    const question = await Question.findById(question_id);

    if (!question) return next(new CustomError('There is no such question with that id', 400));

    req.question = await question;

    next();
});


module.exports = { checkQuizExist,checkQuestionExist };