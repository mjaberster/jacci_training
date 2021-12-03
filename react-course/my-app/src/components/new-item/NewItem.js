import React from "react";
import { useState } from "react/cjs/react.development";
import './NewItem.css';


const NewItem = (props) => {

    const [textValue, setEnteredText] = useState("")
    const addItemHandler = (event) => {
        event.preventDefault();
        const item = {
            "id": Math.random(),
            "text": textValue
        }
        props.onAddItem(item);
        setEnteredText("");
    }

    const onTextValueChangedHandler = (event) => {
        setEnteredText(event.target.value);
    }


    return <form onSubmit={addItemHandler}>
        <span><input type="text" className="new-item-field" onChange={onTextValueChangedHandler} value={textValue}/></span>
        <span><button type="submit" className="new-item-button">Add</button></span>

    </form>
}

export default NewItem;