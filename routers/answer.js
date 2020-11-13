const express = require('express');
const router = express.Router();

const { addAnswer } = require('../controllers/answer');
const { getAccessToRoute, getQuestionOwnerAccess } = require('../middlewares/authorization/auth');
const { checkQuestionExist } = require('../middlewares/database/databaseErrorHelpers');

router.post('/:question_id', getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess,addAnswer);

module.exports = router;