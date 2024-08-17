import express from 'express';
import userRoute from './user.route.js';
import authRoute from './auth.route.js';
import practiceRoute from './practice.route.js';

const router = express.Router();

const routes = [
    { path: 'user', route: userRoute },
    { path: 'auth', route: authRoute },
    { path: 'practice', route: practiceRoute },
];

routes.forEach(({ path, route }) => {
    router.use(`/api/v1/${path}`, route);
});

export default router;
