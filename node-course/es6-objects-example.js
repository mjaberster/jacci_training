let studentName = "Emad"
let age=18
let course="fullstack"

let student = {
    studentName,
    age,
    course
}

console.log(student)

let courseObj = {
    courseName: "fullstack",
    teacher: "Marwan",
    location: "LWF"
}

let {courseName, teacher, location:host, started=false} = courseObj

console.log(`course name: '${courseName}'`)
console.log(`teacher: '${teacher}'`)
console.log(`host '${host}`)
console.log(`started: '${started}'`) //default if not exists in object