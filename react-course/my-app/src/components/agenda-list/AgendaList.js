import React from "react";
import NewItem from '../new-item/NewItem';

const AgendaList = props => {
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
}

export default AgendaList