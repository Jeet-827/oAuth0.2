import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hash
        });

        const userId = user._id;

        const accessToken = jwt.sign(
            { userId },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { userId },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: false,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "User created",
            accessToken,
            user
        });

    } catch (error) {
        res.status(500).json({ message: "User not created", error });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const findUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (!findUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const matchPass = await bcrypt.compare(password, findUser.password);

        if (!matchPass) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const userId = findUser._id;

        const accessToken = jwt.sign(
            { userId },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { userId },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: false,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login successful",
            accessToken,
            user: findUser
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};