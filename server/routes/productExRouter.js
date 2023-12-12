/*
//router.put('/updateitems/:id/status', itemController.updateItemStatus);
//router.post('/exitems/:id/exchange-offer', itemController.makeExchangeOffer);

module.exports = router;*/

const { Router } = require('express');
const productExController = require('../controllers/productExController');
const productsExRouter = Router();

productsExRouter.get('/items', productExController.getExProducts);
productsExRouter.post('/additems', productExController.postExProduct); //
productsExRouter.delete('/deleteitems/:id', productExController.deleteExProduct); //
module.exports = productsExRouter;
