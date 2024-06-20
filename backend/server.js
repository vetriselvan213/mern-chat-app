import express from 'express';
import path from 'path';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser"
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from './socket/socket.js';
import { signup } from './controllers/auth.controller.js';
import multerConfig from './middleware/multerConfig.js';


config();


const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Apply CORS middleware
app.use(cors({
  origin: 'http://localhost:3000/', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
}));

// Other middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({limit: '10mb'}))

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.post('/api/auth/signup', multerConfig, signup);

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*", (req,res) => {
  res.sendFile(path.join(__dirname,"frontend", "dist","index.html"))
});

// Start server
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
