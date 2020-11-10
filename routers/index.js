const express = require('express');
const router = express.Router();

const auth = require('./auth');
const quiz = require('./quiz');

router.use('/auth',auth);
router.use('/quiz',quiz);

module.exports = router;