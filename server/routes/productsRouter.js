//const { application } = require('express');
//const express = require('express');
const { Router } = require('express');
const productController = require('../controllers/productController');
const productsRouter = Router();
//const app = express();

//app.get('/', productController.getProducts);

productsRouter.get('/retrieve', productController.getProducts);
productsRouter.post('/post', productController.postProduct); //
productsRouter.delete('/:productId', productController.deleteProduct); //
//productsRouter.get('/retrieve/:productId', productController.findMyProduct);
//productsRouter.put('/:productID/updateproduct', productController.EditProduct); //
//productsRouter.post('/:productId/negotiate',productController.negotiateProduct);
//productsRouter.put('/:productID/buy', productController.buyProduct);
module.exports = productsRouter;
