import jwt from "jsonwebtoken";

const createToken = (req, res) => {
    try {
        const tokenHeader = req.headers.authorization?.split(" ")[1];
        if (!tokenHeader) {
            return res.status(401).json({ message: "Please login" });
        }

        const decode = jwt.verify(tokenHeader, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({ message: "User not found" });
        }

        const userId = decode.userId; 

        const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "15m",
        });

        const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: false, 
            secure: false,  
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Token created",
            accessToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something wrong" });
    }
};

export default createToken;