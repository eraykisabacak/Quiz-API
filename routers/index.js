const express = require('express');
const router = express.Router();

const user = require('./user');
const auth = require('./auth');
const quiz = require('./quiz');

router.use('/user',user);
router.use('/auth',auth);
router.use('/quiz',quiz);

module.exports = router;