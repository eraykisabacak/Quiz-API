const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserAnswerSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    userAnswer: [
        {
            quizId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Quiz'
            },
            questionId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Question'
            },
            answerId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Answer'
            },
            success: {
                type: Boolean,
                default: false
            }
        }
    ],
    userAnsweredQuiz: [
        {
            type: mongoose.Schema.ObjectId,
            ref:"QuizId"
        }
    ]
    
});

module.exports = mongoose.model('UserAnswer', UserAnswerSchema);
