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
    const { chatid, context, question } = req.body;

    if (!context || !question) {
      return res.status(400).json({ message: "Context and question are required" });
    }

    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not registered OR Token expired" });
    }

    let chats = await Chats.findOne({ id: chatid });
    if (!chats) {
      chats = new Chats({
        userid: user.id,
        title: question,
        chat: [],
      });
    }

    chats.chat.push({
      role: "user",
      context: context,
      question: question
    });

    await chats.save();

    const payload = {
      question,
      context
    };

    const response = await fetch("http://34.70.188.101:30000/answer/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    let result;
    if (response.ok) 
    {
      // Chỉ đọc JSON một lần duy nhất nếu status 2xx
      result = await response.json();
      if (!result || !result.answer) {
        // Gọi model trả về dạng JSON mà KHÔNG có answer
        return res.status(502).json({ message: "Model server trả về dữ liệu không hợp lệ", result });
      }
    } else {
      // Lấy body ra text để debug/log (chỉ đọc 1 lần!) 
      const errorText = await response.text();
      // Nếu muốn thử parse JSON thì bạn có thể thêm đoạn thử-catch nhỏ
      // let errorJson;
      // try {
      //   errorJson = JSON.parse(errorText);
      // } catch { }
      return res.status(response.status).json({
        message: "Model server trả về lỗi",
        error: errorText
        // ...(errorJson ? {errorJson} : {})
      });
    }

    // Ghi log OK
    console.log("RESULT", result);

    // Add model result vào chat
    chats.chat.push({
      role: "assistant",
      context: context,
      question: result.answer,
      score: result.score   // Nhớ kiểm tra nếu result có trường này
    });
    await chats.save();

    return res.status(200).json(chats);

  } catch (err: any) {
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
