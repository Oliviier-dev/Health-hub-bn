import express from 'express';
import { isAuthenticated } from '../utils/index.js';
import { AppointmentController } from '../controllers/index.js';

const appointmentRoute = express.Router();

appointmentRoute.post('/:practiceId', isAuthenticated, AppointmentController.bookAppointment);
appointmentRoute.get('/patient', isAuthenticated, AppointmentController.getPatientAppointments);
appointmentRoute.get('/practice', isAuthenticated, AppointmentController.getPracticeAppointments);
appointmentRoute.put(
    '/practice/confirm/:appointmentId',
    isAuthenticated,
    AppointmentController.confirmAppointment,
);
appointmentRoute.put(
    '/practice/cancel/:appointmentId',
    isAuthenticated,
    AppointmentController.cancelAppointment,
);
appointmentRoute.put(
    '/practice/reschedule/:appointmentId',
    isAuthenticated,
    AppointmentController.rescheduleAppointment,
);
appointmentRoute.put(
    '/patient/confirm/:appointmentId',
    isAuthenticated,
    AppointmentController.patientConfirmRescheduledAppointment,
);
appointmentRoute.put(
    '/patient/cancel/:appointmentId',
    isAuthenticated,
    AppointmentController.patientConfirmRescheduledAppointment,
);

export default appointmentRoute;
