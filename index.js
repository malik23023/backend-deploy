const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors");
const Instructor = require("./Routes/Instructor")
require("dotenv").config();

const MONGODB_URL=process.env.URL;
const port=process.env.PORT;

app.use(express.json())
app.use(cors())

mongoose
.connect(MONGODB_URL)
.then(()=>{
    console.log("db connected")
}).catch((err)=>{
    console.log("err");
 })

//const Instructor = require("./Models/Instructor");
app.use(Instructor)

app.listen(port, () => {
    console.log(`Example app listening on port (instructor module) ${port}`);
    console.log(`Example app listening on port ${port}`);
})
