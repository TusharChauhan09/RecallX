import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

// Use environment variables for sensitive information
const MONGO_URI: string = process.env.MONGO_URI || (() => {
    throw new Error("MONGO_URI is not defined in .env file");
})();

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
};