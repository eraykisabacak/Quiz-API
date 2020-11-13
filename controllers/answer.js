const asyncErrorWrapper = require('express-async-handler');
const CustomError = require('../helpers/error/CustomError');

const Answer = require('../models/Answer');
const Question = require('../models/Question');

const addAnswer = asyncErrorWrapper(async (req, res, next) => { 

    const { question_id } = req.params;

    if (!req.body.answer || !req.body.correct) return next(new CustomError("Answer and correct is required", 403));

    const { answer,correct } = req.body; 

    const answerCreated = await Answer.create({ answer: answer, createdUser: req.user.id });
    
    const question = await Question.findById(question_id);

    if (correct) {
        console.log("Doğru", correct);
        question.correctAnswers.push(answerCreated)
        question.save();
    } else {
        console.log("Yanlış", correct);
        question.incorrectAnswers.push(answerCreated);
        question.save();            
    }
    
    res.status(200).json({success:true,question})

});

const putAnswer = asyncErrorWrapper(async (req, res, next) => { 
    const { answer_id } = req.params;

    if (!req.body.answer) return next(new CustomError("Answer is required", 403));
    
    const { answer, correct } = req.body;

    const answerPut = await Answer.findById(answer_id);

    if (req.body.answer) answerPut.answer = answer;

    answerPut.save();

    res.status(200).json({success:true,answer:answerPut})
});

module.exports = {addAnswer,putAnswer};
