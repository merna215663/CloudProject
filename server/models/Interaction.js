
const {Schema, model, trusted} = require('mongoose');

/*const notificationSchema = new Schema({
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    
  });*/

const itemprogressSchema = new Schema({
    itemId: { type: String, required: true },
    progress: { type: Number, default: 0 },
    //notifications: [notificationSchema],
  });

  
 
  
  
const ItemprogressModel = model('itemprogress',itemprogressSchema );

module.exports = ItemprogressModel;
