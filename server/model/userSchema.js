import mongoose from "mongoose";

const userSChema = mongoose.Schema({
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

const userModle = mongoose.model('user', userSChema)
export default userModle