const express = require('express');
const router = express.Router();

const { getAccessToRoute } = require('../middlewares/authorization/auth');
const { login, register,tokentest,getLoggedInUser } = require('../controllers/auth');

router.post('/login',login);
router.post('/register',register);
router.get('/tokentest',getAccessToRoute,tokentest);
router.get("/user", getAccessToRoute, getLoggedInUser);

module.exports = router;