import express from "express";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import userRoutes from "./Routes/userRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import postRoutes from "./Routes/postRoutes.js";
import { connect } from "./database/db.js";

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Initialize Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use("/api/register", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);

// Connect to the database and start the server
const PORT = process.env.PORT || 5000; // Fallback to port 5000 if not specified in .env
app.listen(PORT, async () => {
    try {
        await connect(); // Ensure DB connection is established before listening
        console.log(`Server is listening on port ${PORT}`);
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1); // Exit process if database connection fails
    }
});
