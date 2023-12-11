const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
//const socketIo = require('socket.io');

dotenv.config({
  path: './config/.env',
});

//const server = http.createServer(app);
//const io = socketIo(server);
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

const initiateDBConnection = require('./config/db');

app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);




//products
const productsRouter = require('./routes/productsRouter');
app.use('/products', productsRouter);

//feedback
const feedbackRouter = require('./routes/feedbackRouter');
app.use('/feedback', feedbackRouter);

//payment
const transactionRouter = require('./routes/transactionRouter');
app.use('/transaction', transactionRouter);

//interaction
const interactionController = require('./controllers/interactionController');
const interactionRouter = require('./routes/interactionRouter');
app.use('/itemprogress', interactionRouter);

/*io.on('connection', (socket) => {
  console.log('User connected');

  // Handle chat messages
  socket.on('chatMessage', (message) => {
    interactionController.handleChatMessage(io, socket, message);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

*/
//product exchange
const productsExRouter = require('./routes/productExRouter');
app.use('/ProductExchange', productsExRouter);

//Account
const Accountt = require('./routes/Account');
app.use('/Account', Accountt);

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

app.listen(PORT, async () => {
  console.log(`server has been started as is listening to port ${PORT}`);

  await initiateDBConnection();
});
