import { AppointmentService } from '../services/index.js';

export class AppointmentController {
    static async bookAppointment(req, res) {
        try {
            const userId = req.user.user_id;

            if (req.user.role !== 'PATIENT') {
                return res.status(403).send('Only patients can book the appointments');
            }

            const { practiceId } = req.params;
            const appointmentData = req.body;

            const bookedAppointment = await AppointmentService.bookAppointment(
                userId,
                practiceId,
                appointmentData,
            );

            return res.status(201).json({
                status: 'success',
                message: 'Appointment created successfully',
                data: bookedAppointment,
            });
        } catch (error) {
            if (error.message === 'Requested service is not available') {
                return res.status(400).json({ message: 'Requested service is not available' });
            }

            if (error.message === 'Practice not found') {
                return res.status(404).json({ message: "The practice doesn't exist" });
            }

            if (error.message === "This practice isn't available at this time.") {
                return res.status(409).json({
                    status: 'error',
                    message:
                        'The selected time slot is not available due to a scheduling conflict.',
                    details: "This practice isn't available at this time.",
                });
            }

            console.error('Error booking the appointment:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async getPatientAppointments(req, res) {
        try {
            const userId = req.user.user_id;
            if (req.user.role !== 'PATIENT') {
                return res.status(403).send('Only patients can access this route');
            }

            const appointments = await AppointmentService.getPatientAppointments(userId);

            if (appointments.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: "You don't have any appointments",
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Appointments retrieved successfully',
                data: appointments,
            });
        } catch (error) {
            console.error('Error getting the appointments:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async getPracticeAppointments(req, res) {
        try {
            const userId = req.user.user_id;
            if (req.user.role !== 'DOCTOR') {
                return res.status(403).send('Only doctors can access this route');
            }

            const appointments = await AppointmentService.getPracticeAppointments(userId);

            if (appointments.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    message: "You don't have any appointments",
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Appointments retrieved successfully',
                data: appointments,
            });
        } catch (error) {
            if (error.message === 'practice not found') {
                return res.status(404).json({ message: 'You dont have a practice' });
            }

            console.error('Error getting the appointments:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async confirmAppointment(req, res) {
        try {
            const userId = req.user.user_id;

            if (req.user.role !== 'DOCTOR') {
                return res.status(403).send('Only doctors can access this route');
            }

            const { appointmentId } = req.params;

            const confirmedAppointment = await AppointmentService.confirmAppointment(
                userId,
                appointmentId,
            );

            return res.status(200).json({
                status: 'success',
                message: 'Appointment confirmed successfully',
                data: confirmedAppointment,
            });
        } catch (error) {
            const errorMapping = {
                'Practice not found': 404,
                'Appointment not found': 404,
                'Appointment is canceled and cannot be confirmed': 409,
                'Appointment is already confirmed': 409,
                'Only pending appointments can be confirmed': 400,
            };

            const statusCode = errorMapping[error.message] || 500;

            if (statusCode === 500) {
                console.error('Error confirming the appointment:', error);
            }

            return res.status(statusCode).json({ message: error.message });
        }
    }

    static async cancelAppointment(req, res) {
        try {
            const userId = req.user.user_id;

            if (req.user.role !== 'DOCTOR') {
                return res.status(403).send('Only doctors can access this route');
            }

            const { appointmentId } = req.params;
            const { reason } = req.body;

            const cancelledAppointment = await AppointmentService.cancelAppointment(
                userId,
                appointmentId,
                reason,
            );

            return res.status(200).json({
                status: 'success',
                message: 'Appointment canceled successfully',
                data: cancelledAppointment,
            });
        } catch (error) {
            if (error.message === 'practice not found') {
                return res.status(404).json({ message: 'You dont have a practice' });
            }

            if (error.message === 'Appointment Already cancelled') {
                return res.status(404).json({ message: 'Appointment Already cancelled' });
            }

            if (error.message === 'Appointment not found') {
                return res.status(404).json({ message: 'Appointment not found' });
            }

            console.error('Error canceling the appointment:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async rescheduleAppointment(req, res) {
        try {
            const userId = req.user.user_id;

            if (req.user.role !== 'DOCTOR') {
                return res.status(403).send('Only doctors can access this route');
            }

            const { appointmentId } = req.params;
            const rescheduleData = req.body;

            const rescheduledAppointment = await AppointmentService.rescheduleAppointment(
                userId,
                appointmentId,
                rescheduleData,
            );

            return res.status(200).json({
                status: 'success',
                message: 'Appointment rescheduled successfully',
                data: rescheduledAppointment,
            });
        } catch (error) {
            const errorMapping = {
                'practice not found': { statusCode: 404, message: "You don't have a practice" },
                'Appointment not found': { statusCode: 404, message: 'Appointment not found' },
                'Appointment is canceled': { statusCode: 409, message: 'Appointment is canceled' },
                'Appointment is already rescheduled': {
                    statusCode: 409,
                    message: 'Appointment is already rescheduled',
                },
                "This practice isn't available at this time.": {
                    statusCode: 409,
                    message:
                        'The selected time slot is not available due to a scheduling conflict.',
                },
            };

            const mappedError = errorMapping[error.message];
            if (mappedError) {
                return res.status(mappedError.statusCode).json({ message: mappedError.message });
            }

            console.error('Error rescheduling the appointment:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async patientConfirmRescheduledAppointment(req, res) {
        try {
            const userId = req.user.user_id;

            if (req.user.role !== 'PATIENT') {
                return res.status(403).send('Only patients can access this route');
            }

            const { appointmentId } = req.params;

            const confirmedAppointment =
                await AppointmentService.patientConfirmRescheduledAppointment(
                    userId,
                    appointmentId,
                );

            return res.status(200).json({
                status: 'success',
                message: 'Appointment confirmed successfully',
                data: confirmedAppointment,
            });
        } catch (error) {
            const errorMapping = {
                'Appointment not found': 404,
                'Appointment is canceled and cannot be confirmed': 409,
                'Appointment is already confirmed': 409,
                'Only rescheduled appointments can be confirmed by the patient': 400,
            };

            const statusCode = errorMapping[error.message] || 500;

            if (statusCode === 500) {
                console.error('Error confirming the appointment:', error);
            }

            return res.status(statusCode).json({ message: error.message });
        }
    }

    static async patientCancelRescheduledAppointment(req, res) {
        try {
            const userId = req.user.user_id;

            if (req.user.role !== 'PATIENT') {
                return res.status(403).send('Only patients can access this route');
            }

            const { appointmentId } = req.params;

            const cancelledAppointment =
                await AppointmentService.patientCancelRescheduledAppointment(userId, appointmentId);

            return res.status(200).json({
                status: 'success',
                message: 'Appointment cancelled successfully',
                data: cancelledAppointment,
            });
        } catch (error) {
            const errorMapping = {
                'Appointment not found': 404,
                'Appointment is already canceled': 409,
                'Appointment is already confirmed and cannot be canceled by the patient': 409,
                'Only rescheduled appointments can be canceled by the patient': 400,
            };

            const statusCode = errorMapping[error.message] || 500;

            if (statusCode === 500) {
                console.error('Error cancelling the appointment:', error);
            }

            return res.status(statusCode).json({ message: error.message });
        }
    }
}
