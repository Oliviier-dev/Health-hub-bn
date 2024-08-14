import express from 'express';
import { UserContoller } from '../controllers/index.js';

const userRoute = express.Router();

userRoute.get('/users', UserContoller.getAllUsers);
userRoute.post('/create', UserContoller.userRegister);

export default userRoute;
