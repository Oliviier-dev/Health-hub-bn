/**
 * @openapi
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the appointment
 *           example: "00000000-0000-0000-0000-000000000000"
 *         patient_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the patient associated with the appointment
 *           example: "00000000-0000-0000-0000-000000000001"
 *         practice_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the practice profile associated with the appointment
 *           example: "00000000-0000-0000-0000-000000000002"
 *         status:
 *           type: string
 *           enum: [pending, confirmed, canceled, rescheduled]
 *           description: The current status of the appointment
 *           example: "pending"
 *         appointmentDateTime:
 *           type: string
 *           format: date-time
 *           description: The date and time of the appointment
 *           example: "2024-08-20T14:30:00Z"
 *         reasonForVisit:
 *           type: string
 *           description: The reason for the patient's visit
 *           example: "Routine check-up"
 *         service:
 *           type: string
 *           description: The service requested for the appointment
 *           example: "General Consultation"
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the service for the appointment
 *           example: 50.0
 *         rescheduledDateTime:
 *           type: string
 *           format: date-time
 *           description: The date and time when the appointment was rescheduled, if applicable
 *           example: "2024-08-21T16:00:00Z"
 *         rescheduleReason:
 *           type: string
 *           description: The reason for rescheduling the appointment, if applicable
 *           example: "Doctor unavailable at the original time"
 *         cancellationReason:
 *           type: string
 *           description: The reason for canceling the appointment, if applicable
 *           example: "Patient requested cancellation"
 */

/**
 * @openapi
 * /api/v1/appointment/{practiceId}:
 *   post:
 *     summary: Book an appointment with a practice
 *     description: Allows patients to book an appointment with a specific practice.
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: practiceId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the practice where the appointment is to be booked
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointmentDateTime:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time of the appointment
 *                 example: "2024-08-20T14:30:00Z"
 *               reasonForVisit:
 *                 type: string
 *                 description: The reason for the patient's visit
 *                 example: "Routine check-up"
 *               service:
 *                 type: string
 *                 description: The service requested for the appointment
 *                 example: "Consultation"
 *     responses:
 *       '201':
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       '400':
 *         description: Requested service is not available
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Requested service is not available"
 *       '403':
 *         description: Only patients can book the appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Only patients can book the appointments"
 *       '404':
 *         description: Practice not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The practice doesn't exist"
 *       '409':
 *         description: The selected time slot is not available due to a scheduling conflict
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "The selected time slot is not available due to a scheduling conflict."
 *                 details:
 *                   type: string
 *                   example: "This practice isn't available at this time."
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
 * /api/v1/appointment/patient:
 *   get:
 *     summary: Retrieve all appointments for the authenticated patient
 *     description: Allows patients to view all their booked appointments.
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Appointments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Appointments retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Appointment'
 *       '403':
 *         description: Only patients can access this route
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Only patients can access this route"
 *       '404':
 *         description: No appointments found for the patient
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "You don't have any appointments"
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
 * /api/v1/appointment/practice:
 *   get:
 *     summary: Retrieve all appointments for the authenticated doctor's practice
 *     description: Allows doctors to view all appointments booked for their practice.
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Appointments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Appointments retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Appointment'
 *       '403':
 *         description: Only doctors can access this route
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Only doctors can access this route"
 *       '404':
 *         description: No appointments found for the practice or practice not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   examples:
 *                     noAppointments: "You don't have any appointments"
 *                     noPractice: "You don't have a practice"
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
 * /api/v1/appointment/practice/confirm/{appointmentId}:
 *   put:
 *     summary: Confirm an appointment
 *     description: Allows doctors to confirm a pending appointment.
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: appointmentId
 *         in: path
 *         required: true
 *         description: ID of the appointment to be confirmed
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '200':
 *         description: Appointment confirmed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Appointment confirmed successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Appointment'
 *       '403':
 *         description: Only doctors can access this route
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Only doctors can access this route"
 *       '404':
 *         description: Practice or appointment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     noPractice: "You don't have a practice"
 *                     noAppointment: "Appointment not found"
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
 * /api/v1/appointment/practice/cancel/{appointmentId}:
 *   put:
 *     summary: Cancel an appointment
 *     description: Allows doctors to cancel a pending or confirmed appointment.
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: appointmentId
 *         in: path
 *         required: true
 *         description: ID of the appointment to be canceled
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 description: Reason for canceling the appointment
 *                 example: "Doctor is unavailable at the scheduled time."
 *     responses:
 *       '200':
 *         description: Appointment canceled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Appointment canceled successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Appointment'
 *       '403':
 *         description: Only doctors can access this route
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Only doctors can access this route"
 *       '404':
 *         description: Practice or appointment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     noPractice: "You don't have a practice"
 *                     noAppointment: "Appointment not found"
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
 * /api/v1/appointment/practice/reschedule/{appointmentId}:
 *   put:
 *     summary: Reschedule an appointment
 *     description: Allows doctors to reschedule a pending appointment to a new date and time.
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: appointmentId
 *         in: path
 *         required: true
 *         description: ID of the appointment to be rescheduled
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newDateTime:
 *                 type: string
 *                 format: date-time
 *                 description: The new date and time for the appointment
 *                 example: "2024-08-21T10:30:00Z"
 *               reason:
 *                 type: string
 *                 description: Reason for rescheduling the appointment
 *                 example: "Doctor is unavailable at the original time."
 *     responses:
 *       '200':
 *         description: Appointment rescheduled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Appointment rescheduled successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Appointment'
 *       '403':
 *         description: Only doctors can access this route
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Only doctors can access this route"
 *       '404':
 *         description: Practice or appointment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     noPractice: "You don't have a practice"
 *                     noAppointment: "Appointment not found"
 *       '409':
 *         description: Scheduling conflict with the new time slot
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "The selected time slot is not available due to a scheduling conflict."
 *                 details:
 *                   type: string
 *                   example: "This practice isn't available at this time."
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
 * /api/v1/appointment/patient/confirm/{appointmentId}:
 *   put:
 *     summary: Confirm an appointment
 *     description: Allows patients to confirm a recently rescheduled appointment.
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: appointmentId
 *         in: path
 *         required: true
 *         description: ID of the appointment to be confirmed
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '200':
 *         description: Appointment confirmed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Appointment confirmed successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Appointment'
 *       '403':
 *         description: Only patients can access this route
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Only patients can access this route"
 *       '404':
 *         description: Practice or appointment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     noAppointment: "Appointment not found"
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
 * /api/v1/appointment/patient/cancel/{appointmentId}:
 *   put:
 *     summary: cancel an appointment
 *     description: Allows patients to cancel a recently rescheduled appointment.
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: appointmentId
 *         in: path
 *         required: true
 *         description: ID of the appointment to be cancelled
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '200':
 *         description: Appointment cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Appointment cancelled successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Appointment'
 *       '403':
 *         description: Only patients can access this route
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Only patients can access this route"
 *       '404':
 *         description: appointment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     noAppointment: "Appointment not found"
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
