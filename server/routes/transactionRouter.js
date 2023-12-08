const express = require('express');
const PaymentController = require('../controllers/transactionController');
const router = express.Router();
router.post('/init-transaction', PaymentController.initTransaction);
router.post('/confirm-transaction', PaymentController.confirmTransaction);
router.get('/payment-history', PaymentController.getTransactionHistory);
module.exports = router;
