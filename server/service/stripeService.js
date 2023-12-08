const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports.createPaymentIntent = async (amount, currency = 'usd') => {
    try {
        return await stripe.paymentIntents.create({
            amount,
            currency,
        });
    } catch (err) {
        throw new Error('Error creating payment intent: ' + err.message);
    }
};

module.exports.refundPayment = async (paymentIntentId) => {
    try {
        return await stripe.refunds.create({ payment_intent: paymentIntentId });
    } catch (err) {
        throw new Error('Error processing refund: ' + err.message);
    }
};
