import React from "react";
import { Link } from "react-router-dom";
import './UserItem.css'

const UserItem = props => {
    return <li className="user-item">
               
                <span>
                    <Link to={`/student/${props.user.id}`}>
                        {props.user.name}
                    </Link>
                </span>
                <span>is registered to course</span>
                <span className="course-name">
                    <Link to={`/course/${props.user.course}`}>
                        {props.user.course}
                    </Link>
                </span>
            </li> 
}

export default UserItem;