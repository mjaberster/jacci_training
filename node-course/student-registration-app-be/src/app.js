
const express = require('express')
const retriever = require('./controller/data-retriever')
const manipulator = require('./controller/data-manipluator')
const MongooseConnector = require('./dataaccess/MoongoseConnector')
const jwt = require('jsonwebtoken')
const server = express()

let asyncCalls = new Map()
let asyncCallId = 0
const privateKey = 'myprivateket-notforsharing'

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

server.post(`/user/register`, async (req, res) => {
    const user = req.body
    const base64Password = user.password
    let password = Buffer.from(base64Password, 'base64').toString('ascii');
    console.log(`>>>> ${JSON.stringify(user)}`)
    if(!user) {
        const err = new Error("User must be submited")
        err.status = 400
        throw err
    }
    try{
        user.password = password
        const addedUser = await MongooseConnector.addUser(user)
        if(addedUser) {
            let token
            const payload = {
                userId: user.id,
                fullName: user.fullName
            }
            
            const options = {
                expiresIn: '1h'
            }
            token = jwt.sign(payload, privateKey, options)
            res.json({message: "User has been added successfuly", token})
        } else {
            res.status(500).json({message: "An error occured, couldn't create user, please try again later"})
        }
    } catch(e) {
        res.status(500).json({message: e.message})
    }
})

server.post(`/user/login`, async (req, res) => {
    console.log("login ...")
    const username = req.headers.username
    const base64Password = req.headers.password
    console.log(`base64 ${base64Password}`)
    let password = Buffer.from(base64Password, 'base64').toString('ascii');
    console.log(`ascii ${password}`)
    console.log(username)
    console.log(password)
    if(!username || !password) {
        res.status(400).json({message: "Username or Password are missing"})
        return
    }
    try{
        const user = await MongooseConnector.getUser(username, password)
        if(!user) {
            res.status(401).json({message: "Username or Password are incorrect"})
            return
        }
        let token
        const payload = {
            userId: user.id,
            fullName: user.fullName
        }
        
        const options = {
            expiresIn: '1h'
        }
        token = jwt.sign(payload, privateKey, options)

        res.json({message: "User is loged in", token})
    } catch (e) {
        res.status(401).json({message: "Username or Password are incorrect"})
    }
})



// server.use((req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1] //'Bearer t=TOKEN'
//         if(!token) {
//             const error = new Error("Authentiation failed")
//             error.status = 401
//             return next(error)
//         }
//         const decodedToken = jwt.verify(token, privateKey)
//         req.userData = {
//             userId: decodedToken.userId
//         } 
//         next()
//     } catch(err) {
//         const error = new Error("Authentiation failed")
//         console.log(err)
//         error.status = 401
//         return next(error)
//     }
    

// })


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