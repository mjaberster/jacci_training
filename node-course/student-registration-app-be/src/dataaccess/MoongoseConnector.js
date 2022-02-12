const mongoose = require("mongoose")
const Student = require('../datamodels/Student')
const host = "127.0.0.1" //localhost
const port = "27017"
const dbName = "StudentRegistrationApp"
const connectionString = `mongodb://${host}:${port}/${dbName}`

mongoose.connect(connectionString).then(() => {
    console.log("Connected!")
}).catch((err) => {
    console.log("Failed to connect")
})

const createStudent = async (student) => {
    const createdStudent = new Student(
        {
            studentId: student.studentId,
            studentName: student.studentName,
            phoneNumber: student.phoneNumber
        }
    )
    const result = await createdStudent.save()
    return result
}

const getAllStudents = async () => {
    const students = Student.find()
    return students
}

const getStudent = async (studentId) => {
    const students = Student.find({studentId})
    return students
}

exports.createStudent = createStudent
exports.getAllStudents = getAllStudents
exports.getStudent = getStudent