import express from 'express';
import { UserContoller } from '../controllers/index.js';

const userRoute = express.Router();

userRoute.get('/user/users', UserContoller.getAllUsers);
userRoute.post('/user/create', UserContoller.userRegister);
userRoute.get('/user/verify/:token', UserContoller.emailVerification);
userRoute.post('/user/resend-verification-token', UserContoller.resendEmailVerification);

export default userRoute;
