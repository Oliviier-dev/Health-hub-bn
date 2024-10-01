import { PaymentService } from '../services/index.js';

export class PaymentContoller {
    static async getAllUserPayments(req, res) {
        try {
            const userId = req.user.user_id;

            const payments = await PaymentService.getAllUserPayments(userId);

            return res.status(200).json({
                message: 'Payments retrieved successfully',
                payments,
            });
        } catch (error) {
            console.log('Error retrieving payments', error);
            return res.status(500).json({ error: error.message });
        }
    }

    static async createPaymentSession(req, res) {
        try {
            const userId = req.user.user_id;

            if (req.user.role !== 'PATIENT') {
                return res.status(403).send('Only patients can pay for the appointments');
            }

            const appointmentId = req.params.appointmentId;
            const { session, payment } = await PaymentService.createSession(userId, appointmentId);

            return res.status(200).json({
                message: 'Session started successfully. You can continue with your payment',
                payment,
                url: session.url,
            });
        } catch (error) {
            if (error.message === 'Appointment not found') {
                return res.status(404).send({ error: 'Appointment not found' });
            }

            if (error.message === 'unconfirmed appointment') {
                return res
                    .status(400)
                    .send({ error: 'You can only pay for confirmed appointments' });
            }

            if (error.message === 'Payment already completed for this appointment') {
                return res
                    .status(400)
                    .send({ error: 'Payment already completed for this appointment' });
            }

            if (error.message === 'payment completed') {
                return res
                    .status(400)
                    .send({ error: 'You have already paid for this appointment' });
            }

            console.log('Error creating session', error);
            return res.status(500).json({ error: error.message });
        }
    }

    static async completePayment(req, res) {
        try {
            if (req.user.role !== 'PATIENT') {
                return res.status(403).send('Only patients can complete their appointments');
            }

            const userId = req.user.user_id;

            const { stripeId, appointmentId } = req.query;

            const paymentCompleted = await PaymentService.completePayment(
                userId,
                appointmentId,
                stripeId,
            );

            return res.status(200).json({
                message: 'Payment completed successfully',
                paymentCompleted,
            });
        } catch (error) {
            if (error.message === 'Payment not found') {
                return res.status(404).send({ error: 'Payment not found' });
            }

            if (error.message === 'You can only pay for pending payments') {
                return res.status(404).send({ error: 'You can only pay for pending payments' });
            }

            if (error.message === 'Appointment not found') {
                return res.status(404).send({ error: 'Appointment not found' });
            }

            if (error.message === 'Failed to create Zoom meeting') {
                return res.status(400).send({ error: 'Failed to create Zoom meeting' });
            }

            console.log('Error completing the payment', error);
            return res.status(500).json({ error: error.message });
        }
    }

    static async cancelPayment(req, res) {
        try {
            if (req.user.role !== 'PATIENT') {
                return res.status(403).send('Only patients can cancel their appointments');
            }

            const userId = req.user.user_id;

            const { appointmentId, stripeId } = req.query;

            const paymentCancelled = await PaymentService.cancelPayment(
                userId,
                appointmentId,
                stripeId,
            );

            return res.status(200).json({
                message: 'Payment cancelled successfully',
                paymentCancelled,
            });
        } catch (error) {
            if (error.message === 'Payment not found') {
                return res.status(404).send({ error: 'Payment not found' });
            }

            if (error.message === 'You can only cancel pending payments') {
                return res.status(404).send({ error: 'You can only cancel pending payments' });
            }

            console.log('Error cancelling the payment', error);
            return res.status(500).json({ error: error.message });
        }
    }
}
