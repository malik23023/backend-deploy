const express = require('express')
const router = express.Router()
const Student = require("../Models/Student")
const Instructor=require("../Models/Instructor")
require("dotenv").config();
const key = process.env.SECRET;
const jwt = require('jsonwebtoken')
const Attendence=require("../Models/Attendence")
//Middleware
const requireLogin = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    //Authorization: 'Bearer TOKEN'
    if (!token) {
        res.status(200).json({
            success: false,
            message: "Error! Token was not provided."
        });
    }
    //Decoding the token
    try {
        const decodedToken = jwt.verify(token, key);
        req.token = decodedToken;
        next();
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        });
    }
}



router.post('/TecSign',(req,res)=>{
  const {email,password} = req.body

  if(!email || !password){
     return res.status(400).json({error:"please add email or password"})
  }
  Instructor.findOne({email:email})
  .then(savedUser=>{
      if(!savedUser){
         return res.status(400).json({error:"Invalid Email or password"})
      }
       
        if(savedUser){
              // res.json({message:"successfully signed in"})
             const token = jwt.sign({Id:savedUser.Id},process.env.SECRET)
             const {email,Id} = savedUser
             return res.status(200).json({token,user:{email,Id}})
          }
          else{
              return res.status(400).json({error:"Invalid Email or password"})
          }
        
  })
})

//-----------------
router.post('/markAttd',async(req,res)=>{
  const {rollNo,courseCode,date,status,creditHour}=req.body;
  
  try{
    let att= new Attendence({
        rollNo:rollNo,
        courseCode:courseCode,
        date:date,
        status:status,
        creditHour:creditHour
    })
      att.save().then(()=>{
        res.status(200).json({msg:"Attendence Uploaded Successfully"})
      })
  }
  catch{
    res.status(400).json({msg:"error"})
  } 

})


//-----------------
router.post('/uploadMark',requireLogin ,async(req,res)=>{
    
  const student = await Student.findOne({rollNo:req.body.rollNo})
  const { rollNo,semester,mark,courseCode} = req.body
  const obj = {
    rollNo,semester,mark,courseCode
  }
  student.markList.push(obj);
  student.save();
  res.json(student)
})

//-----------------
router.post('/updateMark', requireLogin, async (req, res) => {
  try {
    const { rollNo, semester, mark, courseCode } = req.body;
    const student = await Student.findOneAndUpdate(
      { rollNo, semester, courseCode },
      { mark },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});





module.exports = router