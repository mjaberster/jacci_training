import React, { useState } from "react"
import AddStudent from "./addStudent"
import StudentSearch from "./studentSearch"

const StudentsList = () => {

    const [students, setStudents] = useState([])
    const [message, setMessage] = useState("")
    const onSearchCompleteHandler = (searchResults) => {
        if(!searchResults){
            setStudents([])
            setMessage("No search results have been found")
            return
        }
        setStudents(searchResults)
        setMessage("")
    }

    const onErrorHandler = (error) => {
        setMessage(error.message)
    }

    const onAddComplete = (data) => {
        setMessage(data.message)
    }

    return (

            <div>
                <div>
                    <StudentSearch onSearchComplete={onSearchCompleteHandler}/>
                </div>
                <div>
                    <AddStudent onAddComplete={onAddComplete} onError={onErrorHandler}/>
                </div>
                <div>
                    <ul>
                        {
                            students.map(s => {
                                return  <li>
                                            <span>Student id: {s.studentId}, Student name: {s.studentName}, Phone: {s.phoneNumber} </span>   
                                        </li>
                            })
                        }
                    </ul>
                </div>
                <div>
                    <label>{message}</label>
                </div>
                
            </div>
    )
}

export default StudentsList