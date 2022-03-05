import React, { useState, useContext} from "react"
import { ThemeContext } from "../../context/ThemeContext"
import {app} from "../../firebase/config"
import { getFirestore, getDocs, doc, collection, onSnapshot, query, where } from "firebase/firestore";

const StudentSearch = (props) => {

    const [name, setName] = useState("")
    const darkTheme = useContext(ThemeContext)
    const themeStyle = {
        backgroundColor: darkTheme ? `#333` : `#ccc`,
        color: darkTheme ? `#CCC` : `#333`,
        padding: `2rem`,
        margin: `2rem`
    }

    const onSearchHandler = () => {
        
        const fetchData = async () => {

            const db = getFirestore(app)
            if(!name) {
                const studentsCollection = collection(db, 'students')
                const studentsDocs = await getDocs(studentsCollection)
                const studentsList = studentsDocs.docs.map(s => s.data())
                props.onSearchComplete(studentsList)
                return
            } else {
                const q = query(collection(db, "students"), where("firstname", "==", name));
                    const unsubcribe = onSnapshot(q, (querySnapshot) => {
                    const studentsList = []
                     querySnapshot.forEach(doc => studentsList.push(doc.data()));
                    props.onSearchComplete(studentsList)
                });
            }
        }

        fetchData()
    }


    return (

            <div style={themeStyle}>
                <span><input type="text" onChange={e => setName(e.target.value)} value={name}/></span>
                <span><input type="button" value="List" onClick={onSearchHandler}/></span>
            </div>

    )
}

export default StudentSearch