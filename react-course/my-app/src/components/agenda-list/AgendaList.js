import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import NewItem from '../new-item/NewItem';
import AuthForm from "../auth/AuthForm";
import SignIn from "../auth/Signin";

const AgendaList = props => {

    const userContext = useContext(UserContext)
    
    if(userContext.isLogedIn) {
        return (
        
            <div className="course-agenda"> 
                <h2>Course Agenda</h2>
                <NewItem onAddItem={props.onAddItem}/>
                    {
                        props.courseAgendaItems.map(item => {
                            return  <div className="agenda-list" key={item.id}>
                                        <span>
                                            <label>{item.text}</label>
                                        </span>
                                    </div>
                        })
                    }
            </div> 
    
        );
    } else {
        return <SignIn refresh={props.refresh}/>
    }
}

export default AgendaList