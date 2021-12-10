import React from "react";
import './UsersList.css'
import UserItem from "./UserItem";
import users from "../data/users-list.json"

const UsersList = props => {

    if(users.length === 0) {
        return <div className="center">
            <h2>No users found!</h2>
        </div>
    }

    return <ul>
        {users.map(user => {
            return <UserItem key={user.id} user={user}/>
        })}
    </ul>;
}

export default UsersList;