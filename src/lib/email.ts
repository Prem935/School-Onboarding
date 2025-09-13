import nodemailer from 'nodemailer';

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to other services
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use app password for Gmail
  },
});

// Email template for OTP
function getOTPEmailTemplate(otp: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login OTP</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background-color: #f9f9f9;
          padding: 30px;
          border-radius: 10px;
          border: 1px solid #ddd;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .otp-code {
          background-color: #007bff;
          color: white;
          font-size: 32px;
          font-weight: bold;
          text-align: center;
          padding: 20px;
          border-radius: 8px;
          letter-spacing: 5px;
          margin: 20px 0;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          font-size: 14px;
          color: #666;
        }
        .warning {
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          color: #856404;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Login Verification</h1>
        </div>
        
        <p>Hello,</p>
        
        <p>You requested to login to the School Management System. Please use the following OTP code to complete your login:</p>
        
        <div class="otp-code">${otp}</div>
        
        <div class="warning">
          <strong>⚠️ Important:</strong>
          <ul>
            <li>This code will expire in 10 minutes</li>
            <li>Do not share this code with anyone</li>
            <li>If you didn't request this login, please ignore this email</li>
          </ul>
        </div>
        
        <p>If you have any questions, please contact our support team.</p>
        
        <div class="footer">
          <p>Best regards,<br>School Management System Team</p>
          <p><em>This is an automated message. Please do not reply to this email.</em></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Send OTP email
export async function sendOTPEmail(email: string, otp: string): Promise<boolean> {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🔐 Your Login OTP Code - School Management System',
      html: getOTPEmailTemplate(otp),
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent successfully to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false;
  }
}

// Verify email configuration
export async function verifyEmailConfig(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log('Email configuration verified successfully');
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
}
