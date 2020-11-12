const asyncErrorWrapper = require('express-async-handler');
const CustomError = require('../helpers/error/CustomError');
const Question = require('../models/Question');
const Quiz = require('../models/Quiz');
const Answer = require('../models/Answer');

const getSingleQuestion = (req, res, next) => {
    res.status(200).json({
        success: true,
        question: req.question
    });
}

const deleteQuestion = asyncErrorWrapper(async (req, res, next) => {

    const { question_id } = req.params;

    const question = await Question.findById(question_id);

    const quiz = await Quiz.findOne({ questions: question_id });

    const index = quiz.questions.indexOf(question_id);
    quiz.questions.splice(index, 1);
    await quiz.save();

    await question.remove();

    res.status(200).json({
        success: true,
        message: "Delete Question Succesfull"
    });
});

const addQuestion = asyncErrorWrapper(async (req, res, next) => {
    
    const { quiz_id } = req.params;

    const { correctAnswers,incorrectAnswers, questionContent } = req.body;
    
    const question = await Question.create({ questionContent: questionContent,createdUser:req.user.id });
    const questionId = await question.id;

    await correctAnswers.forEach(async (correct) => { 
        const answerArray = await Answer.create({ answer: correct.answer, createdUser: req.user.id });
        const questionAddAnswer = await Question.findById(questionId);
        await questionAddAnswer.correctAnswers.push(answerArray.id);
        await questionAddAnswer.save();
    });
    
    await incorrectAnswers.forEach(async (inCorrect) => { 
        const answerArray = await Answer.create({ answer: inCorrect.answer,createdUser:req.user.id });
        const questionAddAnswer = await Question.findById(questionId);
        await questionAddAnswer.incorrectAnswers.push(answerArray.id);
        await questionAddAnswer.save();
    });

    const quizQuestionAdded = await Quiz.findById(quiz_id);
    quizQuestionAdded.questions.push(question);
    await quizQuestionAdded.save();

    res.status(200).json({ success:true,quiz:quizQuestionAdded})

});

module.exports = { getSingleQuestion, deleteQuestion,addQuestion}