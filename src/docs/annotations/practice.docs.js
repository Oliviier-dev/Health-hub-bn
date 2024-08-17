/**
 * @openapi
 * components:
 *   schemas:
 *     PracticeProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the practice profile
 *           example: "00000000-0000-0000-0000-000000000000"
 *         doctor_id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the doctor
 *           example: "00000000-0000-0000-0000-000000000000"
 *         practice_name:
 *           type: string
 *           description: Name of the practice
 *           example: "Health and Wellness Clinic"
 *         phone_number:
 *           type: string
 *           description: Contact phone number for the practice
 *           example: "123-456-7890"
 *         website:
 *           type: string
 *           format: uri
 *           description: Website URL for the practice
 *           example: "https://healthandwellness.com"
 *         bio:
 *           type: string
 *           description: Brief description or bio of the practice
 *           example: "Demesne mention promise you justice arrived way. Or increasing to in especially inquietude companions acceptance admiration."
 *         address:
 *           type: string
 *           description: Address of the practice
 *           example: "123 Wellness St, Health City, HC 12345"
 *         services:
 *           type: object
 *           description: Services offered by the practice
 *           additionalProperties:
 *             type: string
 *           example:
 *             Consultation: "General"
 *             Diagnostics: "Available"
 *         pricing:
 *           type: object
 *           description: Pricing details for the services offered
 *           additionalProperties:
 *             type: string
 *           example:
 *             Consultation: "$100"
 *             Diagnostics: "$50"
 *         social_media_profiles:
 *           type: object
 *           description: Social media profiles associated with the practice
 *           additionalProperties:
 *             type: string
 *           example:
 *             Facebook: "https://facebook.com/healthandwellness"
 *             Twitter: "https://twitter.com/healthandwellness"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the practice profile was created
 *           example: "2024-08-11T15:40:41.416Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the practice profile was last updated
 *           example: "2024-08-11T15:40:41.416Z"
 */

/**
 * @openapi
 * /api/v1/practice/profile/all:
 *   get:
 *     summary: Retrieve all practice profiles
 *     description: Fetch a list of all registered practice profiles.
 *     tags:
 *       - Practice Profiles
 *     responses:
 *       '200':
 *         description: A list of all practice profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PracticeProfile'
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
 * /api/v1/practice/profile/{practiceId}:
 *   get:
 *     summary: Retrieve a practice profile by ID
 *     description: Fetch a specific practice profile using its unique identifier.
 *     tags:
 *       - Practice Profiles
 *     parameters:
 *       - name: practiceId
 *         in: path
 *         required: true
 *         description: Unique identifier for the practice profile
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "d14c5f6e-7b57-4f56-a1d1-2e83e7e74012"
 *     responses:
 *       '200':
 *         description: A practice profile and its associated doctor details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 practice:
 *                   $ref: '#/components/schemas/PracticeProfile'
 *                 doctor:
 *                   $ref: '#/components/schemas/User'
 *       '404':
 *         description: Practice profile not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Practice Not Found"
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
 * /api/v1/practice/profile/create:
 *   post:
 *     summary: Create a new practice profile
 *     description: Allows authenticated doctors to create a new practice profile.
 *     tags:
 *       - Practice Profiles
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               practice_name:
 *                 type: string
 *                 description: Name of the practice
 *                 example: "Health and Wellness Clinic"
 *               phone_number:
 *                 type: string
 *                 description: Contact phone number for the practice
 *                 example: "123-456-7890"
 *               website:
 *                 type: string
 *                 description: Website URL for the practice
 *                 example: "https://healthandwellness.com"
 *               bio:
 *                 type: string
 *                 description: Brief description or bio of the practice
 *                 example: "Providing top-notch healthcare services with a focus on patient wellness."
 *               address:
 *                 type: string
 *                 description: Address of the practice location
 *                 example: "123 Wellness St, Health City, HC 12345"
 *               services:
 *                 type: object
 *                 description: List of services provided by the practice
 *                 additionalProperties:
 *                   type: string
 *                 example:
 *                   Consultation: "General"
 *                   Diagnostics: "Available"
 *               pricing:
 *                 type: object
 *                 description: Pricing information for the services
 *                 additionalProperties:
 *                   type: string
 *                 example:
 *                   Consultation: "$100"
 *                   Diagnostics: "$50"
 *               social_media_profiles:
 *                 type: object
 *                 description: Social media profiles associated with the practice
 *                 additionalProperties:
 *                   type: string
 *                 example:
 *                   Facebook: "https://facebook.com/healthandwellness"
 *                   Twitter: "https://twitter.com/healthandwellness"
 *     responses:
 *       '201':
 *         description: Practice profile successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Practice Created"
 *                 data:
 *                   $ref: '#/components/schemas/PracticeProfile'
 *       '400':
 *         description: Bad request, such as attempting to create a second practice for a user who already has one
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You already have a practice"
 *       '403':
 *         description: Forbidden, user is not authorized to create a practice (e.g., not a doctor)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Only doctors can create their practice"
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
 * /api/v1/practice/profile/update:
 *   put:
 *     summary: Update an existing practice profile
 *     description: Allows authenticated doctors to update their practice profile.
 *     tags:
 *       - Practice Profiles
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               practice_name:
 *                 type: string
 *                 description: Name of the practice
 *                 example: "Health and Wellness Clinic"
 *               phone_number:
 *                 type: string
 *                 description: Contact phone number for the practice
 *                 example: "123-456-7890"
 *               website:
 *                 type: string
 *                 description: Website URL for the practice
 *                 example: "https://healthandwellness.com"
 *               bio:
 *                 type: string
 *                 description: Brief description or bio of the practice
 *                 example: "Providing top-notch healthcare services with a focus on patient wellness."
 *               address:
 *                 type: string
 *                 description: Address of the practice location
 *                 example: "123 Wellness St, Health City, HC 12345"
 *               services:
 *                 type: object
 *                 description: List of services provided by the practice
 *                 additionalProperties:
 *                   type: string
 *                 example:
 *                   Consultation: "General"
 *                   Diagnostics: "Available"
 *               pricing:
 *                 type: object
 *                 description: Pricing information for the services
 *                 additionalProperties:
 *                   type: string
 *                 example:
 *                   Consultation: "$100"
 *                   Diagnostics: "$50"
 *               social_media_profiles:
 *                 type: object
 *                 description: Social media profiles associated with the practice
 *                 additionalProperties:
 *                   type: string
 *                 example:
 *                   Facebook: "https://facebook.com/healthandwellness"
 *                   Twitter: "https://twitter.com/healthandwellness"
 *     responses:
 *       '200':
 *         description: Practice profile successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Practice data updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/PracticeProfile'
 *       '403':
 *         description: Forbidden, user is not authorized to update the practice (e.g., not a doctor)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Only doctors can update their practice"
 *       '404':
 *         description: Practice not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Practice not found"
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
