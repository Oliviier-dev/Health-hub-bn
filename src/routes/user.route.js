import express from 'express';
import { UserContoller } from '../controllers/index.js';
import { isAuthenticated } from '../utils/index.js';

const userRoute = express.Router();

userRoute.get('/users', UserContoller.getAllUsers);
userRoute.post('/create', UserContoller.userRegister);
userRoute.get('/profile', isAuthenticated, UserContoller.getUserProfile);
userRoute.put('/profile', isAuthenticated, UserContoller.updateUserProfile);

export default userRoute;
