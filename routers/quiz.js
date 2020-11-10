const express = require('express');
const router = express.Router();

const { getAccessToRoute } = require('../middlewares/authorization/auth');
const { getSingleQuiz,addQuiz } = require('../controllers/quiz');

router.get('/:id',getSingleQuiz);
router.post('/',getAccessToRoute,addQuiz);

module.exports = router;