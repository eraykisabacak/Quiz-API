const express = require('express');
const router = express.Router();

const auth = require('./auth');
const quiz = require('./quiz');
const question = require('./question');
const answer = require('./answer');

router.use('/auth',auth);
router.use('/quiz',quiz);
router.use('/question', question);
router.use('/answer', answer);

module.exports = router;