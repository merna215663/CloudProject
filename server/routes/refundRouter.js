const express = require('express');
const refundController = require('../controllers/refundController');

const router = express.Router();

router.post('/refund', refundController.processRefund);

module.exports = router;
