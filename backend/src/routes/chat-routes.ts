import { verify } from 'crypto';
import { Router } from 'express';
import { verifyToken } from '../utils/token-manager.js';
import { chatCompletionValidation, validate } from '../utils/validators.js';
import { generateChatCompletion } from '../controllers/chat-controllers.js';

// Protected API
const chatRouter = Router();

chatRouter.post(
    "/new", 
    validate(chatCompletionValidation), 
    verifyToken, 
    generateChatCompletion
);

export default chatRouter;