import { verifyToken } from './index.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        const authorizationCookie = req.cookies['SessionID'];

        if (!authorizationCookie) {
            return res.status(401).send({
                message: 'Unauthenticated access: missing token',
            });
        }

        const payload = verifyToken(authorizationCookie);

        if (!payload) {
            return res.status(401).send({
                message: 'Invalid token',
            });
        }

        const decoded = payload.user;

        if (!decoded) {
            return res.status(401).send({
                message: 'User not found',
            });
        }

        req.user = decoded;

        next();
    } catch (e) {
        console.error(e);
        return res.status(401).send({
            message: 'Unauthorized access: token has expired or it is malformed',
        });
    }
};
