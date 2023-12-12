const { application } = require("express");
const express = require('express');
const {Router} = require ('express');
const feedbackController = require('../controllers/feedbackController');
const feedbackRouter = Router();

feedbackRouter.get('/retrievefeedback', feedbackController.getFeedback);
feedbackRouter.post('/addfeedback', feedbackController.postFeedback);
feedbackRouter.delete('/deletefeedback/:feedbackId', feedbackController.deleteFeedback);
feedbackRouter.put('/updatefeedback', feedbackController.putFeedback);

module.exports = feedbackRouter;

