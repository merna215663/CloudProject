const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const Payment = require('../models/Transaction');

module.exports.getTransactionHistory = async (userId) => {
    try {
        return await Payment.find({ userId });
    } catch (err) {
        throw new Error('Error retrieving transaction history: ' + err.message);
    }
};

module.exports.createTransaction = async (paymentIntent) => {
    const payment = new Payment({
        transactionId: paymentIntent.id,
        amount: paymentIntent.amount / 100, // Convert from cents to dollars
        status: paymentIntent.status,
        date: new Date(),
      });
      await payment.save();
};

module.exports.createIntent = async (amount) =>{
       const paymentIntent = await stripe.paymentIntents.create({
         amount: amount * 100, // Stripe amount is in cents
         currency: 'usd',
       });
       return paymentIntent;
    };

module.exports.confirmIntent = async (clientSecret, paymentMethodId) =>{
        const paymentIntent = await stripe.paymentIntents.confirm(clientSecret, {
          payment_method: paymentMethodId,
        });
        return paymentIntent;
     };

     module.exports.refundPayment = async (paymentIntentId) => {
        try {
            const refund = await stripe.refunds.create({ transactionId: paymentIntentId });
            await Payment.findOneAndUpdate(
                { 'stripePaymentIntentId': paymentIntentId },
                { $set: { status: 'refunded' } }
            );
            return refund;
        } catch (err) {
            throw new Error('Error processing refund: ' + err.message);
        }
    };
