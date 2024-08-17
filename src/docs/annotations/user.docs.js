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
 *           example: "000000-0000-0000-0000000"
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
 *     UserProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the user profile
 *           example: "000000-0000-0000-0000000"
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the user
 *           example: "000000-0000-0000-0000000"
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
 *         phone_number:
 *           type: string
 *           description: user's phone number
 *           example: 123-456-678
 *         gender:
 *           type: string
 *           description: user's gender
 *           example: Male
 *         date_of_birth:
 *           type: date
 *           description: user's date of birth
 *           example: "2024-08-11"
 *         address:
 *           type: string
 *           description: user's address
 *           example: "123 Example St, Example City, EX 12345"
 *         social_media_profiles:
 *           type: object
 *           description: user's social media profiles
 *           example:
 *             twitter: "@yuppie"
 *             IG: "@yuppie"
 *         medical_history:
 *           type: array
 *           items:
 *             type: string
 *           description: User's medical history
 *           example:
 *             - "Asthma"
 *             - "High blood pressure"
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
 */

/**
 * @openapi
 * /api/v1/user/users:
 *   get:
 *     summary: Retrieve all users
 *     description: Retrieve a list of all registered users.
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */

/**
 * @openapi
 * /api/v1/user/create:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided details.
 *     tags:
 *       - Users
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
 *                 description: User's email address
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 description: Password for the user
 *                 example: "Password!"
 *               first_name:
 *                 type: string
 *                 description: User's first name
 *                 example: "Admin"
 *               last_name:
 *                 type: string
 *                 description: User's last name
 *                 example: "User"
 *             required:
 *               - email
 *               - password
 *               - first_name
 *               - last_name
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Please provide all details or User already exists
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */

/**
 * @openapi
 * /api/v1/user/profile:
 *   get:
 *     summary: Retrieve the user profile
 *     description: Retrieve the profile of the authenticated user.
 *     tags:
 *       - Users
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User profile retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/UserProfile'
 *       '404':
 *         description: User profile not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User Profile not found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */

/**
 * @openapi
 * /api/v1/user/profile:
 *   put:
 *     summary: Update user profile
 *     description: Update the profile information for the currently authenticated user.
 *     tags:
 *       - Users
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: User's first name
 *                 example: "Patient"
 *               last_name:
 *                 type: string
 *                 description: User's last name
 *                 example: "Zero"
 *               phone_number:
 *                 type: string
 *                 description: User's phone number
 *                 example: "123-456-7890"
 *               gender:
 *                 type: string
 *                 description: User's gender
 *                 example: "Male"
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 description: User's date of birth
 *                 example: "1990-01-01"
 *               address:
 *                 type: string
 *                 description: User's address
 *                 example: "123 Example St, Example City, EX 12345"
 *               social_media_profiles:
 *                 type: object
 *                 description: User's social media profiles
 *                 additionalProperties:
 *                   type: string
 *                 example:
 *                   twitter: "@exampleuser"
 *                   facebook: "facebook.com/exampleuser"
 *               medical_history:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: User's medical history
 *                 example:
 *                   - "Asthma"
 *                   - "High blood pressure"
 *               allergies:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: User's allergies
 *                 example:
 *                   - "Peanuts"
 *                   - "Shellfish"
 *     responses:
 *       '200':
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User profile updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     first_name:
 *                       type: string
 *                     last_name:
 *                       type: string
 *                     phone_number:
 *                       type: string
 *                     gender:
 *                       type: string
 *                     date_of_birth:
 *                       type: string
 *                       format: date
 *                     address:
 *                       type: string
 *                     social_media_profiles:
 *                       type: object
 *                       additionalProperties:
 *                         type: string
 *                     medical_history:
 *                       type: array
 *                       items:
 *                         type: string
 *                     allergies:
 *                       type: array
 *                       items:
 *                         type: string
 *       '404':
 *         description: User profile not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User profile not found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
