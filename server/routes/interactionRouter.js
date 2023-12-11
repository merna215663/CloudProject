const express = require('express');
const router = express.Router();
const itemProgressController = require('../controllers/interactionController');
/*
router.get('/getItemProgress/:itemId', itemProgressController.getItemProgress);
router.put('/updateItemProgress/:itemId', itemProgressController.updateItemProgress);
router.get('/search', itemProgressController.searchProducts);
router.post('/sendnotification', itemProgressController.sendNotification);
*/
//updated

router.post('/chatMessage',itemProgressController.handleChatMessage);
router.get('/track/:orderId', itemProgressController.trackProgress);
router.put('/updateShippingStatus/:orderId', itemProgressController.updateShippingStatus);
router.put('/updatePaymentStatus/:orderId', itemProgressController.updatePaymentStatus);
router.put('/confirmDelivery/:orderId', itemProgressController.confirmDelivery);
module.exports = router;