const {Schema, model, trusted} = require('mongoose');
const TransactionSchema = new Schema({
    productId: String,
    userId: String,
    amount: Number,
    date: { type: Date, default: Date.now },
    status: String, // e.g., 'completed', 'refunded'
    receiptUrl: String, // URL to the receipt if available
});

const TransactionModel = model('Transaction', TransactionSchema);

module.exports = TransactionModel;