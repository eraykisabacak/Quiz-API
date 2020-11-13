const Quiz = require('../models/Quiz');
const Answer = require('../models/Answer');
const Question = require('../models/Question');

const asyncErrorWrapper = require('express-async-handler');
const CustomError = require('../helpers/error/CustomError');

const getSingleQuiz = asyncErrorWrapper(async (req, res, next) => { 
    const quiz = await Quiz.findById(req.quiz.id).populate({
        path: 'questions',
        populate: {
            path: 'correctAnswers incorrectAnswers'
        }
    });
    res.status(200).json({success:true,quiz:quiz})
});

const addQuiz = asyncErrorWrapper(async (req, res, next) => { 
    const { name,questions } = req.body;

    // Quiz Created
    const quiz = await Quiz.create({ name: name, createdUser:req.user.id });
    const quizId = await quiz.id;

    await questions.forEach(async (question) => {

        // Question Created
        const questionArray = await Question.create({ questionContent: question.questionContent,createdUser:req.user.id });
        const quizAddQuestion = await Quiz.findById(quizId);
        // Question Added To Quiz
        await quizAddQuestion.questions.push(questionArray.id);
        await quizAddQuestion.save();

        // Correct Answer Added To Question
        question.correctAnswers.forEach(async function (correct, index) { 
            const answerArray = await Answer.create({ answer: correct.answer,createdUser:req.user.id });
            const questionAddAnswer = await Question.findById(questionArray.id);
            await questionAddAnswer.correctAnswers.push(answerArray.id);
            await questionAddAnswer.save();
        });

        // InCorrect Answer Added To Question
        question.incorrectAnswers.forEach(async function (inCorrect, index) {
            const answerArray = await Answer.create({ answer: inCorrect.answer,createdUser:req.user.id });
            const questionAddAnswer = await Question.findById(questionArray.id);
            await questionAddAnswer.incorrectAnswers.push(answerArray.id);
            await questionAddAnswer.save();
        });
    });

    // Response Quiz ID 
    res.status(200).json({success:true,quizId});
});

const getAllQuiz = asyncErrorWrapper(async (req, res, next) => {
    
    const quizs = await Quiz.find().populate({
        path : 'questions',
            populate : {
                path : 'correctAnswers incorrectAnswers'
            }
    });

    if (!quizs) return next(new CustomError("There is not quiz", 400));

    res.status(200).json({ success: true, quizs });

});

const deleteQuiz = asyncErrorWrapper(async (req, res, next) => {
    
    const { quiz_id } = req.params;

    const quiz = await Quiz.findById(quiz_id);

    await quiz.remove();

    return res.status(200).json({ success: true, message: 'Delete Quiz Succesfull' });
})

const putQuiz = asyncErrorWrapper(async (req, res, next) => {
    
    const { quiz_id } = req.params;

    const quiz = await Quiz.findById(quiz_id);

    if (!req.body.name) return next(new CustomError("Name is required", 403));
    
    quiz.name = req.body.name;
    await quiz.save();

    return res.status(200).json({ success: true, message: 'Put Quiz Succesfull',quiz });
})

module.exports = {getSingleQuiz,addQuiz, getAllQuiz,deleteQuiz,putQuiz};
