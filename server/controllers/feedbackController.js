const feedbackService = require('../service/feedbackService');

//retrieve feedback
module.exports.getFeedback = async (req, res) => {

    try{

        const feedbacks = await feedbackService.findAllFeedbacks();
        res.send ({feedbacks });
    } catch(err) {

        res.status(500);
        res.send ({
            error: err
        });
    }
};

//add feedback
module.exports.postFeedback = async (req, res) => {
const feedbackInfo={
    name:req.body.name,
    email:req.body.email,
    feedbackType:req.body.feedbackType,
    comments:req.body.comments
};

    try{

        const createdFeedback = await feedbackService.addNewFeedback(feedbackInfo);
        return res.status(201).send ({
            msg:'Feedback created successfully' ,
            feedbackID: createdFeedback._id
        });
    } catch(err) {

       return res.status(500).send({
        error: err.message
       });
       
    }
};

//delete feedback
module.exports.deleteFeedback=async(req,res) => {
    const {name} = req.params;

    try{

          const deletedFeedback= await feedbackService.deleteFeedback(name);
          return res.json({message: 'feedback deleted successfully', deletedFeedback});
    }catch(error){
        console.error(error);
        return res.status(404).json({error: error.message});
    }
};

