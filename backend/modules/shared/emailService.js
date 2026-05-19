import nodemailer from 'nodemailer';

export default async function sendPaymentConfirmation(toEmail, amount) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS 
        }
    });

    const mailOptions = {
        from: `"TicTacToang Arena" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: `Payment Successful - Premium Membership`,
        text: `Thank you! Your payment of $${amount} for Premium Membership has been processed successfully. Your account has been updated.`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Confirmation email sent to ${toEmail}`);
    } catch (error) {
        console.error("Email failed to send:", error.message);
    }
};