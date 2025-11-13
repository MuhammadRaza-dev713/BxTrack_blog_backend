import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import serverless from "serverless-http";
import connectDB from "../config/db.js";
import authRoutes from "../routes/authRoutes.js";
import postRoutes from "../routes/postRoutes.js";

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("Not allowed by CORS"), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.get("/api", (req, res) => res.send("✅ API is running on Vercel!"));

export default serverless(app);
