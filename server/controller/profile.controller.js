import User from "../model/user.model.js";

export const getProfile = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User profile", user });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};