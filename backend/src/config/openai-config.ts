import { config } from 'dotenv';
config(); 

import { OpenAI } from "openai";

export const client = new OpenAI({
	baseURL: "https://router.huggingface.co/novita/v3/openai",
	apiKey: process.env.HUGGINGFACE_API_KEY,
});
