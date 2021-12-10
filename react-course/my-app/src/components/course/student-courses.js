import React from "react";
import { useParams } from "react-router";
import studentCourses from "../data/student-courses.json"
import StudentCourse from "./student-course-item";


const StudentCourseList = props => {
    const studentId = useParams().studentid;
    const student = studentCourses.find((student => {
        console.log(student)
        return student.student.id === studentId
    }))

    return <div>
                    <h1>Student name <span>{student.student.name}</span></h1>
                    <StudentCourse courses={student.courses} />
            </div>


    
}

export default StudentCourseList;