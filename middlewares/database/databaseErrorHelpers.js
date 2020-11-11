const CustomError = require('../../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');
const Quiz = require('../../models/Quiz');

const checkQuizExist = asyncErrorWrapper(async (req, res, next) => {
    const { quiz_id } = req.params;

    const quiz = await Quiz.findById(quiz_id);

    if (!quiz) return next(new CustomError("There is no such quiz with that id", 400));

    req.quiz = await quiz;

    next();
})

module.exports = { checkQuizExist };