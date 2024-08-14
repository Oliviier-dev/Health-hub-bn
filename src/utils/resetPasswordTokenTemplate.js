export const resetPasswordEmailTemplate = (resetLink) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
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
      <h3>Password Reset Request</h3>
      <p>Hello,</p>
      <p>We received a request to reset your password. To proceed, please click the link below to set a new password:</p>
      <p><a href="${resetLink}">Reset Your Password</a></p>
      <p><em>This link will expire in 30 minutes.</em></p>
      <p>If you did not request a password reset, you can safely ignore this email.</p>
      <p>Best regards,<br>Health Hub</p>
    </div>
  </body>
  </html>
`;
