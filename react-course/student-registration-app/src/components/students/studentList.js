import React, { useState } from "react"
import StudentSearch from "./studentSearch"

const StudentsList = () => {

    const [student, setStudent] = useState({})
    const [errorMessage, setErrorMessage] = useState("")
    const onSearchCompleteHandler = (searchResults) => {
        if(!searchResults){
            setStudent({})
            setErrorMessage("No search results have been found")
            return
        }
        setStudent(searchResults)
        setErrorMessage("")
    }

    return (

            <div>
                <StudentSearch onSearchComplete={onSearchCompleteHandler}/>
                <ul>
                    <li>
                         <span>Student id: {student.studentId}, Student name: {student.studentName}, Phone: {student.phoneNumber} </span>   
                    </li>
                </ul>
                <label>{errorMessage}</label>
            </div>
    )
}

export default StudentsList