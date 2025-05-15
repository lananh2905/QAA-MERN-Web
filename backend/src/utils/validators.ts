import { body, ValidationChain, validationResult} from "express-validator";
import { NextFunction, Request, Response } from "express";

// Middleware to validate request body
const validate = (validations : ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        // Run all validations
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }

        // Check for validation errors
        // If there are no errors, move to the next middleware
        const errors = validationResult(req);
        if(errors.isEmpty()) {
            return next();
        }

        // If there are errors, return a 422 response with the errors
        return res.status(422).json({errors: errors.array()});
    }
};


// Login validator
const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password")
        .trim()
        .isLength({ min: 6})
        .withMessage("Password must be at least 6 characters long"),
];

// Signup validator
const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,
];

// Chat completion validator
const chatCompletionValidation = [
    body("context").notEmpty().withMessage("Context is required"),
    body("question").notEmpty().withMessage("Question is required")
];

export { validate, signupValidator, loginValidator, chatCompletionValidation };