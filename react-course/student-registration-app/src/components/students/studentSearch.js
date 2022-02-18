import React, { useState, useContext} from "react"
import { ThemeContext } from "../../context/ThemeContext"

const StudentSearch = (props) => {

    const [studentNameSearch, setStudentNameSearch] = useState("")
    const darkTheme = useContext(ThemeContext)
    const themeStyle = {
        backgroundColor: darkTheme ? `#333` : `#ccc`,
        color: darkTheme ? `#CCC` : `#333`,
        padding: `2rem`,
        margin: `2rem`
    }

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

            <div style={themeStyle}>
                <span><input type="text" onChange={onTextChange}/></span>
                <span><input type="button" value="Search" onClick={onSearchHandler}/></span>
            </div>

    )
}

export default StudentSearch