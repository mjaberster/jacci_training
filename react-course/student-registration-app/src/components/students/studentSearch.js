import React, { useEffect, useState } from "react"

const StudentSearch = (props) => {

    const [studentId, setStudentId] = useState("")
    

    const onSearchHandler = (event) => {
        
       const fetchData = async (studentId) => {
            await fetch(`http://localhost:3001/students/${studentId}`, {
                "method": "GET"
            })
            .then(response => {
                if(response.ok)
                  return  response.json()
            })
            .then(data => props.onSearchComplete(data))
            .catch((error) => {
                throw new Error(error.message)
            })
            }

        fetchData(studentId)
    }

    const onTextChange = (event) => {
        let textValue = event.target.value
        setStudentId(textValue)
    }

    return (

            <div>
                <span><input type="text" onChange={onTextChange}/></span>
                <span><input type="button" value="Search" onClick={onSearchHandler}/></span>
            </div>

    )
}

export default StudentSearch