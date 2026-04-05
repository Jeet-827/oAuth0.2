import app from "./src/app.js";


app.listen(3000 || process.env.PORT, () => {
    console.log("server is start")
})