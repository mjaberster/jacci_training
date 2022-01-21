const express = require('express')

const server = express()

server.get('', (req, res) => {
    res.send('Hello express!')
})

server.get('/help', (re, res) => {
    res.send('I\'m your help page!')
})

server.get('/info', (req, res) => {
    res.send(
        {
            appname: 'Student Registration System',
            version: '1.0.1',
            support: 'support@example.com'
        }
    )
})

server.get('/about', (req, res) => {
    res.send('<h1>JACCI Registration System</h1><h2>Jerusalim, Daheet Elbareed</h2><h2>Email: info@jacci.com</h2></h2>phone: +97223456789</h2>')
})


let students = [
    {
        name: "Wajeeh",
        department: "IT",
        Salary: 1500
    },
    {
        name: "Tasneem",
        department: "Cloud",
        Salary:1500
    }
]

server.get('/employee', (req, res) => {
    if(!req.query.name) {
        res.status(400).send("You must provider a name!")
    } else {
        console.log(students)
        let result = students.find(s  => 
            s.name.toLowerCase() === req.query.name.toLocaleLowerCase()
        )
        if(!result) {
            res.status(404).send('Student ' + req.query.name + ' was not found ')
        } else {
            res.send(result)
        }

    }
})

server.listen(3000, () => {
    console.log('Server is up and running on port 3000')
})