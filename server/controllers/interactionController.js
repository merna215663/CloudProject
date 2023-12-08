const interactionService = require('../service/interactionService');
const productService = require('../service/productService');
const transactionService = require('../service/transactionService');
const emailService = require('../service/emailService');
const io = require('../socket'); // Import the Socket.io instance

module.exports.getItemProgress = async (req, res) => {
  try {
    const { itemId } = req.params;
    const progress = interactionService.getItemProgress(itemId);
    res.status(200).json({ progress });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports.updateItemProgress = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { newProgress } = req.body;

    if (newProgress === undefined) {
      return res.status(400).json({ error: 'newProgress is required' });
    }

    const updatedProgress = interactionService.updateItemProgress(itemId, newProgress);
    res.status(200).json({ success: true, progress: updatedProgress });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Send Notifications
module.exports.sendNotification = async (req, res) => {
  const userId = req.body.userId;
  const notificationType = req.body.notificationType;

  try {
    // Add logic to determine the notification message based on notificationType
    const notificationMessage = 'Notification message goes here';
    await emailService.sendNotificationEmail(userId, 'New Notification', notificationMessage);

    res.status(200).send({ msg: 'Notification sent successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Real-time Chat
module.exports.transactionChat = (req, res) => {
  // Assuming productId is passed in the request body
  const productId = req.body.productId;
  const chatNamespace = `/product-${productId}`;

  // Emit a message to the chat room
  io.of(chatNamespace).emit('message', {
    user: 'Admin',
    text: 'A new user has joined the chat.',
  });

  // Handle incoming messages
  io.of(chatNamespace).on('connection', (socket) => {
    socket.on('message', (data) => {
      // Handle the incoming message, e.g., save to the database
      transactionService.saveChatMessage(productId, data);

      // Broadcast the message to all connected clients
      io.of(chatNamespace).emit('message', data);
    });

    socket.on('disconnect', () => {
      // Handle user disconnection, e.g., update user status
      io.of(chatNamespace).emit('message', {
        user: 'Admin',
        text: 'A user has left the chat.',
      });
    });
  });

  res.status(200).send({ msg: 'Connected to chat' });
};



// Negotiate on Item Prices and Terms
module.exports.negotiateProduct = async (req, res) => {
  const productId = req.body.productId;
  const proposedPrice = req.body.proposedPrice;

  try {
    const negotiatedProduct = await productService.negotiateProductPrice(productId, proposedPrice);
    res.status(200).send({ msg: 'Negotiation successful', product: negotiatedProduct });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Search and Filter - This can be handled on the client side or involve server-side logic
// Server-side search example using productService
module.exports.searchProducts = async (req, res) => {
  const searchTerm = req.query.q; // Assuming the search term is passed as a query parameter

  try {
    const searchResults = await productService.searchProducts(searchTerm);
    res.status(200).send({ results: searchResults });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
