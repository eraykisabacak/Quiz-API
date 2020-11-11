const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Answer = require('./Answer');
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
    createdUser: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
});

QuestionSchema.post('remove', async function () {
    await this.correctAnswers.forEach(async function (element) { 
        const answer = await Answer.findById(element);
        await answer.remove();
    }); 
    await this.incorrectAnswers.forEach(async function (element) { 
        const answer = await Answer.findById(element);
        await answer.remove();
    }); 
})

module.exports = mongoose.model('Question', QuestionSchema);