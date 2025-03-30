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
    medicines: {
        type: String,
        required: true,
    }
},{timestamps:true});

const Medicine = mongoose.model('Medicine', userSchema);
module.exports = Medicine;