const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

let config = {
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  service: 'brevo',
  auth: {
    type: 'login',
    user: EMAIL,
    pass: PASSWORD
  },
  tls: {
    ciphers: 'SSLv3'
  }
}

let transporter = nodemailer.createTransport(config);


const sendMail = async ({ name, userEmail, text, subject, code }) => {

  let content = `Hello  ${name || userEmail},\n\n!!!!! Welcome to Social !!!!!!\n\n ${text} \n\n\n Yours truly,\nDeveloped by\nPartha`;

  var html_body = `
  <div style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; padding: 20px; line-height: 1.6;">
    <div style="max-width: 700px; margin: 0 auto; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
      <div style="background: #00466a; color: #ffffff; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 1.8em;">Welcome to Shristi</h1>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 1.2em; color: #333;">Hi <strong>${name || userEmail}</strong>,</p>
        <p style="font-size: 1em; color: #555;">We are thrilled to have you on board! Shristi is your gateway to creativity and innovation. To get started, please use the OTP below to verify your account:</p>
        <div style="text-align: center; margin: 20px 0;">
          <h2 style="display: inline-block; background: #00466a; color: #ffffff; padding: 10px 20px; border-radius: 5px; font-size: 1.5em;">${code}</h2>
        </div>
        <p style="font-size: 1em; color: #555;">If you have any questions, feel free to reach out to our support team. We're here to help!</p>
        <p style="font-size: 0.9em; color: #555;">
          Best regards,<br/>
          <strong>Team Shristi</strong>
        </p>
      </div>
      <div style="background: #f4f4f4; padding: 10px; text-align: center; font-size: 0.8em; color: #aaa;">
        <p>Developed by Shristi Web-dev</p>
        <p>© 2025 Shristi. All rights reserved.</p>
      </div>
    </div>
  </div>`;

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: subject || "OTP for verification",
    // text: content,
    html: html_body
  }

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return ({ error: error, msg: "mail not sent" })
    } else {
      console.log('Email sent:', info.response);
      return ({ msg: "You should receive an email from us." })
    }
  });
}


module.exports = sendMail;