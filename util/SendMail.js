const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "SendGrid",
    host: "smtp.sendgrid.net",
    pool: true,
    port: 25,
    maxConnections: 20,
    rateDelta: 1000,
    rateLimit: 150,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: "apikey",
      pass: process.env.SENDGRID_KEY,
    },
  });

  const mailOptions = {
    from: "support@planetbase.io",
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;
