const express = require('express');
const router = express.Router();

const {getAccessToRoute,getQuestionOwnerAccess} = require('../middlewares/authorization/auth');
const { getSingleQuestion,deleteQuestion } = require('../controllers/question');
const { checkQuestionExist } = require('../middlewares/database/databaseErrorHelpers');

router.get('/:question_id', checkQuestionExist,getSingleQuestion);
router.delete('/:question_id',[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],deleteQuestion)

module.exports = router;