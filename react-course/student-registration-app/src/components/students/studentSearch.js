import React, { useState, useContext} from "react"
import { ThemeContext } from "../../context/ThemeContext"
import fbconfig from "../../firebase/config"
import {collection, getDocs } from 'firebase/firestore/lite';

const StudentSearch = (props) => {


    const darkTheme = useContext(ThemeContext)
    const themeStyle = {
        backgroundColor: darkTheme ? `#333` : `#ccc`,
        color: darkTheme ? `#CCC` : `#333`,
        padding: `2rem`,
        margin: `2rem`
    }

    const onSearchHandler = () => {
        
       const fetchData = async () => {
            const studentsCollection = collection(fbconfig.ProjectFirestore, 'students')
            const studentsDocs = await getDocs(studentsCollection)
            const studentsList = studentsDocs.docs.map(s => s.data())
            props.onSearchComplete(studentsList)
        }
        
        fetchData()
    }

    return (

            <div style={themeStyle}>
                <span><input type="button" value="List" onClick={onSearchHandler}/></span>
            </div>

    )
}

export default StudentSearch