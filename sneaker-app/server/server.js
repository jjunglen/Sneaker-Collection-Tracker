require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { connectDB, sequelize } = require("./config/db");
const authRoute = require("./routes/authRoutes");
const sneakerRoute = require("./routes/sneakerRoutes");

const app = express();
const PORT = process.env.PORT;

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

// Routes
app.use("/api/auth", authRoute);
app.use("/api/sneakers", sneakerRoute);

// Health check
app.get("/api/test", (req, res) => {
    res.json({
        message: "The sneaker collection API is running."
    })
})

const startServer = async () => {
    try {
        await sequelize.sync({ alter: true})
        console.log("Tables synced!");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    } catch(error) {
        console.log("Failed to sync tables:", error.message);

    }
}

startServer();