//calculator example

let operation = process.argv[2];
let firstNumber = parseInt(process.argv[3]);
let secondNumber = parseInt(process.argv[4]);

if(operation === 'add') {
    console.log(add(firstNumber, secondNumber));
} else if (operation === 'sub') {
    console.log(sub(firstNumber, secondNumber));
} else {
    console.log(`operation is '${operation}' not supported`)
}

function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function sub(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}