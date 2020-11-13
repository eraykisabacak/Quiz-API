const express = require('express');
const router = express.Router();

const { addAnswer,putAnswer,deleteAnswer,getAnswer } = require('../controllers/answer');
const { getAccessToRoute, getQuestionOwnerAccess,getAnswerOwnerAccess } = require('../middlewares/authorization/auth');
const { checkQuestionExist,checkAnswerExist } = require('../middlewares/database/databaseErrorHelpers');

router.get('/:answer_id',getAccessToRoute, checkAnswerExist, getAnswerOwnerAccess, getAnswer)
router.post('/:question_id', getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess,addAnswer);
router.put('/:answer_id', getAccessToRoute, checkAnswerExist, getAnswerOwnerAccess, putAnswer);
router.delete('/:answer_id', getAccessToRoute, checkAnswerExist, getAnswerOwnerAccess, deleteAnswer);

module.exports = router;