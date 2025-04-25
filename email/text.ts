'use server';

import nodemailer from 'nodemailer'


export const passwordResetEmail = async (token: string, email: string) =>{
    const transporter = nodemailer.createTransport({
        service: "gmail", // or other service like 'hotmail'
        auth: {
            user: "khansaif86783@gmail.com", // Your email
            pass: process.env.EMAIL_PASS_KEY, // Your email password or app-specific password
        },
    });

    const mailOptions = {
        from: "khansaif86783@gmail.com", // Sender address
        to: email, // Recipient email
        subject:  "No Subject", // Subject
        text:  `<p>
        Click! 👈<a href="http://localhost:3000/new-password?token=${token}"> here !</a>
        </p>`
    };

    try {
        await transporter.sendMail(mailOptions);
       console.log("email send")
    } catch (error) {
       console.log(error)
    }
}

