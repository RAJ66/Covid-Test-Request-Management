const nodemailer = require("nodemailer");

module.exports = async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pawpirucas@gmail.com",
      pass: "camalindo",
    },
  });

  const mailOptions = {
    from: "pawpirucas@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };
  let success;
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      success = false;
    } else {
      console.log("Email sent: " + info.response);
      success = true;
    }
  });
  return success;
};
