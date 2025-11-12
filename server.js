// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import postRoutes from "./routes/postRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();
// // app.use(cors());
// app.options("*", cors());

// app.use(express.json());

// // API routes
// app.use("/api/auth", authRoutes);
// app.use("/api/posts", postRoutes);

// app.get("/", (req, res) => res.send("API is running..."));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import postRoutes from "./routes/postRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();

// // CORS configuration
// const allowedOrigins = [
//   process.env.FRONTEND_URL, // e.g. https://bx-track-blog-app-5x5k.vercel.app
//   "http://localhost:3000"   // for local development
// ];

// app.use(cors({
//   origin: function(origin, callback) {
//     // allow requests with no origin (like Postman)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = `CORS error: This origin is not allowed`;
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));

// // Handle preflight requests
// app.options("*", cors({
//   origin: allowedOrigins,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));

// // JSON parser
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/posts", postRoutes);

// app.get("/", (req, res) => res.send("API is running..."));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ---------------------- CORS Setup ----------------------
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // Postman, curl
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("Not allowed by CORS"), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Handle preflight OPTIONS requests
app.options("*", cors());

// ---------------------- Middleware ----------------------
app.use(express.json());

// ---------------------- Routes ----------------------
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => res.send("API is running..."));

// ---------------------- Server ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
