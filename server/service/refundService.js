const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const TransactionModel = require('../models/Transaction');

module.exports.refundPayment = async (paymentIntentId) => {
    try {
        const refund = await stripe.refunds.create({ payment_intent: paymentIntentId });
        await TransactionModel.findOneAndUpdate(
            { 'stripePaymentIntentId': paymentIntentId },
            { $set: { status: 'refunded' } }
        );
        return refund;
    } catch (err) {
        throw new Error('Error processing refund: ' + err.message);
    }
};
