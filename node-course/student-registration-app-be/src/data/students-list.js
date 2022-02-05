let id = 123

let studentsList = [

    {
        studentId: id++,
        studentName: "Wajeeh",
        phoneNumber: "+972532222222"
    },
    {
        studentId: id++,
        studentName: "Ezz",
        phoneNumber: "+972533333333"
    },
    {
        studentId: id++,
        studentName: "Diala",
        phoneNumber: "+97254444444"
    },
    {
        studentId: id++,
        studentName: "Jaafar",
        phoneNumber: "+97254444444"
    },
    {
        studentId: id++,
        studentName: "Tasneem",
        phoneNumber: "+97255555555"
    },
    {
        studentId: id++,
        studentName: "Wajeeh",
        phoneNumber: "+972535656565"
    }

]

const createStudent = (student) => {
    student.studentId = id++
    console.log(`Will push student with id ${student.studentId}`)
    studentsList.push(student)
}

const getAllStudents = () => {
    return studentsList
}

module.exports = {
    getAllStudents,
    createStudent
}