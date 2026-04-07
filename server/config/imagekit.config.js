import multer from "multer";
import ImageKit from "imagekit"
const imagekit = new ImageKit({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint: process.env.URL_ENDPOINTS

})

export default imagekit