import express from 'express';
import userRoute from './user.route.js';
import authRoute from './auth.route.js';
import practiceRoute from './practice.route.js';
import appointmentRoute from './appointments.route.js';
import paymentRoute from './payment.route.js';

const router = express.Router();

const routes = [
    { path: 'user', route: userRoute },
    { path: 'auth', route: authRoute },
    { path: 'practice', route: practiceRoute },
    { path: 'appointment', route: appointmentRoute },
    { path: 'payment', route: paymentRoute },
];

routes.forEach(({ path, route }) => {
    router.use(`/api/v1/${path}`, route);
});

export default router;
