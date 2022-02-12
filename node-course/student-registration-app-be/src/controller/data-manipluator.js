const MongoConnetor = require("../dataaccess/MongoConnect")

const addStudentIfNotExist = async (student) => {
    

    const foundStudent = await MongoConnetor.findStudent(student)
    if(foundStudent) {
        let err = new Error(`Student already exists`)
        err.status = 400
        throw err
    }
    await MongoConnetor.createStudent(student)
}

const addStudentIfNotExistAsync = async (student, asyncCall, onChangeAsyncState) => {

    const foundStudent = await MongoConnetor.findStudent(student)
    console.log(foundStudent)
    if(foundStudent) {
        onChangeAsyncState(asyncCall, 'ERROR_ALREADY_EXIST')
        return
    }
    const addedStudent = await MongoConnetor.createStudent(student)
    if(addedStudent) {
        onChangeAsyncState(asyncCall, 'SUCCESS')
    } else {
        onChangeAsyncState(asyncCall, 'FAILED')
    }
}


module.exports = {addStudentIfNotExist, addStudentIfNotExistAsync}