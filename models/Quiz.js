const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    questions: [
        {
            type: mongoose.Schema.ObjectId,
            ref:"Question"
        }
    ],
    createdUser: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Quiz', QuizSchema);
