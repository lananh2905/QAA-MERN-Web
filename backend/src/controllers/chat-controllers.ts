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
      

      const { context, question, parameters } = req.body;

      if (!context || !question) {
        return res.status(400).json({ message: "Context and question are required" });
      }

      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
          return res.status(401).json({message: "User not registered OR Token expired"});
      }


      user.chats.push({role: "user", context: context,  question: question })

      // call api from hugging face
      
      const response = await fetch("https://gty4rt35e4w5hr4k.us-east4.gcp.endpoints.huggingface.cloud", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}` || "",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: {
            question,
            context,
          },
          options: {
            wait_for_model: true
      }})
      });
      if (!response.ok) {
        throw new Error(`Hugging Face API error: ${response.statusText}`);
      }

      const result = await response.json();

      // Add chat reponse into user
      user.chats.push({ role: "assistant", context: context, question: result.answer, score: result.score});
      await user.save();

      return res.status(200).json(user.chats); 

    }  catch (err: any) {
        console.error("Error generating chat completion:", err);
        res.status(500).json({
          message: "Something went wrong while generating the answer",
          error: err.message,
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
