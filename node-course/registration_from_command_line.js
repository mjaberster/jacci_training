let chalk = require('chalk')

let args = process.argv.slice(2)
let operation = args[0];
switch(operation) {
    case "register":
        console.log("Registering");
        var studentnamearg = args.find(arg => arg.startsWith('--studentname'))
        var coursearg = args.find(arg => arg.startsWith('--course'))
        var paidarg = args.find(arg => arg.startsWith('--paid'));
        if(!studentnamearg || !coursearg || !paidarg){
            console.error("Command not valid")
        } else {
            let paid = paidarg.split("=")[1]
            if(paid === 'true'){
               let studentname = studentnamearg.split("=")[1]
                let course = coursearg.split("=")[1]
                console.log(`Registering student '${studentname}' to course '${course}'`)
            } else {
                console.error(`Student should pay first`)
            }
        }

    break;
    case "unregister":
        console.log("Unregister");
        break;
    default:
        console.log(`operation '${operation} is not supported'`);
}

