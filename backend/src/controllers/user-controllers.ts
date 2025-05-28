import { NextFunction, Request, Response } from 'express';
import User from '../models/User.js';
import { hash, compare } from 'bcrypt';
import { createToken } from '../utils/token-manager.js';
import { COOKIE_NAME } from '../utils/constants.js';


// Get all users
export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    try {
        const users= await User.find();
        return res.status(200).json({message: "Get all users successfully", users});
    }
    catch (error) {
        return res.status(500).json({message: "Error", error});
    }
};

// User signup
export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    try {

        const { name, email, password } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(401).json({message: "User already exists"});

        // Hash the password to store it securely
        const hashedPassword = await hash(password, 10); // Hash the password

        // Create a new user with the hashed password
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Clear the cookie if it exists
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            signed: true, 
            domain: "localhost",
            path: "/",
        })

        // Create a token for the user in 7 days
        const token = createToken(user._id.toString(), user.email.toString(), "7d");

        // Set the cookie with the token
        const expires = new Date();
        expires.setDate(expires.getDate() + 7)
        res.cookie(COOKIE_NAME, token, {
            path: "/", 
            domain : "localhost", 
            expires,
            httpOnly: true,
            signed: true,
        });

        return res.status(201).json({message: "Sign up successfully", name: user.name, email: user.email});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error", error});
    }
};

// User login
export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    try {
        const { email, password } = req.body;

        // Check if the email exists
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({message: "User not found"});

        // Check if the password is correct
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) return res.status(403).json({message: "Incorrect password"});

        // Clear the cookie if it exists
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            signed: true, 
            domain: "localhost",
            path: "/",
        })

        // Create a token for the user in 7 days
        const token = createToken(user._id.toString(), user.email.toString(), "7d");

        // Set the cookie with the token
        const expires = new Date();
        expires.setDate(expires.getDate() + 7)
        res.cookie(COOKIE_NAME, token, {
            path: "/", 
            domain : "localhost", 
            expires,
            httpOnly: true,
            signed: true,
        });


        return res.status(201).json({message: "Login successfully", name: user.name, email: user.email});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error", error});
    }
};

// Check token existed to protect the route and allow user without login
export const verifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    try {
        
        // Check if the token existed
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({message: "User not registered OR Token expired"});
        }

        // Check current token with token of user 
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({message: "Permissions didn't match"});
        }

        return res.status(201).json({message: "Login successfully", name: user.name, email: user.email});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error", error});
    }
};

// Log out
export const userLogout = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    try {


        // Check if the token existed
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({message: "User not registered OR Token expired"});
        }

        // Check current token with token of user 
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({message: "Permissions didn't match"});
        }

        // Clear the cookie if it exists
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            signed: true, 
            domain: "localhost",
            path: "/",
        })


        return res.status(201).json({message: "Logout successfully"});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error", error});
    }
};