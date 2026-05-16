require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { connectDB } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(helmet());

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
app.use(cors(corsOptions));

// Parse incoming JSON
app.use(express.json())

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: {
        error: "Too many requests, please try again later."
    },
})
app.use("/api/auth", authLimiter);

// Health check
app.get("/api/test", (req, res) => {
    res.json({
        message: "The sneaker collection API is running."
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})