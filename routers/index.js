const express = require('express');
const router = express.Router();

const auth = require('./auth');
const quiz = require('./quiz');
const question = require('./question');

router.use('/auth',auth);
router.use('/quiz',quiz);
router.use('/question',question);

module.exports = router;