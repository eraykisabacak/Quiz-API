const express = require('express');
const router = express.Router();

const {getAccessToRoute,getQuestionOwnerAccess,getQuizOwnerAccess} = require('../middlewares/authorization/auth');
const { getSingleQuestion,deleteQuestion,addQuestion } = require('../controllers/question');
const { checkQuizExist,checkQuestionExist } = require('../middlewares/database/databaseErrorHelpers');

router.get('/:question_id', checkQuestionExist, getSingleQuestion);
router.post('/:quiz_id',getAccessToRoute,checkQuizExist,getQuizOwnerAccess,addQuestion);
router.delete('/:question_id',[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],deleteQuestion)

module.exports = router;