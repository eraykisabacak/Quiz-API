const Quiz = require('../models/Quiz');
const Answer = require('../models/Answer');
const Question = require('../models/Question');

const asyncErrorWrapper = require('express-async-handler');

const getSingleQuiz = asyncErrorWrapper(async (req, res, next) =>{ 
    res.status(200).json({success:true})
});

const addQuiz = asyncErrorWrapper(async (req, res, next) => { 
    const { name,questions } = req.body;

    // Quiz Created
    const quiz = await Quiz.create({ name: name, createdUser:req.user.id });
    const quizId = await quiz.id;

    await questions.forEach(async (question) => {

        // Question Created
        const questionArray = await Question.create({ questionContent: question.questionContent });
        const quizAddQuestion = await Quiz.findById(quizId);
        // Question Added To Quiz
        await quizAddQuestion.questions.push(questionArray.id);
        await quizAddQuestion.save();

        // Correct Answer Added To Question
        question.correctAnswers.forEach(async function (correct, index) { 
            const answerArray = await Answer.create({ answer: correct.answer });
            const questionAddAnswer = await Question.findById(questionArray.id);
            await questionAddAnswer.correctAnswers.push(answerArray.id);
            await questionAddAnswer.save();
        });

        // InCorrect Answer Added To Question
        question.incorrectAnswers.forEach(async function (inCorrect, index) {
            const answerArray = await Answer.create({ answer: inCorrect.answer });
            const questionAddAnswer = await Question.findById(questionArray.id);
            await questionAddAnswer.incorrectAnswers.push(answerArray.id);
            await questionAddAnswer.save();
        });
    });

    // Response Quiz ID 
    res.status(200).json({success:true,quizId});
});

module.exports = {getSingleQuiz,addQuiz};
