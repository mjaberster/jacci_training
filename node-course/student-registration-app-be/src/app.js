
const express = require('express')
const retrieveStudent = require('./controller/data-retriever')

const server = express()

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-type, Accept, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    next()
})

server.get('/students/:studentid', (req, res) => {
    let studentId = req.params.studentid
    let student = retrieveStudent(studentId)
    if(!student){
        let err = {}
        err.errMessage = `No student with id ${studentId} has been found in the system`
        err.code = 404
        res.status(404).send(err)
        return
    }
    res.send(student)
})

server.listen(3001, () => console.log("Server is up and listening to port 3001"))