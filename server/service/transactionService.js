const TransactionModel = require('../models/Transaction');

module.exports.getTransactionHistory = async (userId) => {
    try {
        return await TransactionModel.find({ userId });
    } catch (err) {
        throw new Error('Error retrieving transaction history: ' + err.message);
    }
};

module.exports.saveTransaction = async (transactionData) => {
    try {
        const transaction = new TransactionModel(transactionData);
        return await transaction.save();
    } catch (err) {
        throw new Error('Error saving transaction: ' + err.message);
    }
};
