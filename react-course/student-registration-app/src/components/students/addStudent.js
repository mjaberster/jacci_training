import React, {useState} from "react"

const AddStudent = (props) => {

    let [studentName, setStudentName] = useState("")
    let [phoneNumber, setphonNumber] = useState("")
 
    const onChangeHandler = (event) => {
        if(event.target.name === "studentName") {
            setStudentName(event.target.value)
        } else if (event.target.name === "phoneNumber") {
            setphonNumber(event.target.value)
        }
    }

    const onAddClickedHandler = (event) => {
        if(!phoneNumber || !studentName) {
            let err = new Error()
            err.message = "Student name and Phone number are mandatory"
            props.onError(err)
            return
        }
        let student = {studentName, phoneNumber}
        postData(student)
    }

    const postData = async (student) => {

        await fetch(`http://localhost:3001/students/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        }).then(response => response.json())
        .then(data => props.onAddComplete(data))
    }


    return (
        <div>
            <div>
                <span><label>Student name:  </label></span>
                <span><input name="studentName" type="text" onChange={onChangeHandler} value={studentName}/></span>
            </div>
            <div>
                <span><label>Phone number:  </label></span>
                <span><input name="phoneNumber" type="text" onChange={onChangeHandler} value={phoneNumber} /></span>
            </div>
            <div>
                <span><label></label></span>
                <span><input type="button" value="add" onClick={onAddClickedHandler}/></span>
            </div>
        </div>
    )
}

export default AddStudent