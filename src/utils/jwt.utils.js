import jwt from 'jsonwebtoken';

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
        throw new Error('Invalid Token');
    }
};

const decodeToken = (token) => {
    return jwt.decode(token);
};

export { generateToken, verifyToken, decodeToken };
