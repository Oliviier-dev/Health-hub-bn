import express from 'express';
import { isAuthenticated } from '../utils/index.js';
import { AppointmentController } from '../controllers/index.js';

const appointmentRoute = express.Router();

appointmentRoute.post('/:practiceId', isAuthenticated, AppointmentController.bookAppointment);
appointmentRoute.get('/patient', isAuthenticated, AppointmentController.getPatientAppointments);
appointmentRoute.get('/practice', isAuthenticated, AppointmentController.getPracticeAppointments);
appointmentRoute.put(
    '/confirm/:appointmentId',
    isAuthenticated,
    AppointmentController.confirmAppointment,
);
appointmentRoute.put(
    '/cancel/:appointmentId',
    isAuthenticated,
    AppointmentController.cancelAppointment,
);
appointmentRoute.put(
    '/reschedule/:appointmentId',
    isAuthenticated,
    AppointmentController.rescheduleAppointment,
);

export default appointmentRoute;
