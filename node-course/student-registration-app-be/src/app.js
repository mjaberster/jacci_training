
const express = require('express')
const retriever = require('./controller/data-retriever')
const manipulator = require('./controller/data-manipluator')
const MongooseConnector = require('./dataaccess/MoongoseConnector')

const server = express()

let asyncCalls = new Map()
let asyncCallId = 0

server.use(express.json())

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-type, Accept, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    next()
})

server.get('/students', (req, res) => {
    res.send(retriever.retrieveAllStudents())
})

// server.get('/students/:studentName', (req, res) => {
//     let studentName = req.params.studentName
//     let students = retriever.retrieveStudents(studentName)
//     if(!students || students.length === 0){
//         let err = {}
//         err.errMessage = `No student with name ${studentName} has been found in the system`
//         err.code = 404
//         res.status(404).send(err)
//         return
//     }
//     res.send(students)
// })

server.post('/students', async (req, res) => {

    let student = req.body
    console.log(student)
    if(!student || !student.studentName || !student.phoneNumber){
        let err = new Error()
        err.message = "There is no student to add"
        err.status = 400
        throw err
    }
    try{
        await manipulator.addStudentIfNotExist(student)
    } catch(err){
        res.status(err.status || 500).json({message: err.message})
    }
    
    res.status(201).json({message: 'Student has been added successfuly'})
})

const onChangeAsyncState = (asyncCall, state) => {
asyncCalls.set(asyncCall, state)
}


server.post('/students/async', (req, res) => {
    asyncCall = asyncCallId++
    asyncCalls.set(asyncCall, 'RECIEVED')
    let student = req.body
    if(!student || !student.studentName || !student.phoneNumber){
        let err = new Error()
        err.message = "There is no student to add"
        err.status = 400
        asyncCalls.set(asyncCall, "ERROR_NO_STUDENT_SENT")
        throw err
    }
    manipulator.addStudentIfNotExistAsync(student, asyncCall, onChangeAsyncState)
    res.status(202).json({callback:`/students/async/${asyncCall}`})
})



server.get('/students/async/:asyncCall', (req, res) => {
    console.log(req.params.asyncCall)
    const state = asyncCalls.get(parseInt(req.params.asyncCall))
    console.log(state)
    res.json({state})
})

server.post('/students/mongoose', async (req, res) => {
    let student = req.body
    console.log(student)
    
    const addedStudent = await MongooseConnector.createStudent(student)
    res.json(addedStudent)
})

server.get('/students/mongoose/:studentId', async (req, res) => {   
    const studentId = req.params.studentId
    if(studentId) {
        const student = await MongooseConnector.getStudent(studentId.toString())
        res.json(student)
        return
    }
    const students = await MongooseConnector.getAllStudents()
    res.json(students)
})


server.use((err, req, res, next) => {
    console.log("error mw")
    console.log(err)
    if(res.headersSent) {
        next()
        return
    }
    err.errMessage = (err.message|| "Unknown error!")
    res.status(err.status || 500).json({err})
    
    next()
})




server.listen(3001, () => console.log("Server is up and listening to port 3001"))