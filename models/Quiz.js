const mongoose = require('mongoose');
const Question = require('./Question');
const UserAnswers = require('./UserAnswers');
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    name:{
        type:String,
        require:true
    },
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

QuizSchema.post('remove', async function () {
    await this.questions.forEach(async function (element) { 
        const question = await Question.findById(element);
        await question.remove();
    }); 
    const userAnswers = await UserAnswers.findOneAndDelete({ userAnsweredQuiz: this.id });
})

module.exports = mongoose.model('Quiz', QuizSchema);
