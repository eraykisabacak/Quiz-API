const express = require('express');
const router = express.Router();

const { getAccessToRoute,getQuizOwnerAccess } = require('../middlewares/authorization/auth');
const { getSingleQuiz, addQuiz,getAllQuiz,deleteQuiz,putQuiz,quizUserAnswered, isJoinQuiz,getAllMyQuiz,getAllMyAnsweredQuiz,getQuizAnsweredUsersAndAnswers } = require('../controllers/quiz');
const { checkQuizExist } = require('../middlewares/database/databaseErrorHelpers');

router.post('/', getAccessToRoute, addQuiz);
router.get('/',getAllQuiz);
router.get('/myQuiz',getAccessToRoute,getAllMyQuiz);
router.get('/myAnsweredQuiz',getAccessToRoute,getAllMyAnsweredQuiz);
router.get('/:quiz_id', checkQuizExist, getSingleQuiz);
router.delete('/:quiz_id', getAccessToRoute, checkQuizExist, getQuizOwnerAccess, deleteQuiz);
router.put('/:quiz_id', getAccessToRoute, checkQuizExist, getQuizOwnerAccess, putQuiz);
router.post('/userAnswer/:quiz_id', getAccessToRoute, checkQuizExist, quizUserAnswered);
router.get('/userAnswer/:quiz_id', getAccessToRoute, checkQuizExist, isJoinQuiz);
router.get('/quizUserAnswersAndAnswer/:quiz_id', getAccessToRoute, checkQuizExist, getQuizAnsweredUsersAndAnswers);

module.exports = router;