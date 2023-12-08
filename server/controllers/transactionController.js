const PaymentServices = require('../service/transactionService');

module.exports.getTransactionHistory = async (req, res) => {
    try {
        const payments = await PaymentServices.getPaymentHistory();
        res.json(payments);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
   };

module.exports.confirmTransaction = async (req, res) => {
    try {
        const { clientSecret, paymentMethodId } = req.body;
        const paymentIntent = await PaymentServices.confirmIntent(clientSecret, paymentMethodId);
        await PaymentServices.createPaymentRecord(paymentIntent);
        res.json({ status: paymentIntent.status });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
   };

module.exports.handleDispute=async (req, res) =>{
    try {
      const { paymentIntentId } = req.params;
      await PaymentServices.handleDispute(paymentIntentId);
      res.json({ status: 'Dispute handled' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
 };

 module.exports.processRefund=async (req, res) =>{
    try {
      const { paymentIntentId } = req.params;
      await PaymentServices.processRefund(paymentIntentId);
      res.json({ status: 'Refund processed' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
 };

 module.exports.initTransaction = async (req, res)=> {
       try {
         const { amount } = req.body;
         const paymentIntent = await PaymentServices.createIntent(amount);
         res.json({ clientSecret: paymentIntent.client_secret });
       } catch (error) {
         res.status(500).json({ error: error.message });
       }
    };
