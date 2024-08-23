/**
 * @openapi
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the payment.
 *         stripeId:
 *           type: string
 *           description: The identifier for the payment in Stripe.
 *         patient_id:
 *           type: string
 *           format: uuid
 *           description: The UUID of the patient associated with the payment.
 *         practice_id:
 *           type: string
 *           format: uuid
 *           description: The UUID of the practice associated with the payment.
 *         appointment_id:
 *           type: string
 *           format: uuid
 *           description: The UUID of the appointment associated with the payment.
 *         amount:
 *           type: number
 *           format: float
 *           description: The amount of the payment.
 *         payment_method:
 *           type: string
 *           enum:
 *             - Stripe
 *           description: The method used for payment.
 *         payment_status:
 *           type: string
 *           enum:
 *             - Pending
 *             - Completed
 *             - Failed
 *             - Refunded
 *             - Canceled
 *           description: The status of the payment.
 */

/**
 * @openapi
 * /api/v1/payment/all:
 *   get:
 *     summary: Retrieve all payments for the authenticated user
 *     description: Fetches all payment records associated with the currently authenticated user.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Payments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Payments retrieved successfully"
 *                 payments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Payment'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error retrieving payments: [error message]"
 */

/**
 * @openapi
 * /api/v1/payment/{appointmentId}/create-session:
 *   post:
 *     summary: Create a payment session for an appointment
 *     description: Initiates a payment session for a given appointment if the user is a patient and the appointment is confirmed.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: appointmentId
 *         in: path
 *         required: true
 *         description: ID of the appointment for which the payment session is created
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '200':
 *         description: Payment session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Session started successfully. You can continue with your payment"
 *                 payment:
 *                   $ref: '#/components/schemas/Payment'
 *                 url:
 *                   type: string
 *                   format: uri
 *                   example: "https://checkout.stripe.com/pay/xyz"
 *       '400':
 *         description: Bad request due to invalid appointment status or already completed payment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You can only pay for confirmed appointments"
 *       '403':
 *         description: Forbidden if the user is not a patient
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Only patients can pay for the appointments"
 *       '404':
 *         description: Not found if the appointment is not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Appointment not found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @openapi
 * /api/v1/payment/complete:
 *   get:
 *     summary: Complete a payment for an appointment
 *     description: Completes the payment process for a given appointment based on user and appointment IDs provided as query parameters.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: stripeId
 *         in: query
 *         required: true
 *         description: The ID of the stripe for this payment
 *         schema:
 *           type: string
 *           format: string
 *           example: "cs_test_a1ml1e73F7rx7IU898KNkuXZnpCo9oLQstpfBpcHDguvoNRSxBPzxXSvKx"
 *       - name: appointmentId
 *         in: query
 *         required: true
 *         description: The UUID of the appointment for which the payment is being completed
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '200':
 *         description: Payment completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Payment completed successfully"
 *                 paymentCompleted:
 *                   $ref: '#/components/schemas/Payment'
 *       '404':
 *         description: Payment not found or not in a state that allows completion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Payment not found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @openapi
 * /api/v1/payment/cancel:
 *   get:
 *     summary: Cancel a payment for an appointment
 *     description: Cancels a payment for a given appointment based on user and appointment IDs provided as query parameters.
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: stripeId
 *         in: query
 *         required: true
 *         description: The ID of the stripe for this payment
 *         schema:
 *           type: string
 *           format: string
 *           example: "cs_test_a1ml1e73F7rx7IU898KNkuXZnpCo9oLQstpfBpcHDguvoNRSxBPzxXSvKx"
 *       - name: appointmentId
 *         in: query
 *         required: true
 *         description: The UUID of the appointment for which the payment is being canceled
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '200':
 *         description: Payment canceled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Payment cancelled successfully"
 *                 paymentCancelled:
 *                   $ref: '#/components/schemas/Payment'
 *       '404':
 *         description: Payment not found or not in a state that allows cancellation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Payment not found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
