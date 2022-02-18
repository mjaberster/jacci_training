
import React from 'react'

export const UserContext = React.createContext({
    isLogedIn: false,
    login: () => {},
    logout: () => {}
})