
const e = require('express')
const express = require('express')

let lastStudetnId = 1
let students = 
    [
        {
        id: lastStudetnId++,
        phonenumber: +9726666666,
        studentname: "wajeeh abuzena",
        courses: [
            {
                id: 1,
                name: "fullstack",
                schedule: [
                    {
                        day: "Friday",
                        time: "9:00-16:00"
                    },
                    {
                        day: "Saturday",
                        time: "13:00-17:00"
                    }
                ]
            }
        ]
    },

    {
        id: lastStudetnId++,
        studentname: "Diala Kamal",
        phonenumber: +97255555555,
        courses: [
            {
                id: 1,
                name: "fullstack",
                schedule: [
                    {
                        day: "Friday",
                        time: "9:00-16:00"
                    },
                    {
                        day: "Saturday",
                        time: "13:00-17:00"
                    }
                ]
            },
            {
                id: 1,
                name: "fluter",
                schedule: [
                    {
                        day: "Friday",
                        time: "15:00-17:30"
                    },
                    {
                        day: "Monday",
                        time: "15:00-17:30"
                    },
                    {
                        day:"Wednesday",
                        time:"15:00-16:00"
                    }
                ]
            }
        ]
    }
]

const server = express()



server.use(express.json()) 



server.get("/students", (req, res) => {
    res.send(students)
})


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
    res.send('<input mode="search">JACCI Registration System</input><h2>Jerusalim, Daheet Elbareed</h2><h2>Email: info@jacci.com</h2></h2>phone: +97223456789</h2>')
})


server.post('/students', (req, res) => {
    
    let student = req.body.student
    let studentFound = students.find(s => 
        s.studentname === student.studentname && s.phonenumber === student.phonenumber)
    if(studentFound) {
        let error = new Error(`student ${JSON.stringify(student)} is already registerd`)
        error.code = 404
        throw error
    }
    student.id = lastStudetnId++
    students.push(student)
    res.status(201).send(students)

})

/**
 * 
 * API 1 - get all students
 * Verb: GET
 * URI /students
 * 
 * Response:
 * status code: 200 OK
 * response payload:
 * [{
 *  "studentid": 12344,
 *  "studentname": "Ezz",
 *  "stduentcourses": [
 *  {
 *   id: 1,
                name: "fullstack",
                schedule: [
                    {
                        day: "Friday",
                        time: "9:00-16:00"
                    },
                    {
                        day: "Saturday",
                        time: "13:00-17:00"
                    }
                ]   
 *  }
 *  ]
 * }]
 * 
 * 
 * Status code:
 * 200 OK -> Data has been returned
 * 404 Not found -> student has not been found in the students list
 **/
server.get("/students", (req, res) => {
    
    if(students.length === 0) {
        res.status(404).send("No students found")
        return
    }

    res.send(students)
})

/**
 * 
 * API 1 - get student by id
 * Verb: GET
 * URI /students/{studentid}
 * 
 * Response:
 * status code: 200 OK
 * response payload:
 * {
 *  "studentid": 12344,
 *  "studentname": "Ezz",
 *  "stduentcourses": [
 *  {
 *   id: 1,
                name: "fullstack",
                schedule: [
                    {
                        day: "Friday",
                        time: "9:00-16:00"
                    },
                    {
                        day: "Saturday",
                        time: "13:00-17:00"
                    }
                ]   
 *  }
 *  ]
 * }
 * 
 * 
 * Status code:
 * 200 OK -> Data has been returned
 * 404 Not found -> student with id has not been found in the students list
 **/

server.get('/students/:studentid', (req, res) => {

    let studentid = req.params.studentid
    let student = students.find(s => s.id == studentid)
    if(!student) {
        res.status(404).send(`Student with id ${studentid} has not been found in the students list`)
        return
    } 

    res.send(student)

})
/**
 * 
 * API 1 - get specific student courses
 * Verb: GET
 * URI /students/{studentid}/courses
 * 
 * Response:
 * status code: 200 OK
 * response payload:
 * {
 *  "stduentcourses": [
 *  {
 *   id: 1,
                name: "fullstack",
                schedule: [
                    {
                        day: "Friday",
                        time: "9:00-16:00"
                    },
                    {
                        day: "Saturday",
                        time: "13:00-17:00"
                    }
                ]   
 *  }
 *  ]
 * }
 * 
 * 
 * Status code:
 * 200 OK -> Data has been returned
 * 404 Not found -> student with id has not been found in the students list
 **/

server.get('/students/:studentid/courses', (req, res) => {
    let studentid = req.params.studentid
    let student = students.find(s => s.id == studentid)
    if(!student) {
        res.status(404).send(`Student with id ${studentid} has not been found in the students list`)
        return
    } 

    res.send(student.courses)
})


server.delete("/students", (req, res) => {
    let studentid = req.query.studentid
    if(!studentid) {
        let error = new Error("Student id is missing")
        error.code = 404
        throw error
    }

    let studentIndex = students.findIndex(s => s.id == studentid)
    students.splice(studentIndex, 1)
    res.send(students)
})

server.put("/students", (req, res) => {
    let student = req.body.student
    let studentIndex = students.findIndex(s => s.id === student.id )
    if(studentIndex === -1) {
        let error = new Error(`Student with id ${student.id} has not been found in the students list`)
        error.code = 404
        throw error
    }
    
    students[studentIndex] = student
    res.send(students)

})



server.use((req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} was not found`)
    error.code = 404
    next(error)
})

server.use((error, req, res, next) => {
    if (res.headersSent) { //Check if a response has been sent
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || "An error has occured!"})
})


server.listen(3000, () => {
    console.log('Server is up and running on port 3000')
})