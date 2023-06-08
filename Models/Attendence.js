const mongoose = require('mongoose');


const {Schema}=mongoose;
const attendenceSchema = new Schema({
        date: {type: String, required: true},
        status: {type: String,default: "-", required: true},
        creditHour: {type: Number, required: true},
        courseCode:{type:String,required:true},
        rollNo:{type:String,requires:true}
},

        {timestamps: true}

);

const Attendence = mongoose.model('Attendence', attendenceSchema);
module.exports = Attendence;