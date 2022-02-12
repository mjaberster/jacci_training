const mongoose = require("mongoose")

const studentsSchema = mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
})

module.exports = mongoose.model('Student', studentsSchema)