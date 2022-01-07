const express = require('express');
const cors = require("cors")
const app = express();
require("dotenv").config()
const port = process.env.PORT
const userRoute = require("./Routes/userRoute")
const dbConnect = require("./Configs/dbconnection")

dbConnect()
app.use(express.json());
app.use(cors())


app.use("/",userRoute)

app.listen(port,(req,res)=>{
    console.log(`server is running on http://localhost:${port}`);
})