const express = require('express');
const itemController = require('../controllers/productExController');

const router = express.Router();

router.get('/items', itemController.getAllItems);
router.post('/items', itemController.createItem);
router.delete('/items/:id', itemController.deleteItem);
router.put('/items/:id/status', itemController.updateItemStatus);
router.post('/items/:id/exchange-offer', itemController.makeExchangeOffer);

module.exports = router;
