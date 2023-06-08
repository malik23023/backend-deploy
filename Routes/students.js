const express = require('express')
const router = express.Router()
const Student = require("../Models/Student")
require("dotenv").config();

router.get('/getStudents',authMiddleware,(req,res)=>{
    Student.find()
    .then(sArray=>{
        res.json(sArray)
    })
    .catch(err=>{
        console.log(err)
    })
})
