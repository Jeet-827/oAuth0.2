import mongoose from "mongoose"
import userModel from "../model/UserSchema.js"
import bcrypt from "bcrypt"


export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const checkUser = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })
        if (checkUser) {
            return res.status(400).json({ message: "user already Exist" })

        }
        const hash = await bcrypt.hash(password, 10)
        const user = await userModel.create({
            username,
            email,
            password: hash,
        })

        return res.status(200).json({ message: "user are registration", user })


    } catch (error) {
        return res.status(400).json({ message: "Somthing wrong" })


    }
}




export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const User = await userModel.findOne({ email })
        if (!User) {
            return res.status(400).json({ message: "user not Exist" })

        }

        const pass = await bcrypt.compare(password, User.password)
        if (!pass) {
            return res.status(400).json({ message: "password is wrong" })
        }

        return res.status(200).json({ message: "user are Login", User })


    } catch (error) {
        return res.status(400).json({ message: "Somthing wrong" })


    }
}
