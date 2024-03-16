import React, {useState, useEffect, createContext, useContext, ComponentProps} from "react";
import { getCheckUser } from "../lib/Axios";

const INITAIL_USER = {
    userName:undefined,
    mention:undefined,
    bio:undefined,
    following:undefined,
    followers:undefined,
    is_verified:false
}

interface ContextType{
    user: typeof INITAIL_USER
    setUser:React.Dispatch<React.SetStateAction<any>>
    isAuthenticated:boolean
    setIsAuthenticated:React.Dispatch<React.SetStateAction<any>>
    checkUser:() => void
}

const INITAIL_STATE = {
    user:INITAIL_USER,
    setUser:() => {},
    isAuthenticated:false,
    setIsAuthenticated:() => {},
    checkUser:() => {}
}


const UserContext = createContext<ContextType>(INITAIL_STATE)

export const UserContextProvider:React.FC<ComponentProps<'div'>> = ({children}) => {

    const [user, setUser] = useState<typeof INITAIL_USER>(INITAIL_USER)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    function checkUser(){
        getCheckUser()
            .then(res => {
                if ('success' in res)
                setUser(res.success)
                setIsAuthenticated(true)
            })
    }

    useEffect(() => {
        checkUser()
    },[])

    const value = {
        user:user,
        setUser:setUser,
        isAuthenticated:isAuthenticated,
        setIsAuthenticated:setIsAuthenticated,
        checkUser:checkUser
    }
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}


export const useUserContext = () => useContext(UserContext)