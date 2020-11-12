const asyncErrorWrapper = require('express-async-handler');
const CustomError = require('../helpers/error/CustomError');
const Question = require('../models/Question');

const getSingleQuestion = (req, res, next) => {
    res.status(200).json({
        success: true,
        question: req.question
    });
}

const deleteQuestion = asyncErrorWrapper(async (req, res, next) => {

    const { question_id } = req.params;

    const question = await Question.findById(question_id);

    await question.remove();

    res.status(200).json({
        success: true,
        message: "Delete Question Succesfull"
    });
});

module.exports = { getSingleQuestion, deleteQuestion }