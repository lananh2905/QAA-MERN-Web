import { verify } from 'crypto';
import { Router } from 'express';
import { verifyToken } from '../utils/token-manager.js';
import { chatCompletionValidation, validate } from '../utils/validators.js';
import { deleteChats, generateChatCompletion, sendChatToUser } from '../controllers/chat-controllers.js';

// Protected API
const chatRouter = Router();

chatRouter.post(
    "/new", 
    validate(chatCompletionValidation), 
    verifyToken, 
    generateChatCompletion
);

chatRouter.get(
    "/all-chats",  
    verifyToken, 
    sendChatToUser
);


chatRouter.delete(
    "/deltete-all-chats",  
    verifyToken, 
    deleteChats
);


export default chatRouter;