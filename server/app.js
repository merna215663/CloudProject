const express=require('express');
const cors=require('cors');



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
const transactionRouter = require('./routes/transactionRouter');
app.use('/transaction', transactionRouter);

//interaction
const interactionRouter = require('./routes/interactionRouter');
app.use('/itemprogress', interactionRouter);

//product exchange
const productsExRouter = require('./routes/productExRouter');
app.use('/ProductExchange', productsExRouter);

//Account
const Accountt= require('./routes/Account');
app.use('/Account',Accountt);

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

app.use(express.json());

app.listen(PORT,  async() => {

    console.log(`server has been started as is listening to port ${PORT}`);

    await initiateDBConnection();
});




