import mongoose from "mongoose";

const connect = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_CONNECT)
    if (!conn) {
        console.log("Mongodb is not connect")
    }
    console.log("Mongodb connect")
}

export default connect