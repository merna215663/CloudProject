const transactionService = require('../service/transactionService');

module.exports.getTransactionHistory = async (req, res) => {
    try {
        const userId = req.params.userId;
        const transactions = await transactionService.getTransactionHistory(userId);
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.saveTransaction = async (req, res) => {
    try {
        const transactionData = req.body;
        const savedTransaction = await transactionService.saveTransaction(transactionData);
        await emailService.sendTransactionEmail(
            transactionData.userEmail, 
            'Transaction Completed', 
            `Your transaction for ${transactionData.amount} is completed.`
        );
        res.status(201).json(savedTransaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
