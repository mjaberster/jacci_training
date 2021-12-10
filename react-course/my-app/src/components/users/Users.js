import React from "react";
import UsersList from "./UsersList";
import data from '../data/agenda.json'


const Users = () => {
    return <UsersList users={data}     />
}

export default Users;