import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const createToken = async (req, res) => {
    try {
        const tokenHeader = req.headers.authorization;

        if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Please login" });
        }

        const token = tokenHeader.split(" ")[1];

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decode.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "15m",
        });

        const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Token created",
            accessToken,
            user,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export default createToken;