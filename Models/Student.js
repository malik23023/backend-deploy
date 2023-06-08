const mongoose = require('mongoose');


const {Schema}=mongoose;
const studentSchema = new Schema({
        rollNo: {type: String, required: true},
        studentName: {type: String, required: true},
       // courseTaken: {type: mongoose.SchemaTypes.ObjectId, ref:"Course"},
       // batch: {year: Number, semType:String},
        CGPA: {type: Number, required:true},
        SGPA: [{sem:String,gpa: Number}],
        semester:{type:Number,required:true},
        degree: {type: String, required:true},
        section: {type: String, required: true},
        status: {type: String, required: true},
        phone: {type: String, required: true},
        gender: {type: String, required: true},
        email: {type: String, required: true},
        password: {type:String, required:true},
     //   address: {city: String, country:String,homePhone:String,home:String},
        guardian: {type: String, required: true},
        attdenList:[],
        markList:[],
        pList:[]

},

        {timestamps: true}

);

    const Student = mongoose.model('Student', studentSchema);
    module.exports = Student;