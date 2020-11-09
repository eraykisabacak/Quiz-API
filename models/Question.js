const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    questionContent: {
        type: String,
        required: true,
        minlength: 5,
    },
    correctAnswers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Answer"
        }
    ],
    incorrectAnswers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Answer"
        }
    ],
});

module.exports = mongoose.model('Question', QuestionSchema);