import mongoose  from "mongoose";
import { randomUUID } from "crypto";

// Define the chat schema
const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => randomUUID(), // Generate a random UUID for the chat ID
    },
    role: {
        type: String,
        required: true,
    },
    context: {
        type: String,
        required: true,
    },    
    question: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
    }
});

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    chats: [chatSchema],
});


export default mongoose.model("User", userSchema);