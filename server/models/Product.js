const {Schema, model, trusted} = require('mongoose');

const ProductSchema = new Schema({

    name: {
        type: 'String',
    },

    description: {
        type: 'String',
    },
    price: {
        type: 'Number',
    },
    available:{
        type:'Boolean',
    },
    pending:{
        type:'Boolean',
    
    },
    paid:{
        type:'Boolean',
       
    },
    userID :{
        type: Schema.Types.ObjectId,
        ref:'account',
        
    },
    imgURL: {
        type: 'String',
    }
});


const ProductModel = model('product',ProductSchema );

module.exports = ProductModel;