export const verificationEmailTemplate = (verificationLink) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        color: #333;
        line-height: 1.6;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f9f9f9;
      }
      h3 {
        color: #333;
      }
      a {
        color: #1a73e8;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      p {
        margin: 10px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h3>Verify Your Email Address</h3>
      <p>Hi there,</p>
      <p>Thank you for signing up to Health Hub! To activate your account, please click the link below:</p>
      <p><a href="${verificationLink}">Verify Email Address</a></p>
      <p><em>This link will expire in 24 hours.</em></p>
      <p>If you did not sign up for an account, you can safely ignore this email.</p>
      <p>Best regards,<br>Health Hub</p>
    </div>
  </body>
  </html>
`;
