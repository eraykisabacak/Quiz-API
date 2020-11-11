const asyncErrorWrapper = require('express-async-handler');
const CustomError = require('../helpers/error/CustomError');

const getSingleQuestion = (req, res, next) => {
    res.status(200).json({
        success: true,
        question: req.question
    });
}

module.exports = { getSingleQuestion }