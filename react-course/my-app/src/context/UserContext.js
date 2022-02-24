import React from 'react'

export let defaultUserContext = {
    isLogedIn: false,
    token: null,
    loginStatus: null,
    loginMsg: "",
    login: async () => {},
    logout: () => {}
}

export const UserContext = React.createContext(defaultUserContext)