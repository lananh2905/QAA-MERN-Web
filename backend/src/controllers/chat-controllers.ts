import { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';
import { openai } from '../config/openai-config.js';
import axios from 'axios';
const PAWAN_API_KEY="pk-adkmGIRjGvykzduHnNCbMMKYwmDEkKeJHMlpTytInZwmbrUT"

// Generate chat completiong using Deepseek
export const generateChatCompletion = async (
      req: Request, 
      res: Response,
      next: NextFunction,
    ) => {

    try {

      const { message } = req.body;

      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
          return res.status(401).json({message: "User not registered OR Token expired"});
      }

      // Create type of chatMessage
      type ChatMessage = {
        role: "system" | "user" | "assistant";
        content: string;
      };

      // grab chats of user
      const chats: ChatMessage[] = user.chats.map(({ role, content }) => ({
        role: role as ChatMessage["role"],
        content
      }));

      chats.push({ content: message, role: "user"});
      user.chats.push({ content: message, role: "user" })

      // call api from localhost
      const prompt = chats
        .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
        .join("\n") + "\nAssistant:";

      const response = await axios.post('http://localhost:11434/api/generate', {
        model: 'deepseek-r1:1.5b',
        prompt,
        stream: false,
        logprobs: false,
      });

      const rawResponse = response.data.response

        
      const cleaned = rawResponse.replace(/<think>[\s\S]*?<\/think>/g, '');
      
      cleaned
          .split('\n')
          .map(line => line.trim())
          .filter(line => line !== '')
          .join('\n');



      // Add chat reponse into user
      user.chats.push({ role: "assistant", content: cleaned});
      await user.save();
            
      return res.status(200).json(user.chats);

    } catch (err) {
      console.log(err.message)
      res.status(500).json({
        message: "Something wrong with Model",
        err
      });  

    }
    

};


// Get all chats of users
export const sendChatToUser = async (
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

        return res.status(201).json({message: "OK", chats: user.chats});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error", error});
    }
};


// Delete chat conversations
export const deleteChats = async (
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

      user.chats.splice(0, user.chats.length);
      await user.save();

      return res.status(201).json({message: "OK"});
  }
  catch (error) {
      console.log(error);
      return res.status(500).json({message: "Error", error});
  }
};
