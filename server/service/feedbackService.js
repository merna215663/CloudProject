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
            comments: feedbackInfo.comments
        });

        const createdFeedback = await feedbackk.save();
        return createdFeedback;
    } catch (err){
        throw new Error ('Could not create feedback.');
    }
};

module.exports.deleteFeedback = async (feedbackId) => {

    try{
        const deletedfeedbackk =  await FeedbackModel.findByIdAndDelete(feedbackId);
        
        if(!deletedfeedbackk){
            throw new Error('Feedback not found')
        }
        return{success:true,message:'Feedback Deleted successfully'};
    } catch (err){
        throw new Error ('Error deleting feedback.');
    }
};

module.exports.updateFeedback = async (name, updatedInfo) => {

    try{
        const updatedFeedback = await FeedbackModel.findOneAndUpdate({name}, updatedInfo, {new: true});
        
        if(!updatedFeedback){
            throw new Error('Feedback not found')
        }
        
        return updatedFeedback;
    } catch (err){
        throw new Error ('Error updating feedback.');
    }
};