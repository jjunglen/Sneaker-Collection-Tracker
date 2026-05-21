const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ 
                error: "All fields are required",
            });
        }

        if (username.length < 3 || username.length > 20) {
            return res.status(400).json({ error: "Username must be 3-20 characters"})
        }

        if (password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long."})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Must be a valid email address" })
        }

        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ error: "Email already in use" });
        }

        const existingUsername = await User.findOne({ where: { username } });
        if (existingUsername) {
            return res.status(400).json({ error: "Username already taken."})
        }

        const password_hash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password_hash });

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username
            },
            JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "7d"
            }
        )

        res.status(201).json({
            message: "Account created successfully",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
        });

    } catch(error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Registration failed" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required"});
        }

        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(401).json({ 
                error: "Invalid credentials"
            });
        }

        const passwordValidation = await bcrypt.compare(password, user.password_hash);
        if (!passwordValidation) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username
            },
            JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "7d"
            }
        )

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
        })
    } catch(error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Login failed" })
    }
}

const getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ["id", "username", "email", "created_at"],
        })
        if (!user) return res.status(404).json({ error: "User not found"})
        res.json(user);    
    } catch(error) {
        console.error("Get me error:", error);
        res.status(500).json({ error: "Server error" })
    }
}

module.exports = { register, login, getMe };