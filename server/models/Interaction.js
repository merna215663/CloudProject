
const {Schema, model, trusted} = require('mongoose');


/*const itemprogressSchema = new Schema({
    itemId: { type: String, required: true },
    progress: { type: Number, default: 0 },
    //notifications: [notificationSchema],
  });

  */
 
  const itemprogressSchema = new Schema({
    orderId: {
      type: String,
      required: true,
    },
    shippingStatus: {
      type: String,
      enum: ['pending', 'completed', 'canceled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
    deliveryConfirmation: {
      type: String,
      enum: ['delivered', 'notDeliverd'],
    default: 'pending',
    },
    
  });
  
  /*const chatMessageSchema = new mongoose.Schema({
    message: {
      type: String,
      required: true,
    },
  });
  */
const ItemprogressModel = model('itemprogress',itemprogressSchema );
//const chatMessageModel=model('chatmessage',chatMessageSchema)
//module.exports = {ItemprogressModel, chatMessageModel};
module.exports=ItemprogressModel;