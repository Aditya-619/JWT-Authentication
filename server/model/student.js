const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
})

exports.Student = mongoose.model('students', studentSchema);