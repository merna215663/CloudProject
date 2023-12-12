const { Schema, model, trusted } = require('mongoose');

const ProductSchemaEx = new Schema({
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

const ProductExModel = model('productEx', ProductSchemaEx);

module.exports = ProductExModel;
