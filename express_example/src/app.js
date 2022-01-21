const express = require('express')
const fs = require("fs")

const path = require('path')

const server = express()
const contentPath = path.join(__dirname, "../content")

server.use(express.static(contentPath))


server.use((req, res, next) => {
    console.log("A new request has arrived")
    next()
})

server.use((req, res, next) => {
    console.log("I'm the second MW")
    next()
})



server.get('', (req, res) => {
    res.send("Hello from the server side")
})

server.get('/help', (req, res) => {
    

        const content = "<h1>Help Page</h1><h2>I\'m your help page</h2>"
        res.send(content)

})

server.get('/about', (req, res) => {
    res.send('I\'m your about page!')
})


server.get('/student', (req, res) => {
    
    let fileContent = fs.readFileSync(path.join(contentPath, '../content/student.json'))
    let students = JSON.parse(fileContent)

    const name = req.query.name

    if(!name) {
        res.status(400).send("You must provide student name")
        return;
    }

    const student = students.filter( s => {
        return s.name === name
    })

    if(!student) {
        res.status(404).send("Student "+name+" was not found in department "+department)
    }

    res.send(student)
})

server.listen(3000, () => {
    console.log("Server is up and running")
})