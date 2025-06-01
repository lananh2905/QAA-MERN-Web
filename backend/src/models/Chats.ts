import mongoose  from "mongoose";
import { randomUUID } from "crypto";

// Define the chat schema in a chats
const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => randomUUID(),
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

})

// Define the chats schema
const chatsSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => randomUUID(), // Generate a random UUID for the chat ID
    },
    userid: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        required: true,
    },
    chat: [chatSchema],
},{
    timestamps: true // Mongoose add `createdAt` và `updatedAt`
});

export default mongoose.model("Chats", chatsSchema);
