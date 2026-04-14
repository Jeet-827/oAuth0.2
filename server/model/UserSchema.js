import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: String,
    googleId: String
})

const userModel = mongoose.model("user", userSchema)
export default userModel