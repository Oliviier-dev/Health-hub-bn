import { where } from 'sequelize';
import db from '../models/index.js';
import Stripe from 'stripe';
import { createZoomMeeting } from '../utils/meetingLink.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export class PaymentService {
    static async getAllUserPayments(userId) {
        try {
            const payments = await db.Payment.findAll({
                where: {
                    patient_id: userId,
                },
            });

            return payments;
        } catch (error) {
            throw new Error('Error retrieving payments: ' + error.message);
        }
    }

    static async createSession(patientId, appointmentId) {
        try {
            const appointment = await db.Appointment.findOne({ where: { id: appointmentId } });

            if (!appointment) {
                throw new Error('Appointment not found');
            }

            if (appointment.status !== 'confirmed') {
                console.log(appointment.status);
                throw new Error('unconfirmed appointment');
            }

            const existingPayment = await db.Payment.findOne({
                where: {
                    appointment_id: appointmentId,
                    payment_status: 'Completed',
                },
            });

            if (existingPayment) {
                throw new Error('Payment already completed for this appointment');
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: `Appointment Payment`,
                            },
                            unit_amount: appointment.price * 100,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url:
                    process.env.IS_LOCAL === 'true'
                        ? `${process.env.LOCAL_URL}/api/v1/payment/complete?stripeId={CHECKOUT_SESSION_ID}&appointmentId=${appointmentId}`
                        : `${process.env.DEPLOYED_URL}/api/v1/payment/complete?stripeId={CHECKOUT_SESSION_ID}&appointmentId=${appointmentId}`,

                cancel_url:
                    process.env.IS_LOCAL === 'true'
                        ? `${process.env.LOCAL_URL}/api/v1/payment/cancel?stripeId={CHECKOUT_SESSION_ID}&appointmentId=${appointmentId}`
                        : `${process.env.DEPLOYED_URL}/api/v1/payment/cancel?stripeId={CHECKOUT_SESSION_ID}&appointmentId=${appointmentId}`,
            });

            let payment = await db.Payment.findOne({
                where: {
                    id: appointmentId,
                    payment_status: 'Completed',
                },
            });

            if (payment) {
                throw new Error('payment completed');
            }

            payment = await db.Payment.create({
                stripeId: session.id,
                patient_id: patientId,
                appointment_id: appointmentId,
                practice_id: appointment.practice_id,
                amount: appointment.price,
                payment_status: 'Pending',
            });

            return { session, payment };
        } catch (error) {
            throw error;
        }
    }

    static async completePayment(patient_id, appointment_id, stripeId) {
        try {
            const payment = await db.Payment.findOne({
                where: {
                    patient_id,
                    appointment_id,
                    stripeId,
                },
            });

            if (!payment) {
                throw new Error('Payment not found');
            }

            if (payment.payment_status !== 'Pending') {
                throw new Error('You can only pay for pending payments');
            }

            const appointment = await db.Appointment.findOne({
                where: {
                    id: appointment_id,
                    patient_id,
                },
            });

            if (!appointment) {
                throw new Error('Appointment not found');
            }

            const topic = `${appointment.reasonForVisit} Meeting`;
            const start_time = appointment.appointmentDateTime;

            // Create meeting and wait for the result
            const result = await createZoomMeeting(topic, start_time);

            if (!result) {
                throw new Error('Failed to create Zoom meeting');
            }

            // Update payment status
            await payment.update({ payment_status: 'Completed' });

            // Update appointment with meeting details
            await appointment.update({
                meeting_link: result.meeting_url,
                meeting_password: result.password,
            });

            return { payment, appointment, result };
        } catch (error) {
            throw error;
        }
    }

    static async cancelPayment(patient_id, appointment_id, stripeId) {
        try {
            const payment = await db.Payment.findOne({
                where: {
                    patient_id,
                    appointment_id,
                    stripeId,
                },
            });

            if (!payment) {
                throw new Error('Payment not found');
            }

            if (payment.payment_status !== 'Pending') {
                throw new Error('You can only cancel pending payments');
            }

            await payment.update({ payment_status: 'Canceled' });
            return payment;
        } catch (error) {
            throw error;
        }
    }
}
