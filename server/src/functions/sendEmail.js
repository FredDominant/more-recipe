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
    <div>
    <div style="background-color:#f2f3f5;padding:20px">
      <div style="max-width:600px;margin:0 auto">
       <div 
        style="
          background:#fff;
          font:14px sans-serif;
          color:#686f7a;
          border:2px solid brown;
          margin-bottom:10px">
        <div 
          style="
           border-bottom:1px solid #f2f3f5;
           padding-bottom:20px;
           padding-top:20px">
          <h4 
          style="
            padding-top:0; 
            padding-left:20px; 
            margin:0; 
            font-size:30px;
            font-family: 'Berkshire Swash', cursive;
            font-size: xx-large;
            color: brown;">
            More Recipes</h4>
        </div>
        <div style="padding:10px 20px;line-height:1.5em;color:#686f7a">
          <p 
            style="
              padding-bottom:20px;
              margin:20px 0;
              color:#686f7a">
             You have requested to reset your password for More Recipes account. Please click on the button below to reset your password.
          </p>
      <p
         style=""><a href=${url}
            style="
              display:inline-block;
              font-size:15px;color:white;
              padding:10px 15px;
              text-decoration:none;
              background-color:brown;
              border-radius:3px" 
              target="_blank">
              Reset Password
          </a>
          </p>
          <p 
            style="
              padding-bottom:15px;
              margin-top:40px;
              color:#686f7a">
              If you haven't made this request please ignore this message.
          </p>
          <p 
            style="padding-bottom:10px;
              margin-top:20px;
              color:#686f7a">
              Best regards, <br>
              Admin, More Recipes.<br>
            <a href="fred-recipes.herokuapp.com"
              style="color: brown">fred-recipes.herokuapp.com</a>
          </p>
        </div>
     </div>
    </div>

          `
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log('error is', error);
      return res.status(500).json({ Message: 'Unable to send recovery email' });
    }
    return res.status(200).json({ Message: 'Recovery Email sent' });
  });
};

export default sendEmail;

