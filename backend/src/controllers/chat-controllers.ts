import { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';
import { client } from '../config/openai-config.js';
import axios from 'axios';
const PAWAN_API_KEY="pk-adkmGIRjGvykzduHnNCbMMKYwmDEkKeJHMlpTytInZwmbrUT"


export const generateChatCompletion = async (
      req: Request, 
      res: Response,
      next: NextFunction,
    ) => {

    try {
      const { message } = req.body;

      // Check if the token existed
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

      const chatCompletion = await client.chat.completions.create({
          model: "deepseek/deepseek-prover-v2-671b",
          messages: chats,
      });
      
      // Add chat reponse into user
      user.chats.push(chatCompletion.choices[0].message);
      await user.save();
      
      return res.status(200).json(user.chats);
    } catch (err) {

      console.error("Hugging Face Error:", err);
      res.status(500).json({ message: "Something went wrong with Hugging Face API" });
    }

};