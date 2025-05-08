import { config } from 'dotenv';
config();
import morgan from 'morgan';
import express from 'express';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// GET    - collect data from the server
// PUT    - update data on the server
// POST   - create data on the server
// DELETE - delete data from the server

// Allow cross-origin requests from the frontend
app.use(cors({origin:"http://localhost:5173", credentials: true}));

// Middleware analyses JSON data from the request body
app.use(express.json());   

// Write logs in console to debugs
app.use(morgan('dev')); 

// Use cookie parser to parse cookies from the request headers
app.use(cookieParser(process.env.COOKIE_SECRET));

// The main route for the API
app.use("/api/v1", appRouter)


export default app;