

import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cors from "cors"
dotenv.config();
import UsserRoutes from "./routes/UserRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
const app = express();
app.use(express.json())
app.use(cors())
app.use("/api/user",UsserRoutes)
app.use("/api/chat",chatRoutes)
app.listen(process.env.PORT, () => {
    console.log(`Server is working on ${process.env.PORT}`);
    connectDb((err) => {
      if (err) {
        console.error("Error connecting to database:", err.message); // Log the error message
      } else {
        console.log("Connected to database successfully");
      }
    });
  });
