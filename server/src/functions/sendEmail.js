import nodemailer from 'nodemailer';

const sendEmail = (url, email, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  const mailOptions = {
    from: 'Admin@moreRecipes.com',
    to: email,
    subject: 'Password Reset',
    html: `
            <h4> Click on this <a href=${url}>link</a> to recover password <br />
            Ignore this message if you don't have an account at </h4> <br />
            <h3>More Recipes</h3>
          `
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.status(500).json({ Message: 'Unable to send recovery email' });
    }
    return res.status(200).json({ Message: 'Recovery Email sent' });
  });
};

export default sendEmail;

