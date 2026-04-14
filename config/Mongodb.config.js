import mongoose from "mongoose";
import debug from "debug";

const log = debug("app:db");

const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_CONNECT);

        log(" Database Connected Successfully");
    } catch (error) {
        log(" Database Connection Failed:", error.message);
    }
};

export default connect;
