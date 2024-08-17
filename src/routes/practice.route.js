import express from 'express';
import { isAuthenticated } from '../utils/index.js';
import { PracticeContoller } from '../controllers/index.js';

const practiceRoute = express.Router();

practiceRoute.get('/profile/all', PracticeContoller.getAllPractices);
practiceRoute.get('/profile/:practiceId', PracticeContoller.getPracticeById);
practiceRoute.post('/profile/create', isAuthenticated, PracticeContoller.createPractice);
practiceRoute.put('/profile/update', isAuthenticated, PracticeContoller.updatePractice);

export default practiceRoute;
