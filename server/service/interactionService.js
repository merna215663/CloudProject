const Interaction = require('../models/Interaction');


  //updated
  module.exports.handleChatMessage = async(io, socket, message) => {
    try {
      io.emit('chatMessage', message);
  
      await saveChatMessageToDatabase(message);
  
    } catch (error) {
      console.error('Error handling chat message:', error);
    }
  };

  const saveChatMessageToDatabase = async (message) => {
    try {
      const newChatMessage = new ChatMessageModel({ message });
      await newChatMessage.save();
    } catch (error) {
      console.error('Error saving chat message to the database:', error);
    }
  };

  module.exports.updateShippingStatus= async (orderId, newShippingStatus) => {
    try {
      const updatedInteraction = await Interaction.findOneAndUpdate(
        { _id: orderId }, // Assuming orderId is the _id of the transaction
        { shippingStatus: newShippingStatus },
        { new: true }
      );

      if (!updatedInteraction) {
        throw new Error('Transaction not found');
      }

      return updatedInteraction;
    } catch (error) {
      throw new Error(`Error updating shipping status: ${error.message}`);
    }
};

// Function for item progress
module.exports.trackProgress=async(orderId)=>{
  try {
    const interaction = await Interaction.findOne({ orderId });
    if (!interaction) {
      throw new Error('Interaction not found');
    }
    return interaction;
  } catch (error) {
    throw new Error(`Error tracking progress: ${error.message}`);
  }
};

module.exports.updatePaymentStatus= async (orderId, newPaymentStatus) => {
  try {
    const updatedInteraction = await Interaction.findOneAndUpdate(
      { orderId },
      { paymentStatus: newPaymentStatus },
      { new: true }
    );
    return updatedInteraction;
  } catch (error) {
    throw new Error(`Error updating payment status: ${error.message}`);
  }
};

module.exports.confirmDelivery= async (orderId,newdeliveryConfirmation) => {
  try {
    const updatedInteraction = await Interaction.findOneAndUpdate(
      { orderId },
      { deliveryConfirmation: newdeliveryConfirmation },
      { new: true }
    );
    return updatedInteraction;
  } catch (error) {
    throw new Error(`Error confirming delivery: ${error.message}`);
  }
};

/*
// Function to get item progress by itemId
const getItemProgress = async (itemId) => {
  try {
    const itemProgress = await Interaction.findOne({ itemId });
    return itemProgress;
  } catch (error) {
    throw new Error('Error getting item progress');
  }
};



// Function to update item progress by itemId
const updateItemProgress = async (itemId, newProgress) => {
  try {
    const updatedItemProgress = await Interaction.findOneAndUpdate(
      { itemId },
      { progress: newProgress },
      { new: true }
    );
    return updatedItemProgress;
  } catch (error) {
    throw new Error('Error updating item progress');
  }
};
*/

/*const sendNewItemNotification = async (itemId) => {
    try {
      // Retrieve the item details or any relevant information
      const itemDetails = await getItemDetails(itemId);
  
      // Create a notification message
      const message = `New item added: ${itemDetails.name}`;
  
      // Find users who need to be notified (customize as needed)
      const usersToNotify = await findUsersToNotify();
  
      // Send notifications to users
      usersToNotify.forEach(async (user) => {
        const interaction = new Interaction({
          itemId,
          notifications: [{ message }],
        });
  
        await interaction.save();
      });
  
      return true;
    } catch (error) {
      throw new Error('Error sending new item notification');
    }
  };*/



