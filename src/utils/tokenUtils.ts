import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY as string;

export const generateToken = (userId: string) => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET_KEY);
};