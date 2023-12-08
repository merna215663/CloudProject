const { application } = require("express");
const express = require('express');
const {Router} = require ('express');
const productController = require('../controllers/productController');
const productsRouter = Router();
const app = express();

app.get('/', productController.getProducts);

productsRouter.get('/retrieve', productController.getProducts);
productsRouter.post('/post', productController.postProduct);
productsRouter.delete('/:productID', productController.deleteProduct);
productsRouter.get('/retrieve/:userId', productController.findMyProduct);
productsRouter.put('/updateproduct', productController.EditProduct);

module.exports = productsRouter;

