const interactionService = require('../service/interactionService');
const productService = require('../service/productService');
const transactionService = require('../service/transactionService');
const emailService = require('../service/emailService');
//const io = require('../socket'); // Import the Socket.io instance

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
 };


