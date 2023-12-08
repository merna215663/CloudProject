const express=require('express');
const dotenv = require ('dotenv');
const cors=require('cors');

dotenv.config({
    path: './config/.env'
});

const app = express();
app.use(cors({
    origin:[
        "http://localhost:3000"
    ]
}
));
const PORT = process.env.PORT;
const initiateDBConnection = require('./config/db');

//products
const productsRouter = require('./routes/productsRouter');
app.use('/products', productsRouter);

//feedback
const feedbackRouter = require('./routes/feedbackRouter');
app.use('/feedback', feedbackRouter);

//payment
const paymentRouter = require('./routes/paymentRouter');
app.use('/payment', paymentRouter);

//transaction
const transactionRouter = require('./routes/transactionRouter');
app.use('/transactions', transactionRouter);

//refund
const refundRouter = require('./routes/refundRouter');
app.use('/refunds', refundRouter);

//interaction
const interactionRouter = require('./routes/interactionRouter');
app.use('/itemprogress', interactionRouter);

//product exchange
const productsExRouter = require('./routes/productExRouter');
app.use('/ProductExchange', productsExRouter);

//Account
const Accountt= require('./routes/Account');
app.use('/Account',Accountt);

app.use(express.json());

app.listen(PORT,  async() => {

    console.log(`server has been started as is listening to port ${PORT}`);

    await initiateDBConnection();
});




