const nodemailer = require('nodemailer');
const account=require ('../models/Account');

require('dotenv').config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMUSER,
        clientId: 'your_client_id',
        clientSecret: 'your_client_secret',
        refreshToken: 'your_refresh_token',
        accessToken: 'your_access_token',
    },
});

module.exports.sendTransactionEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMUSER,
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (err) {
        console.error('Error sending email:', err);
    }
};
