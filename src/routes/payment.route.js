import express from 'express';
import { isAuthenticated } from '../utils/index.js';
import { PaymentContoller } from '../controllers/index.js';

const paymentRoute = express.Router();

paymentRoute.post(
    '/:appointmentId/create-session',
    isAuthenticated,
    PaymentContoller.createPaymentSession,
);
paymentRoute.get('/complete', isAuthenticated, PaymentContoller.completePayment);
paymentRoute.get('/cancel', isAuthenticated, PaymentContoller.cancelPayment);
paymentRoute.get('/all', isAuthenticated, PaymentContoller.getAllUserPayments);

export default paymentRoute;
