const express = require('express');
const cors = require("cors")
const app = express();
require("dotenv").config()
const port = process.env.PORT
const userRoute = require("./Routes/userRoute")
const productsRoutes = require("./Routes/productsRoutes")
const dbConnect = require("./Configs/dbconnection");
const fileUpload = require('express-fileupload');

// app.use("/public",express.static(__dirname +'/public'))


dbConnect()
app.use(fileUpload({
    useTempFiles:true
}))
app.use(express.json());
app.use(cors())
app.use(userRoute)
app.use("/product",productsRoutes)


app.listen(port,(req,res)=>{
    console.log(`server is running on http://localhost:${port}`);
})