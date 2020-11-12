const express = require('express');
const router = express.Router();

const {getAccessToRoute,getQuestionOwnerAccess,getQuizOwnerAccess} = require('../middlewares/authorization/auth');
const { getSingleQuestion,deleteQuestion,addQuestion,putQuestion } = require('../controllers/question');
const { checkQuizExist,checkQuestionExist } = require('../middlewares/database/databaseErrorHelpers');

router.get('/:question_id', checkQuestionExist, getSingleQuestion);
router.post('/:quiz_id',getAccessToRoute,checkQuizExist,getQuizOwnerAccess,addQuestion);
router.delete('/:question_id',[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],deleteQuestion);
router.put('/:question_id', getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess, putQuestion);

module.exports = router;