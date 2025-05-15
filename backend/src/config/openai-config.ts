import { config } from 'dotenv';
config(); 

import { OpenAI } from "openai";

export const openai = new OpenAI({
	baseURL: 'https://api.deepseek.com',
	apiKey: process.env.HUGGINGFACE_API_KEY
});
