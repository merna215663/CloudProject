const Interaction = require('../models/Interaction');

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

module.exports = {
  getItemProgress,
  updateItemProgress,
  //sendNewItemNotification,
};