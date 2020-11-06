const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    answer: {
        type: String,
        required:true
    },
    question_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Question",
        required:true
    }
});

module.exports = mongoose.model('Answer', AnswerSchema);