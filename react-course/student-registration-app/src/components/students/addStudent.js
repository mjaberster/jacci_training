import React from "react"

const AddStudent = (props) => {

    let student = {}


    const onChangeHandler = (event) => {
        let field = event.target.name
        let value = event.target.value
        console.log(`adding: ${field} ${value}`)
        student[field] = value
        console.log(student)
    }

    const onAddClickedHandler = (event) => {
        if(!student.phoneNumber || !student.studentName) {
            let err = new Error()
            err.message = "Student name and Phone number are mandatory"
            props.onError(err)
            return
        }
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
                <span><input name="studentName" type="text" onChange={onChangeHandler}/></span>
            </div>
            <div>
                <span><label>Phone number:  </label></span>
                <span><input name="phoneNumber" type="text" onChange={onChangeHandler} /></span>
            </div>
            <div>
                <span><label></label></span>
                <span><input type="button" value="add" onClick={onAddClickedHandler}/></span>
            </div>
        </div>
    )
}

export default AddStudent