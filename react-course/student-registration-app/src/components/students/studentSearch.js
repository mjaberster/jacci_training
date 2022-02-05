import React, { useState } from "react"

const StudentSearch = (props) => {

    const [studentNameSearch, setStudentNameSearch] = useState("")
    
    const onSearchHandler = (event) => {
        
       const fetchData = async (studentName) => {
            await fetch(`http://localhost:3001/students/${studentName}`, {
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

        fetchData(studentNameSearch)
    }

    

    const onTextChange = (event) => {
        let textValue = event.target.value
        setStudentNameSearch(textValue)
    }



    return (

            <div>
                <span><input type="text" onChange={onTextChange}/></span>
                <span><input type="button" value="Search" onClick={onSearchHandler}/></span>
            </div>

    )
}

export default StudentSearch