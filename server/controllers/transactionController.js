const PaymentServices = require('../service/transactionService');
const TransactionModel = require('../models/Transaction');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
/*module.exports.getTransactionHistory = async (req, res) => {
    try {
      const transactions = await this.paymentService.getPaymentHistory();
      res.status(200).json(transactions);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
   };
*/
module.exports.getTransactionHistory = async (req, res) => {
  try {
    const transactions = await TransactionModel.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports.confirmTransaction = async (req, res) => {
    try {
        const { paymentId } = req.body;
        const paymentIntent = await this.PaymentServices.confirmPayment(paymentId);
        if (!paymentIntent) {
          return res.status(404).json({ error: 'Transaction not found' });
        }
  
        res.status(200).json(paymentIntent);
      } catch (error) {
        console.error(error);
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

 module.exports.initTransaction = async (req, res) => {
  try {
    rl.question('Enter the payment amount: ', async (amount) => {
      try {
        amount = parseFloat(amount);
        if (isNaN(amount) || amount < 0) {
          throw new Error('Invalid amount');
        }
        const paymentIntent = await PaymentServices.initPayment(amount);
        res.status(201).json(paymentIntent);
        console.log(paymentIntent);
      } catch (error) {
        console.log(error.message);
      } finally {
        rl.close();
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

