const mongoose = require('mongoose');

const initiateDBConnection = async () => {

    try{

        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to mongo DB Server.');
    } catch (error){
        console.log(error);
    }
};

module.exports = initiateDBConnection;

