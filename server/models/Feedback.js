const {Schema, model, trusted} = require('mongoose');

const FeedbackSchema = new Schema({
    name: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true
    },
    feedbackType: {
        type: 'String',
        required: true
    },
    comments: {
        type: 'String',
        required: true
    }
});

//an index on the 'name' field for efficient queries
//FeedbackSchema.index({ name: 1 });

const FeedbackModel = model('feedback',FeedbackSchema );

module.exports =FeedbackModel;