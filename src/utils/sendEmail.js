import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

const sendMail = (sender_email, receiver_email, email_subject, email_body) => {
    const mailOptions = {
        from: sender_email,
        to: receiver_email,
        subject: email_subject,
        text: email_body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

let sender_email = 'yuppiegvng@gmail.com';
let receiver_email = 'byiringiroolivier250@gmail.com';
let email_subject = 'Nodemailer Demo';
let email_body = 'Greetings from Health Hub!';

sendMail(sender_email, receiver_email, email_subject, email_body);
