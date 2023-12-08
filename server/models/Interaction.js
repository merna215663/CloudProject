
const {Schema, model, trusted} = require('mongoose');


const itemprogressSchema = new Schema({
    itemId: { type: String, required: true },
    progress: { type: Number, default: 0 },
    //notifications: [notificationSchema],
  });

  
 
  
  
const ItemprogressModel = model('itemprogress',itemprogressSchema );

module.exports = ItemprogressModel;
