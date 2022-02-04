// const fs = require("fs")
const retrieveStudent = (studentId) => {
    
    let studentsList = readStudentsListFromFile()
    return studentsList.find( s => s.studentId == studentId)
}

const readStudentsListFromFile = () => {
    
    // let data = fs.readFileSync("../students-list.json")
    if(!studentsList || studentsList.length === 0) {
        throw new Error("No data available in file")
    }

    // let studentList = JSON.parse(data)
    return studentsList
}



let studentsList = [

    {
        studentId: 123,
        studentName: "Wajeeh",
        phoneNumber: "+972532222222"
    },
    {
        studentId: 234,
        studentName: "Ezz",
        phoneNumber: "+972533333333"
    },
    {
        studentId: 345,
        studentName: "Diala",
        phoneNumber: "+97254444444"
    },
    {
        studentId: 456,
        studentName: "Jaafar",
        phoneNumber: "+97254444444"
    },
    {
        studentId: 567,
        studentName: "Tasneem",
        phoneNumber: "+97255555555"
    }

]


module.exports = retrieveStudent