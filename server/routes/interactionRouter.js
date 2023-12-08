const express = require('express');
const router = express.Router();
const itemProgressController = require('../controllers/interactionController');

router.get('/getItemProgress/:itemId', itemProgressController.getItemProgress);
router.put('/updateItemProgress/:itemId', itemProgressController.updateItemProgress);
router.get('/search', itemProgressController.searchProducts);
router.post('/negotiate', itemProgressController.negotiateProduct);
router.post('/sendnotification', itemProgressController.sendNotification);

module.exports = router;