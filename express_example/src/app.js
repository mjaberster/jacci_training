const express = require('express')
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

const students = [

    {
        name: "wajeeh",
        department: "finance",
        salary: 10000
    },
    {
        name: "exx",
        department: "IT",
        salary: 12000
    },
    {
        name: "diala",
        department: "administration",
        salary: 15000
    }


]
server.get('/student', (req, res) => {
    
    const name = req.query.name
    const department = req.query.department

    if(!name || !department) {
        res.status(400).send("You must provide student name and department")
        return;
    }

    const student = students.find( s => {
        return s.name === name && s.department === department
    })

    if(!student) {
        res.status(404).send("Student "+name+" was not found in department "+department)
    }

    res.send(student)
})

server.listen(3000, () => {
    console.log("Server is up and running")
})