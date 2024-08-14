import express from 'express';
import { AuthContoller } from '../controllers/index.js';

const authRoute = express.Router();

authRoute.get('/verify/:token', AuthContoller.emailVerification);
authRoute.post('/resend-verification-token', AuthContoller.resendEmailVerification);
authRoute.post('/login', AuthContoller.userLogin);
authRoute.get('/logout', AuthContoller.userLogout);
authRoute.post('/password-reset', AuthContoller.resetPasswordToken);
authRoute.post('/reset-password/:token', AuthContoller.resetPassword);

export default authRoute;
