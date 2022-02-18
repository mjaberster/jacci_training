import React, { useContext, useState } from "react"
import { ThemeContext } from "../../context/ThemeContext"
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
        if(data.err) {
            onErrorHandler({message:data.err.errMessage})
            return
        }
        setMessage(data.message)
    }

    const darkTheme = useContext(ThemeContext)

    const themeStyle = {
        backgroundColor: darkTheme ? `#333` : `#ccc`,
        color: darkTheme ? `#CCC` : `#333`,
        padding: `2rem`,
        margin: `2rem`
    }


    return (
            <div style={themeStyle}>
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