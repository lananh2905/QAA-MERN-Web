import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { COOKIE_NAME } from './constants.js';

// Create a token with a payload containing the user's id and email
export const createToken = (id: string, email: string, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: expiresIn,
    });
    return token;
};

// Check if the token is valid -> Alow the user without login
export const verifyToken = async (
    req: Request, 
    res: Response, 
    next: NextFunction
    ) => {
        const token = req.signedCookies[COOKIE_NAME];

        if (!token || token.trim() === "") {
            return res.status(401).json({message: "Token not found"});
        }

        return new Promise<void>((resolve, reject) => {
            return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
                if (err) {
                    reject(err.message);
                    return res.status(401).json({message: "Token Expired"});
                }
                else {

                    resolve();
                    res.locals.jwtData = success;
                    return next();
                }
            }
            );
        }
    );
};