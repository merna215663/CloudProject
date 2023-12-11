const { Schema, model, trusted } = require('mongoose');

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
  available: {
    type: 'String',
  },
  imgURL: {
    type: 'String',
  },
});

const ProductModel = model('product', ProductSchema);

module.exports = ProductModel;
