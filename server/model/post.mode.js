import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    content: String,
    image: String,
})

const postModel = mongoose.model("post", postSchema);

export default postModel;
