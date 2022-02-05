
const express = require('express')
const retriever = require('./controller/data-retriever')
const manipulator = require('./controller/data-manipluator')

const server = express()

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

server.get('/students/:studentName', (req, res) => {
    let studentName = req.params.studentName
    let students = retriever.retrieveStudents(studentName)
    if(!students || students.length === 0){
        let err = {}
        err.errMessage = `No student with name ${studentName} has been found in the system`
        err.code = 404
        res.status(404).send(err)
        return
    }
    res.send(students)
})

server.post('/students', (req, res) => {

    let student = req.body
    console.log(`Body: ${JSON.stringify(student)}`)
    if(!student){
        res.status(404).send("There is no student to add")
        return
    }
    manipulator.addStudentIfNotExist(student)
    res.json({message: 'Student has been added successfuly'})
})

server.use((err, req, res, next) => {
    if(res.headersSent) {
        next()
        return
    }
    err.errMessage = (err.message|| "Unknown error!")
    res.status(err.status || 500).json(err)
    
    next()
})

server.listen(3001, () => console.log("Server is up and listening to port 3001"))