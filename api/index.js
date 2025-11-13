import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../config/db.js";
import authRoutes from "../routes/authRoutes.js";
import postRoutes from "../routes/postRoutes.js";
import serverless from "serverless-http";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is running fine on Vercel!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Export serverless handler (no need for app.listen)
export const handler = serverless(app);
export default app;
