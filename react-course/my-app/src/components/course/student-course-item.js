import React from "react";

const StudentCourse = props => {
    
    return <ul>
                        {props.courses.map((course => {
                            return <li>
                                        <span>{course.name}</span>
                                        <span>{course.hours}</span>
                                    </li>
                        }))}
                    </ul>
}

export default StudentCourse;