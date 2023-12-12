//const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const Payment = require('../models/Transaction');
function generateUniqueTransactionId() {
  const timestamp = new Date().getTime().toString(36);
  const randomNumber = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomNumber}`;
}

module.exports.initPayment = async function (amount) {
  if (!amount) {
    throw new Error('Amount is required for payment initiation.');
  }

  const uniqueTransactionId = generateUniqueTransactionId();
  const transaction = new Payment({
    transactionId: uniqueTransactionId,
    amount,
    status: 'Initiated',
    date: new Date(),
  });

  await transaction.save();
  return transaction;
};



module.exports.confirmPayment = async (paymentId) => {
  const transaction = await Payment.findOneAndUpdate({ paymentId },
      { status: 'Confirmed' },
      { new: true }
    );
    return transaction;
};

module.exports.getPaymentHistory = async () => {
  const transaction = await Payment.find();
    return transaction;
};


/*module.exports.getTransactionHistory = async (userId) => {
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
    };*/

    