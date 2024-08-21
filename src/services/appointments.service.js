import { where } from 'sequelize';
import db from '../models/index.js';
import { Op } from 'sequelize';

export class AppointmentService {
    static async bookAppointment(user_id, practice_id, appointmentData) {
        try {
            const { appointmentDateTime, reasonForVisit, service } = appointmentData;
            const appointmentDate = new Date(appointmentDateTime);

            const practiceProfile = await db.PracticeProfile.findOne({
                where: { id: practice_id },
                attributes: ['services', 'pricing'],
            });

            if (!practiceProfile) {
                throw new Error('Practice not found');
            }

            const { services, pricing } = practiceProfile;

            if (!services[service]) {
                throw new Error('Requested service is not available');
            }

            const price = pricing[service];

            const startRange = new Date(appointmentDate.getTime() - 30 * 60 * 1000);
            const endRange = new Date(appointmentDate.getTime() + 30 * 60 * 1000);

            const conflictingAppointment = await db.Appointment.findOne({
                where: {
                    practice_id,
                    appointmentDateTime: {
                        [db.Sequelize.Op.between]: [startRange, endRange],
                    },
                    status: {
                        [db.Sequelize.Op.not]: 'canceled',
                    },
                },
            });

            if (conflictingAppointment) {
                throw new Error("This practice isn't available at this time.");
            }

            const appointment = await db.Appointment.create({
                patient_id: user_id,
                practice_id,
                appointmentDateTime,
                reasonForVisit,
                service,
                price,
            });

            return appointment;
        } catch (error) {
            throw error;
        }
    }

    static async getPatientAppointments(user_id) {
        try {
            const appointments = await db.Appointment.findAll({ where: { patient_id: user_id } });
            return appointments;
        } catch (error) {
            throw error;
        }
    }

    static async getPracticeAppointments(user_id) {
        try {
            let practiceId = await db.PracticeProfile.findOne({
                where: { doctor_id: user_id },
                attributes: ['id'],
            });

            if (!practiceId) {
                throw new Error('practice not found');
            }

            practiceId = practiceId.dataValues.id;

            const appointments = await db.Appointment.findAll({
                where: { practice_id: practiceId },
            });

            return appointments;
        } catch (error) {
            throw error;
        }
    }

    static async confirmAppointment(user_id, appointmentId) {
        try {
            let practiceProfile = await db.PracticeProfile.findOne({
                where: { doctor_id: user_id },
                attributes: ['id'],
            });

            if (!practiceProfile) {
                throw new Error('practice not found');
            }

            const practiceProfileId = practiceProfile.id;

            const appointment = await db.Appointment.findOne({
                where: {
                    id: appointmentId,
                    practice_id: practiceProfileId,
                },
            });

            if (!appointment) {
                throw new Error('Appointment not found');
            }

            if (appointment.status === 'canceled') {
                throw new Error('Appointment is canceled and cannot be confirmed');
            }

            if (appointment.status === 'confirmed') {
                throw new Error('Appointment is already confirmed');
            }

            if (appointment.status !== 'pending') {
                throw new Error('Only pending appointments can be confirmed');
            }

            appointment.status = 'confirmed';
            await appointment.save();

            return appointment;
        } catch (error) {
            throw error;
        }
    }

    static async cancelAppointment(user_id, appointmentId, reason) {
        try {
            let practiceProfile = await db.PracticeProfile.findOne({
                where: { doctor_id: user_id },
                attributes: ['id'],
            });

            if (!practiceProfile) {
                throw new Error('practice not found');
            }

            const practiceProfileId = practiceProfile.id;

            const appointment = await db.Appointment.findOne({
                where: {
                    id: appointmentId,
                    practice_id: practiceProfileId,
                },
            });

            if (!appointment) {
                throw new Error('Appointment not found');
            }

            if (appointment.status === 'canceled') {
                throw new Error('Appointment Already cancelled');
            }

            appointment.status = 'canceled';
            appointment.cancellationReason = reason;
            await appointment.save();

            return appointment;
        } catch (error) {
            throw error;
        }
    }

    static async rescheduleAppointment(user_id, appointmentId, rescheduleData) {
        try {
            const { newDateTime, reason } = rescheduleData;
            let practiceProfile = await db.PracticeProfile.findOne({
                where: { doctor_id: user_id },
                attributes: ['id'],
            });

            if (!practiceProfile) {
                throw new Error('practice not found');
            }

            const practiceProfileId = practiceProfile.id;

            const appointment = await db.Appointment.findOne({
                where: { id: appointmentId, practice_id: practiceProfileId },
            });

            if (!appointment) {
                throw new Error('Appointment not found');
            }

            if (appointment.status === 'canceled') {
                throw new Error('Appointment is canceled');
            }

            if (appointment.status === 'rescheduled') {
                throw new Error('Appointment is already rescheduled');
            }

            const appointmentDate = new Date(newDateTime);

            const startRange = new Date(appointmentDate.getTime() - 30 * 60 * 1000);
            const endRange = new Date(appointmentDate.getTime() + 30 * 60 * 1000);

            const conflictingAppointment = await db.Appointment.findOne({
                where: {
                    practice_id: practiceProfileId,
                    appointmentDateTime: {
                        [db.Sequelize.Op.between]: [startRange, endRange],
                    },
                    status: {
                        [db.Sequelize.Op.not]: 'canceled',
                    },
                },
            });

            if (conflictingAppointment) {
                throw new Error("This practice isn't available at this time.");
            }

            appointment.appointmentDateTime = appointmentDate;
            appointment.rescheduledDateTime = new Date();
            appointment.rescheduleReason = reason;
            appointment.status = 'rescheduled';
            await appointment.save();

            return appointment;
        } catch (error) {
            throw error;
        }
    }

    static async patientConfirmRescheduledAppointment(user_id, appointment_id) {
        try {
            const appointment = await db.Appointment.findOne({
                where: {
                    id: appointment_id,
                    patient_id: user_id,
                },
            });

            if (!appointment) {
                throw new Error('Appointment not found');
            }

            if (appointment.status === 'canceled') {
                throw new Error('Appointment is canceled and cannot be confirmed');
            }

            if (appointment.status === 'confirmed') {
                throw new Error('Appointment is already confirmed');
            }

            if (appointment.status !== 'rescheduled') {
                throw new Error('Only rescheduled appointments can be confirmed by the patient');
            }

            appointment.status = 'confirmed';
            await appointment.save();

            return appointment;
        } catch (error) {
            throw error;
        }
    }

    static async patientCancelRescheduledAppointment(user_id, appointment_id) {
        try {
            const appointment = await db.Appointment.findOne({
                where: {
                    id: appointment_id,
                    patient_id: user_id,
                },
            });

            if (!appointment) {
                throw new Error('Appointment not found');
            }

            if (appointment.status === 'canceled') {
                throw new Error('Appointment is already canceled');
            }

            if (appointment.status === 'confirmed') {
                throw new Error(
                    'Appointment is already confirmed and cannot be canceled by the patient',
                );
            }

            if (appointment.status !== 'rescheduled') {
                throw new Error('Only rescheduled appointments can be canceled by the patient');
            }

            appointment.status = 'canceled';
            await appointment.save();

            return appointment;
        } catch (error) {
            throw error;
        }
    }
}
