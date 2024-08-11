import express from 'express';
import { UserContoller } from '../controllers/index.js';

const userRoute = express.Router();

userRoute.get('/user/users', UserContoller.getAllUsers);
userRoute.post('/user/create', UserContoller.userRegister);

export default userRoute;
