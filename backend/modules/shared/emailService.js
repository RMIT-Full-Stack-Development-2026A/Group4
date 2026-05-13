import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendPaymentConfirmation = async (toEmail, amount) => {
    const mailOptions = {
        from: '"TicTacToang" <no-reply@tictactoang.com>',
        to: toEmail,
        subject: 'Payment Successful - TicTacToang Premium',
        text: `Thank you! Your payment of $${amount} has been processed successfully. You now have access to Premium features.`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Notification email sent to ${toEmail}`);
    } catch (error) {
        console.error("Email failed to send:", error.message);
    }
};