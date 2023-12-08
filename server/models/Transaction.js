const {Schema, model, trusted} = require('mongoose');
const TransactionSchema = new Schema({
    transactionId: {
        type: 'String',
        required: true
    },

    amount: {
        type: 'Number',
        required: true
    },
    status: {
        type: 'String',
        required: true
    },

    date: {
        type: 'Date',
        required: true
    },   
});

const TransactionModel = model('Transaction', TransactionSchema);

module.exports = TransactionModel;