const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

router.get('/transactions/:userId', transactionController.getTransactionHistory);
router.post('/transactions', transactionController.saveTransaction);

module.exports = router;
