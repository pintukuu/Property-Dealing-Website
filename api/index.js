import dotenv from "dotenv"
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"
import propsRoutes from "./routes/props.js"
import bpRoutes from "./routes/bp.js"
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config()
const app = express();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to mongo");
    } catch (error) {
        // throw error
        console.log(error);
    }
}
// Middle ware

app.use(cors())

app.use(cookieParser())

app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/props", propsRoutes);
app.use("/api/bPs", bpRoutes);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(8000, () => {
    connect();
    console.log("Listning to poet 8000");
})
