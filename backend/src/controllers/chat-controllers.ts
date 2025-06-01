import { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';
import Chats from '../models/Chats.js';
import { openai } from '../config/openai-config.js';
import axios from 'axios';
import { title } from 'process';
const PAWAN_API_KEY="pk-adkmGIRjGvykzduHnNCbMMKYwmDEkKeJHMlpTytInZwmbrUT"



// Generate chat completiong
export const generateChatCompletion = async (
      req: Request, 
      res: Response,
      next: NextFunction,
    ) => {

    try {
      
      const {chatid, context, question } = req.body;

      if (!context || !question) {
        return res.status(400).json({ message: "Context and question are required" });
      }

      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
          return res.status(401).json({message: "User not registered OR Token expired"});
      }

      let chats = await Chats.findOne({ id: chatid });


      // Check chats existed
      if (!chats) {
        // Create new chats
        chats = new Chats({
          userid: user.id,
          title: question,
          chat: [],
        })
      }

      chats.chat.push({role: "user", context: context, question: question});
      await chats.save();

      // call api from hugging face
      const response = await fetch(process.env.LINK_API, {
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
      chats.chat.push({ role: "assistant", context: context, question: result.answer, score: result.score});
      await chats.save();

      return res.status(200).json(chats); 

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

        // Find all chats of user
        const chats = await Chats.find({ userid: user._id });

        return res.status(201).json({message: "OK", chats});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error", error});
    }
};

// Get chats with id of chats
export const getChatwithId = async (
      req: Request,
      res: Response,
      next: NextFunction
) => {
        const {chatid} = req.body;

        // Check if the token existed
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({message: "User not registered OR Token expired"});
        }

        // Check current token with token of user 
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({message: "Permissions didn't match"});
        }

        // Find the Chats with id
        const chats = await Chats.findOne({ id: chatid });
        if (!chats){
          return res.status(401).json({message: "Chats is not found"});
        }

        return res.status(200).json({message: "Get chats succesfully", chats})
};


// Delete chat conversations
export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
  ) => {
  try {
    
      const {chatId} = req.body;
      
      // Check if the token existed
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
          return res.status(401).json({message: "User not registered OR Token expired"});
      }

      // Check current token with token of user 
      if (user._id.toString() !== res.locals.jwtData.id) {
          return res.status(401).json({message: "Permissions didn't match"});
      }

      await Chats.deleteMany({ id: chatId});

      return res.status(201).json({message: "OK"});
  }
  catch (error) {
      console.log(error);
      return res.status(500).json({message: "Error", error});
  }
};
