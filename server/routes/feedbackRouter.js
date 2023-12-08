const { application } = require("express");
const express = require('express');
const {Router} = require ('express');
const feedbackController = require('../controllers/feedbackController');
const feedbackRouter = Router();
const app = express();

app.get('/', feedbackController.getFeedback);

feedbackRouter.get('/retrievefeedback', feedbackController.getFeedback);
feedbackRouter.post('/addfeedback', feedbackController.postFeedback);
feedbackRouter.delete('/deletefeedback', feedbackController.deleteFeedback);
feedbackRouter.put('/updatefeedback', feedbackController.putFeedback);

module.exports = feedbackRouter;

