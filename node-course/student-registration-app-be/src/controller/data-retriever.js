const studentsList = require("../data/students-list")

const retrieveStudent = (studentId) => {
    
    let studentsList = readStudentsListFromFile()
    return studentsList.find( s => s.studentId == studentId)
}

const retrieveStudents = (studentName) => {
    
    let studentsList = readStudentsListFromFile()
    return studentsList.filter( s => s.studentName === studentName)
}

const retrieveAllStudents = () => {
    let students = readStudentsListFromFile()
    console.table(students)
    return students
}

const readStudentsListFromFile = () => {
    let students = studentsList.getAllStudents()
    if(!students || students.length === 0) {
        throw new Error("No data available in file")
    }
    return students
}


module.exports = {
        retrieveStudent,
        retrieveStudents,
        retrieveAllStudents
}