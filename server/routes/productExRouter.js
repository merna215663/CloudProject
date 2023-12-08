const express = require('express');
const itemController = require('../controllers/productExController');

const router = express.Router();

router.get('/items', itemController.getAllItems);
router.post('/additems', itemController.createItem);
router.delete('/deleteitems/:id', itemController.deleteItem);
router.put('/updateitems/:id/status', itemController.updateItemStatus);
router.post('/exitems/:id/exchange-offer', itemController.makeExchangeOffer);

module.exports = router;
