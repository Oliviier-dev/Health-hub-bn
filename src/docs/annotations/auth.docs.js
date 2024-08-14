/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the user
 *           example: "0cfdf01b-197e-4637-84a9-a16ee91ba1ba"
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: "admin@example.com"
 *         verified:
 *           type: boolean
 *           description: Indicates if the user's email is verified
 *           example: true
 *         first_name:
 *           type: string
 *           description: User's first name
 *           example: "Admin"
 *         last_name:
 *           type: string
 *           description: User's last name
 *           example: "User"
 *         role:
 *           type: string
 *           description: Role assigned to the user
 *           example: "PATIENT"
 *         image_url:
 *           type: string
 *           format: uri
 *           description: URL of the user's profile image
 *           example: null
 *         email_verification_token:
 *           type: string
 *           description: Token used for email verification
 *           example: null
 *         email_verification_token_expiration:
 *           type: string
 *           format: date-time
 *           description: Expiration date and time of the email verification token
 *           example: null
 *         reset_password_token:
 *           type: string
 *           description: Token used for resetting the password
 *           example: null
 *         reset_password_token_expiration:
 *           type: string
 *           format: date-time
 *           description: Expiration date and time of the reset password token
 *           example: null
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Account creation date
 *           example: "2024-08-11T15:40:41.416Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last account update date
 *           example: "2024-08-11T15:40:41.416Z"
 *     LoginResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: Status of the login attempt
 *           example: "success"
 *         message:
 *           type: string
 *           description: Message indicating the result of the login attempt
 *           example: "Doe successfully logged in"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message explaining the reason for the failure
 *           example: "User not found"
 */

/**
 * @openapi
 * /api/v1/auth/resend-verification-token:
 *   post:
 *     summary: Resend Email Verification Token
 *     description: Re-sends a user an email verification link in case the first one was expired or lost.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *                 example: user@example.com
 *     responses:
 *       '200':
 *         description: Email verification link sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating that the email verification link has been resent.
 *                   example: "An email verification link has been sent to your email"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '409':
 *         description: Account already verified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: User Login
 *     description: Authenticate a user and provide a session token upon successful login.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: "Password123!"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '403':
 *         description: User is not verified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /api/v1/auth/logout:
 *   get:
 *     summary: User Logout
 *     description: Logs out a user by clearing their session cookie.
 *     tags:
 *       - Authentication
 *     responses:
 *       '200':
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating the successful logout.
 *                   example: "Logout Successfully"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message explaining the reason for the failure.
 *                   example: "Logout failed"
 */

/**
 * @openapi
 * /api/v1/auth/password-reset:
 *   post:
 *     summary: Request Password Reset
 *     description: Sends a reset password email to the user if the provided email is valid.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address for which the password reset is requested.
 *                 example: user@example.com
 *             required:
 *               - email
 *     responses:
 *       '200':
 *         description: Reset password email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message indicating that the reset password email has been sent.
 *                   example: "Reset password email sent successfully"
 *       '400':
 *         description: Bad request due to missing or invalid email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the issue with the provided email.
 *                   example: "Please provide valid email"
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the user was not found.
 *                   example: "User not found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the internal server error.
 *                   example: "Internal Server Error"
 */

/**
 * @openapi
 * /api/v1/auth/reset-password/{token}:
 *   post:
 *     summary: Reset Password
 *     description: Resets the user’s password using the provided token and new password.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The password reset token.
 *         example: "abcdef1234567890"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password to set for the user.
 *                 example: "NewPassword123!"
 *             required:
 *               - password
 *     responses:
 *       '200':
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message indicating the password has been reset.
 *                   example: "Password reset successfully"
 *       '400':
 *         description: Bad request due to missing or invalid token/password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the issue with the token or password.
 *                   example: Invalid or expired token or Please provide all details
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the internal server error.
 *                   example: "Internal Server Error"
 */

/**
 * @openapi
 * /api/v1/auth/verify/{token}:
 *   get:
 *     summary: Verify Email
 *     description: Verifies the user's email using the provided token.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The email verification token.
 *         example: "abcdef1234567890"
 *     responses:
 *       '200':
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message indicating the email has been verified.
 *                   example: "Email Verified Successfully"
 *       '400':
 *         description: Bad request due to invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the token is invalid or expired.
 *                   example: "Invalid or expired token"
 *       '409':
 *         description: Conflict if the account is already verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the account is already verified.
 *                   example: "Account is already verified"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the internal server error.
 *                   example: "Internal Server Error"
 */
