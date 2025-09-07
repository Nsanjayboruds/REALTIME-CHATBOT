import { createTransport } from "nodemailer";

const sendMail = async (email, subject, otp) => {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // TLS
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS, // App Password
    },
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Verification</title>
  <style>
    body { font-family: Arial, sans-serif; display:flex; justify-content:center; align-items:center; height:100vh; margin:0; }
    .container { background:#fff; padding:20px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.1); text-align:center; }
    h1 { color:red; }
    p { color:#666; margin-bottom:20px; }
    .otp { font-size:36px; color:#7b68ee; margin-bottom:30px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>OTP Verification</h1>
    <p>Hello ${email}, your (One-Time Password) for account verification is:</p>
    <p class="otp">${otp}</p> 
  </div>
</body>
</html>`;

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject,
    html,
  });
};

export default sendMail;
