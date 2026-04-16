import jwt from "jsonwebtoken";

export const genrateAccess = (user) => {
    return jwt.sign(
        { user },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );
};

export const genrateRefresh = (user) => {
    return jwt.sign(
        { user },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};
