const {Schema, model, trusted} = require('mongoose');

const ProductExSchema = new Schema({

    name: {
        type: 'String',
        required: true
    },

    description: {
        type: 'String',
        required: true
    },
    price: {
        type: 'Number',
        required: true
    },
    available:{
        type:'Boolean',
        required: true
    },
    pending:{
        type:'Boolean',
        required:true
    },
    paid:{
        type:'Boolean',
        required:true
    },
    imgURL: {
        type: 'String',
    }
});


const ProductEXModel = model('productEx',ProductExSchema );

module.exports = ProductEXModel;

