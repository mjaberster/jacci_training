const fs = require('fs')
const chalk = require('chalk')
const folderUri = './students'
const registrationFile = 'course.json'
let students = readFilesFromFoler(folderUri)

doOperationForAll(students)






function readFilesFromFoler(uri) {
    let students = []
    let files = fs.readdirSync(uri)
    for(let i in files) {
        let fileContent = fs.readFileSync(uri + '/' + files[i])
        let student = JSON.parse(fileContent)
        students[i] = student
    }
    return students
}

function doOperationForAll(students){
    console.log("doing...")
    for(let i in students) {
        let student = students[i]
        let operation = student.operation
        switch(operation) {
            case "register":
                if(student.paid){
                    console.log(`Registering student '${student.studentName}' to course '${student.course}'`)
                    registerStudentIfNotExist(student.studentName, student.course)
                } else {
                    chalk.red(`Student '${student.studentName}' needs to pay first to be able to register for course '${student.course}'`)
                }
                break;
            case "unregister":
                console.log(`Unregistering student '${student.studentName}' from course '${student.course}'`)
                break;
            defaulte:
                chalk.red(`operation '${operation} is not valid`)
        }
    }
}


function registerStudentIfNotExist(studentName, courseName){
    let courseFile = fs.readFileSync(registrationFile)
    let course = JSON.parse(courseFile)
    console.log(">>> " + courseFile)
    const found = course.students.find(student => student.studentName == studentName)
    if(!found) { 
        registerStudent(course, {
            studentName: studentName,
            course: courseName
        })
    } else {
        chalk.yellow(`Student '${studentName} is already registered to course '${courseName}'`)
    }
    
}

function registerStudent(course, student){
    console.log(">>>" + course)
    course.push(student)
    fs.writeFile(registrationFile, course)
}