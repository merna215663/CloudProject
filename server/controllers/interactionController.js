const interactionService = require('../service/interactionService');
const productService = require('../service/productService');
const transactionService = require('../service/transactionService');
const emailService = require('../service/emailService');
//const io = require('../socket'); // Import the Socket.io instance

//updated
module.exports.handleChatMessage=async(io,socket,message)=>{
   try {
      
      await interactionService.handleChatMessage(io, socket, message);
      socket.emit('chatMessageAcknowledgment', 'Message received successfully');
    } catch (error) {
      console.error('Error handling chat message in controller:', error);
      socket.emit('chatMessageError', 'Error handling chat message'); 
   }
};

module.exports.trackProgress=async (req, res) => {
   try {
     const { orderId } = req.params;
     const progress = await interactionService.trackProgress(orderId);
     res.status(200).json({ progress });
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 };
 
   module.exports.updateShippingStatus=async (req, res) => {
      try {
        const { orderId } = req.params;
        const { newShippingStatus } = req.body;
        const updatedInteraction = await interactionService.updateShippingStatus(orderId, newShippingStatus);
        res.status(200).json({ updatedInteraction });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
 
   module.exports.updatePaymentStatus=async (req, res) => {
      try {
        const { orderId } = req.params;
        const { newPaymentStatus } = req.body;
        const updatedInteraction = await interactionService.updatePaymentStatus(orderId, newPaymentStatus);
        res.status(200).json({ updatedInteraction });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
 
   module.exports.confirmDelivery= async (req, res) => {
      try {
        const { orderId } = req.params;
        const { newdeliveryConfirmation } = req.body;
        const updatedInteraction = await interactionService.confirmDelivery(orderId,newdeliveryConfirmation);
        res.status(200).json({ updatedInteraction });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

/*
// Progress Tracking

module.exports.updateItemProgress = async (req, res) => {
  try {
     const { itemId } = req.params;
     const { newProgress } = req.body;
 
     if (!newProgress) {
       return res.status(400).json({ error: 'newProgress is required' });
     }
 
     const updatedProgress = interactionService.updateItemProgress(itemId, newProgress);
     res.status(200).json({ success: true, progress: updatedProgress });
  } catch (err) {
     res.status(500).json({ error: err.message });
  }
 };

 module.exports.getItemProgress = async (req, res) => {
  try {
     const { itemId } = req.params;
     const progress = interactionService.getItemProgress(itemId);
     res.status(200).json({ progress });
  } catch (err) {
     res.status(500).json({ error: err.message });
  }
 };

// Transaction Chat

module.exports.sendNotification = async (req, res) => {
  try {
     const { userId } = req.body;
     const { notificationType } = req.body;
 
     if (!notificationType) {
       return res.status(400).json({ error: 'notificationType is required' });
     }
 
     // Add logic to determine the notification message based on notificationType
     const notificationMessage = 'Notification message goes here';
     await emailService.sendNotificationEmail(userId, 'New Notification', notificationMessage);
 
     res.status(200).send({ msg: 'Notification sent successfully' });
  } catch (err) {
     res.status(500).send({ error: err.message });
  }
 };
 
 // Search and Filter
 module.exports.searchProducts = async (req, res) => {
  try {
     const { searchTerm } = req.query;
 
     if (!searchTerm) {
       return res.status(400).json({ error: 'searchTerm is required' });
     }
 
     const searchResults = await productService.searchProducts(searchTerm);
     res.status(200).send({ results: searchResults });
  } catch (err) {
     res.status(500).send({ error: err.message });
  }
 };*/


