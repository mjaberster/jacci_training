const validator = require('validator')
const chalk = require('validator')
const fs = require('fs')

parseAndValidate = function(data) {
    student = JSON.parse(data)
    if(validator.isEmail(student.email)){
        console.log(chalk.red("Student ${{student.name}} email is not vaild ${{student.email}}"))
    } else if(validator.isMobilePhone(student.phone)){
        console.log(chalk.red("Student ${{student.name}} phone is not vaild ${{student.email}}"))
    } else {
        fs.appendFileSync('registeration.txt', 'student ${{student.name}} has been registered to the course')
    }
}

module.exports = parseAndValidate