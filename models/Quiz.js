const mongoose = require('mongoose');
const Question = require('./Question');
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

module.exports = mongoose.model('Quiz', QuizSchema);
