const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true, 
    },
    regNO: {
        type: String,
        required: true,
    },
    faculty: {
        type: String,
        required: true,
    },
    department:{
        type:String,
        required:true,
    },
    extraInfo:{
        type:String,
        required:true,
    }

},{timestamps:true});

const MedicleReport = mongoose.model('MedicleReport', userSchema);
module.exports = MedicleReport;