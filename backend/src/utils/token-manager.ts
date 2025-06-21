// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
// import { COOKIE_NAME } from './constants.js';
// import dotenv from 'dotenv';
// dotenv.config();

// // Create a token with a payload containing the user's id and email
// export const createToken = (id: string, email: string, expiresIn: any) => {
//     const payload = { id, email };
//     const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
//         expiresIn: expiresIn,
//     });
//     return token;
// };

// // Check if the token is valid -> Alow the user without login
// export const verifyToken = async (
//     req: Request, 
//     res: Response, 
//     next: NextFunction
//     ) => {
//         const token = req.signedCookies[COOKIE_NAME];

//         if (!token || token.trim() === "") {
//             return res.status(401).json({message: "Token not found"});
//         }

//         return new Promise<void>((resolve, reject) => {
//             return jwt.verify(token, process.env.JWT_SECRET_KEY, (err, success) => {
//                 if (err) {
//                     reject(err.message);
//                     return res.status(401).json({message: "Token Expired"});
//                 }
//                 else {

//                     resolve();
//                     res.locals.jwtData = success;
//                     return next();
//                 }
//             }
//             );
//         }
//     );
// };


import jwt, { SignOptions } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { COOKIE_NAME } from './constants.js';
import dotenv from 'dotenv';
dotenv.config();

// Ensure JWT_SECRET_KEY is defined
const JWT_SECRET = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET_KEY environment variable is required');
}

// Create a token with a payload containing the user's id and email
export const createToken = (id: string, email: string, expiresIn: string) => {
    const payload = { id, email };
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: expiresIn as any, // Type assertion to bypass strict typing
    });
    return token;
};

// Check if the token is valid -> Allow the user without login
export const verifyToken = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => 
{
    const token = req.signedCookies[COOKIE_NAME];
    
    if (!token || token.trim() === "") 
    {
        res.status(401).json({message: "Token not found"});
        return;
    }
    
    try 
    {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.locals.jwtData = decoded;
        next();
    } 
    catch (err) 
    {
        const errorMessage = err instanceof Error ? err.message : 'Token verification failed';
        res.status(401).json({message: "Token Expired", error: errorMessage});
    }
};