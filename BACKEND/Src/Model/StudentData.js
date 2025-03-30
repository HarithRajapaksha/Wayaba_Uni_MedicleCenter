const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true, 
    },
    registrationNumber: {
        type: String,
        required: true,
    },
    faculty: {
        type: String,
        required: true,
       // enum: ['Applied', 'Technology', 'BSF']
    },
    extraInfo: {
        type: String,
        required: false,
    }
},{timestamps:true});

const StudentData = mongoose.model('StudentData', userSchema);
module.exports = StudentData;