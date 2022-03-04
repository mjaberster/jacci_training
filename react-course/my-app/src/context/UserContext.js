import React from 'react'

export let defaultUserContext = {
    isLogedIn: false,
    token: null,
    googleUser: null,
    loginStatus: null,
    loginMsg: "",
    login: async () => {},
    logout: () => {},
    googleLogin: () => {},
    googleLogout: () => {},
    refreshLoginState: () => {}
}

export const UserContext = React.createContext(defaultUserContext)