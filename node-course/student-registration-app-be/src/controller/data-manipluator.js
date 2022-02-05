const students = require("../data/students-list")

const addStudentIfNotExist = (student) => {
    let studentsList = students.getAllStudents()
    console.table(studentsList)
    if(studentsList.find(s => s.phoneNumber === student.phoneNumber && s.studentName === student.studentName)) {
        let err = new Error(`Student already exists`)
        err.status = 400
        throw err
    }
    students.createStudent(student)
}


module.exports = {addStudentIfNotExist}