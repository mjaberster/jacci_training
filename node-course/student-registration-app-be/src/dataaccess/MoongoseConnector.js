const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const { add } = require("nodemon/lib/rules")
const Student = require('../datamodels/Student')
const User = require("../datamodels/User")
const { use } = require("express/lib/application")
const host = "127.0.0.1" //localhost
const port = "27017"
const dbName = "StudentRegistrationApp"
const connectionString = `mongodb://${host}:${port}/${dbName}`
const atlasConnectionString = `mongodb+srv://mongouser:Mm5PQkehCcxZqooT@cluster0.0dxyo.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(atlasConnectionString).then(() => {
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

const addUser = async (user) => {

    try{
        const hashedPassword = await bcrypt.hash(user.password, 12)
        console.log(hashedPassword)
        const createdUser = new User(
            {
                username: user.username,
                fullName: user.fullName,
                password: hashedPassword,
                email: user.email,
                phoneNumber: user.phoneNumber
            }
        )
        const result = await createdUser.save()
        console.log(result)
        return result;
    } catch(err) {
        console.log("Couldn't hash password")
        console.log(err)
        throw new Error("Couldn't hash password")
    }
    
}

const getUser = async (username, password) => {
    const user = await User.findOne({username: username}).exec()
    console.log(user)
    
    if(!user) {
        const err = new Error("User is not registered in the system")
        err.status(404)
        throw err
    }
    try{
        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid) {
            const err = new Error("Username or password are not correct")
            throw err
        }
        
        return user
    } catch(err) {
        console.log("Couldn't unhash password")
        console.log(err)
        throw new Error("Couldn't unhash password")
    }
}

exports.createStudent = createStudent
exports.getAllStudents = getAllStudents
exports.getStudent = getStudent
exports.addUser = addUser
exports.getUser = getUser