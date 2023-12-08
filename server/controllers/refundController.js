const stripeService = require('../service/stripeService');

module.exports.processRefund = async (req, res) => {
    try {
        const { paymentIntentId } = req.body;
        const refund = await stripeService.refundPayment(paymentIntentId);
        res.json({ message: 'Refund processed', refund });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

