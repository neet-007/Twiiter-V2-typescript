import React, {useState, useEffect, createContext, useContext, ComponentProps} from "react";
import { getCheckUser } from "../lib/Axios";

export interface UserInterface{
    id:number | undefined
    user_name:string | undefined,
    mention:string | undefined,
    bio:string | undefined,
    following:number | undefined,
    followers:number | undefined,
    is_followed:boolean
}

const INITAIL_USER = {
    id:undefined,
    user_name:undefined,
    mention:undefined,
    bio:undefined,
    following:undefined,
    followers:undefined,
    is_followed:false
}

interface ContextType{
    user: UserInterface
    setUser:React.Dispatch<React.SetStateAction<any>>
    isAuthenticated:boolean | undefined
    setIsAuthenticated:React.Dispatch<React.SetStateAction<any>>
    isLoading:boolean | undefined
    setIsLoading:React.Dispatch<React.SetStateAction<any>>
    hasProfile:boolean | undefined
    setHasProfile:React.Dispatch<React.SetStateAction<any>>
    checkUser:() => void
    emailVerified:boolean | undefined
}

const INITAIL_STATE = {
    user:INITAIL_USER,
    setUser:() => {},
    isAuthenticated:undefined,
    setIsAuthenticated:() => {},
    isLoading:true,
    setIsLoading:() => {},
    hasProfile:undefined,
    setHasProfile:() => {},
    checkUser:() => {},
    emailVerified:undefined
}


const UserContext = createContext<ContextType>(INITAIL_STATE)

export const UserContextProvider:React.FC<ComponentProps<'div'>> = ({children}) => {

    const [user, setUser] = useState<typeof INITAIL_USER>(INITAIL_USER)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [hasProfile, setHasProfile] = useState<boolean>(false)
    const [emailVerified, setEmailVerified] = useState<boolean>(false)

    function checkUser(){
        getCheckUser()
            .then(res => {
                if ('error' in res) return
                if(!res.success.profile){
                    setHasProfile(false)
                    setIsAuthenticated(true)
                    setEmailVerified(res.success.user.email_verified)
                    setIsLoading(false)
                }
                else{
                    setUser(res.success.profile)
                    setHasProfile(true)
                    setIsAuthenticated(true)
                    setEmailVerified(true)
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
        checkUser,
        emailVerified
    }
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}


export const useUserContext = () => useContext(UserContext)