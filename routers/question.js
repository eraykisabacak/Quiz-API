const express = require('express');
const router = express.Router();

const { getSingleQuestion } = require('../controllers/question');
const { checkQuestionExist } = require('../middlewares/database/databaseErrorHelpers');

router.get('/:question_id', checkQuestionExist,getSingleQuestion);


module.exports = router;