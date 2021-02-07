import React, { useState, createContext } from 'react';


export const UserContext = createContext();

export const UserProvider = (props)=> {

    const [authUser, setAuthUser] = useState(null)

    return (
        <UserContext.Provider value={[authUser, setAuthUser]}>
            {props.children}
        </UserContext.Provider>
    )
}
