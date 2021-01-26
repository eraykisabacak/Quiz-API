const Quiz = require('../models/Quiz');
const Answer = require('../models/Answer');
const Question = require('../models/Question');

const asyncErrorWrapper = require('express-async-handler');
const CustomError = require('../helpers/error/CustomError');
const UserAnswers = require('../models/UserAnswers');

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
        path : 'questions createdUser',
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

const quizUserAnswered = asyncErrorWrapper(async (req, res, next) => {
    
    const { quiz_id } = req.params;
    const { userAnswers } = req.body;

    const alreadyAnswered = await UserAnswers.find({ user: req.user.id, userAnsweredQuiz: quiz_id });

    if (alreadyAnswered.length > 0) {
        return next(new CustomError("You already answered", 400));
    }

    let resUserAnswers = [];

    //let userAnswersDB = await UserAnswers.findOne({ user: req.user.id });
    let userAnswersDB = await UserAnswers.create({ user: req.user.id });
    userAnswersDB.userAnsweredQuiz = quiz_id;
    await userAnswersDB.save();
    let userAnswerId = userAnswersDB._id;
    console.log(userAnswerId);

    let object = {};

    userAnswers.forEach(async function (value, key) {
        Object.keys(value).forEach(async function (value2) {
            const question = await Question.find({ _id: value2, correctAnswers: { $in: value[value2]._id } });
            let response = {};
            const resQuestion = await Question.findById(value2).populate('correctAnswers');
            response["questionId"] = resQuestion;
            if (question.length > 0) {
                response["answer"] = 1;
                response["color"] = "success";
                let userAnswersDB = await UserAnswers.findById(userAnswerId);
                await userAnswersDB.userAnswer.push({ quizId: quiz_id, questionId: value2, answerId: value[value2]._id, success: true });
                await userAnswersDB.save();
            } else {
                response["answer"] = 0;
                response["color"] = "warning";
                let userAnswersDB = await UserAnswers.findById(userAnswerId);
                await userAnswersDB.userAnswer.push({ quizId: quiz_id, questionId: value2, answerId: value[value2]._id, success: false });
                await userAnswersDB.save();
            }
        });
    });
   
    let correctCount = 0;
    let incorrectCount = 0;
    for (const [key, value] of Object.entries(userAnswers)) {
        for (const [key2, value2] of Object.entries(value)) {
            const question = await Question.find({ _id: key2, correctAnswers: { $in: value2._id } });

            let response = {};
            const resQuestion = await Question.findById(key2).populate('correctAnswers');
            response["questionId"] = resQuestion;
            if (question.length > 0) {
                response["answer"] = 1;
                correctCount++;
                userAnswersDB.correctCount = correctCount;
                await userAnswersDB.save();
                response["color"] = "success";
            } else {
                response["answer"] = 0;
                response["color"] = "warning";
                incorrectCount++;
                userAnswersDB.incorrectCount = incorrectCount;            
                await userAnswersDB.save();
                object["success"] = 0;
            }
            resUserAnswers.push(response);
        }
    }

    return res.status(200).json({ success: true, questionAndAnswer: resUserAnswers,correctCount,incorrectCount });
});

const isJoinQuiz = asyncErrorWrapper(async (req, res, next) => { 

    const { quiz_id } = req.params;

    const alreadyAnswered = await UserAnswers.find({ user: req.user.id, userAnsweredQuiz: { "$in": quiz_id } });
    
    if (alreadyAnswered.length > 0) {
        return res.status(200).json({ success: true, isJoin: false });
    } else {
        return res.status(200).json({ success: true, isJoin: true });
    }
});

const getAllMyQuiz = asyncErrorWrapper(async (req, res, next) => { 

    const quizzes = await Quiz.find({ createdUser: req.user.id })
        .populate({
            path: 'questions',
            populate: {
                path:'correctAnswers incorrectAnswers'
            }
        })

    return res.status(200).json({ success: true, quizzes });
});

const getAllMyAnsweredQuiz = asyncErrorWrapper(async (req, res, next) => { 

    const quizzes = await UserAnswers.find({ user: req.user.id }).populate('userAnsweredQuiz');

    return res.status(200).json({ success: true, quizzes });
});

module.exports = {getSingleQuiz,addQuiz, getAllQuiz,deleteQuiz,putQuiz,quizUserAnswered,isJoinQuiz,getAllMyQuiz,getAllMyAnsweredQuiz};
