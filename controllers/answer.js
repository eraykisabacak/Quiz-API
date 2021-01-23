const asyncErrorWrapper = require('express-async-handler');
const CustomError = require('../helpers/error/CustomError');

const Answer = require('../models/Answer');
const Question = require('../models/Question');

const addAnswer = asyncErrorWrapper(async (req, res, next) => { 

    const { question_id } = req.params;

    if (!req.body.answers[0].answer || (req.body.answers[0].correct != 1 && req.body.answers[0].correct != 0)) return next(new CustomError("Answer and correct is required", 403));

    req.body.answers.forEach(async function (item, index) {

       // if (!req.body.answers[index].answer || !req.body.answers[index].correct) return next(new CustomError("Answer and correct is required", 403));
        
        const { answer, correct } = req.body.answers[index];

        const answerCreated = await Answer.create({ answer: answer, createdUser: req.user.id });
        
        const question = await Question.findById(question_id);

        if (correct) {
            console.log("Doğru", correct);
            await question.correctAnswers.push(answerCreated)
            await question.save();
        } else {
            console.log("Yanlış", correct);
            await question.incorrectAnswers.push(answerCreated);
            await question.save();
        }
    });

    res.status(200).json({success:true})

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

const deleteAnswer = asyncErrorWrapper(async (req, res, next) => { 
    const { answer_id } = req.params;

    const answer = await Answer.findById(answer_id);
    const answerId = answer.id;

    answer.remove();

    const questionAnswerDelete = await Question.find({ $or: [{ correctAnswers: answerId }, { incorrectAnswers: answerId }] })
    
    const question = questionAnswerDelete[0];

    if (question.correctAnswers.indexOf(answerId) > -1) {
        const index = question.correctAnswers.indexOf(answerId);
        question.correctAnswers.splice(index,1);
        await question.save();
    } else {
        const index = question.incorrectAnswers.indexOf(answerId);
        question.incorrectAnswers.splice(index,1);
        await question.save();
    }

    res.status(200).json({ success: true, message: "Delete Answer successfull" });
});

const getAnswer = asyncErrorWrapper(async (req, res, next) => { 
    const { answer_id } = req.params;

    const answer = await Answer.findById(answer_id);

    res.status(200).json({ success: true, answer });

});


module.exports = {addAnswer,putAnswer,deleteAnswer,getAnswer};
