const square = (x) => {
    return x * x;
}

console.log(square(3))

const qube = (x) => x*x*x;

console.log(qube(3))




const student = {
    studentName: "Ali",
    studentAge:18,
    courseList:['fullstack', 'c++', 'BI'],
    printStudentInfo(){
        console.log(`Student name: '${this.studentName}'`)
        console.log(`Student age: '${this.studentAge}'`)
    },

    printCourses(){
        this.courseList.forEach((x)=>console.log(x)); //explain this
    }

}


student.printStudentInfo();
student.printCourses();