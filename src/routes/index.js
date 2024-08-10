import express from 'express';
import userRoute from './user.route.js';

const router = express.Router();

const routes = [{ path: '', route: userRoute }];

routes.forEach(({ path, route }) => {
    router.use(`/api/v1/${path}`, route);
});

export default router;
