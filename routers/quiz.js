const express = require('express');
const router = express.Router();

const { getAccessToRoute,getQuizOwnerAccess } = require('../middlewares/authorization/auth');
const { getSingleQuiz, addQuiz,getAllQuiz,deleteQuiz,putQuiz,quizUserAnswered } = require('../controllers/quiz');
const { checkQuizExist } = require('../middlewares/database/databaseErrorHelpers');

router.post('/', getAccessToRoute, addQuiz);
router.get('/',getAllQuiz);
router.get('/:quiz_id', checkQuizExist, getSingleQuiz);
router.delete('/:quiz_id', getAccessToRoute, checkQuizExist, getQuizOwnerAccess, deleteQuiz);
router.put('/:quiz_id', getAccessToRoute, checkQuizExist, getQuizOwnerAccess, putQuiz);
router.post('/userAnswer/:quiz_id',getAccessToRoute, checkQuizExist,quizUserAnswered)

module.exports = router;