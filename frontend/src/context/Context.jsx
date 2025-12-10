import { createContext, useState } from "react";

export const GlobalContext=new createContext()
const backendUrl=import.meta.env.VITE_BACKEND_URL
const GlobalContextProvider=({children})=>{
    
    const [loginStatus,setLoginStatus]=useState('')
    const [token,setToken]=useState(null)

    const value={
        backendUrl,
        loginStatus,
        setLoginStatus,
        token,
        setToken
    }
    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalContextProvider