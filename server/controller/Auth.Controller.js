import userModle from "../model/userSchema.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


export const RegisterUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const ExistUser = await userModle.findOne({
            $or: [{ username }, { email }]
        });

        if (ExistUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModle.create({
            username,
            email,
            password: hash
        });

        const userId = user._id;

        const accessToken = jwt.sign(
            { userId },
            process.env.JWT_SECRETE,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { userId },
            process.env.JWT_SECRETE,
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


export const LoginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const FindUser = await userModle.findOne({
            $or: [{ username }, { email }]
        });

        if (!FindUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const matchPass = await bcrypt.compare(password, FindUser.password);

        if (!matchPass) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const userId = FindUser._id;

        const accessToken = jwt.sign(
            { userId },
            process.env.JWT_SECRETE,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { userId },
            process.env.JWT_SECRETE,
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
            user: FindUser
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};