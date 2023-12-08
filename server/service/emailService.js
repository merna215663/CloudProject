const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your email provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});


module.exports.sendTransactionEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
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
