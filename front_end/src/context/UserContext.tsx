import React, {useState, useEffect, createContext, useContext, ComponentProps} from "react";
import { getCheckUser } from "../lib/Axios";

export interface UserInterface{
    userName:string | undefined,
    mention:string | undefined,
    bio:string | undefined,
    following:number | undefined,
    followers:number | undefined,
    is_verified:boolean
}

const INITAIL_USER = {
    userName:undefined,
    mention:undefined,
    bio:undefined,
    following:undefined,
    followers:undefined,
    is_verified:false
}

interface ContextType{
    user: UserInterface
    setUser:React.Dispatch<React.SetStateAction<any>>
    isAuthenticated:boolean
    setIsAuthenticated:React.Dispatch<React.SetStateAction<any>>
    isLoading:boolean
    setIsLoading:React.Dispatch<React.SetStateAction<any>>
    hasProfile:boolean
    setHasProfile:React.Dispatch<React.SetStateAction<any>>
    checkUser:() => void
}

const INITAIL_STATE = {
    user:INITAIL_USER,
    setUser:() => {},
    isAuthenticated:false,
    setIsAuthenticated:() => {},
    isLoading:true,
    setIsLoading:() => {},
    hasProfile:false,
    setHasProfile:() => {},
    checkUser:() => {}
}


const UserContext = createContext<ContextType>(INITAIL_STATE)

export const UserContextProvider:React.FC<ComponentProps<'div'>> = ({children}) => {

    const [user, setUser] = useState<typeof INITAIL_USER>(INITAIL_USER)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [hasProfile, setHasProfile] = useState<boolean>(false)

    function checkUser(){
        getCheckUser()
            .then(res => {
                if ('error' in res) return
                if(!res.success.profile){
                    setHasProfile(false)
                    setIsAuthenticated(true)
                    setIsLoading(false)
                }
                else{
                    setUser(res.success.profile)
                    setHasProfile(true)
                    setIsAuthenticated(true)
                    setIsLoading(false)
                }
            })
    }

    useEffect(() => {
        checkUser()
    },[])

    const value = {
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        setIsLoading,
        hasProfile,
        setHasProfile,
        checkUser
    }
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}


export const useUserContext = () => useContext(UserContext)