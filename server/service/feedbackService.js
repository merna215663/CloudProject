const FeedbackModel = require ('../models/Feedback')

module.exports.findAllFeedbacks = async () => {

    try{
        const feedback = await FeedbackModel.find();
        return feedback;    
    } catch (err) {
        throw new Error ('Could not retieve feedbacks');
    }
};

module.exports.addNewFeedback = async (feedbackInfo) => {

    try{
        const feedbackk = new FeedbackModel({

            name: feedbackInfo.name,
            email: feedbackInfo.email,
            feedbackType:feedbackInfo.feedbackType,
            comment: feedbackInfo.comment
        });

        const createdFeedback = await feedbackk.save();
        return createdFeedback;
    } catch (err){
        throw new Error ('Could not create feedback.');
    }
};

module.exports.deleteFeedback = async (feedbackname) => {

    try{
        const deletedfeedbackk =  await feedbackk.findOneAndDelete({name});
        
        if(!deletedfeedbackk){
            throw new Error('Feedback not found')
        }
    } catch (err){
        throw new Error ('Error deleting feedback.');
    }
};