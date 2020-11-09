const express = require('express');
const router = express.Router();

const { getSingleQuiz,addQuiz } = require('../controllers/quiz');

router.get('/:id',getSingleQuiz);
router.post('/',addQuiz);

module.exports = router;