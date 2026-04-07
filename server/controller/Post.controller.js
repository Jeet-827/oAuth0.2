import PostModel from "../model/post.mode.js"
import UserModel from "../model/user.model.js"
import imagekit from "../config/imagekit.config.js";


export const createPost = async (req, res) => {
    try {
        const userId = req.userId;
        const { content } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found. Please log out and log in again (or create an account if you switched to the local DB!)." });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        const uploadResponse = await imagekit.upload({
            file: req.file.buffer,
            fileName: `post_${Date.now()}_${req.file.originalname}`,
        });

        const newPost = new PostModel({
            username: userId,
            content,
            image: uploadResponse.url,
        });

        await newPost.save();
        user.posts.push(newPost._id)
        await user.save();



        res.status(201).json({
            message: "Post created successfully",
            post: newPost,
        });

    } catch (error) {
        console.error("Error creating post:", error);
        import('fs').then(fs => fs.writeFileSync('error_log.txt', error.stack || error.message));
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}