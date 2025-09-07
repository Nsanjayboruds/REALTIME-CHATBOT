import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import cors from "cors";

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors())

import UserRoutes from "./routes/UserRoutes.js";
import chatRoutes from "./routes/chatRoutes.js"

app.use("/api/user", UserRoutes);
app.use("/api/chat", chatRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
    connectDB();
    
});