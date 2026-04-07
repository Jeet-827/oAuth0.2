import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profile: String,
    banner: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }],
})

const User = mongoose.model('user', userSchema)
export default User
