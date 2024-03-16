import { useQuery, useMutation } from "@tanstack/react-query";
import { register, login, logout, Createtweet, makeProfile } from "./Axios";

export function useRegister(){
    return useMutation({
        mutationFn:({email, password, rePassword}:{email:string, password:string, rePassword:string}) => register({email, password, rePassword})
    })
}

export function useLogin(){
    return useMutation({
        mutationFn:({email, password}:{email:string, password:string}) => login({email, password})
    })
}

export function useMakeProfile(){
    return useMutation({
        mutationFn:({userName, mention, bio, img}:{userName:string, mention:string, bio:string, img:string}) => makeProfile({userName, mention, bio, img})
    })
}


export function useLogout(){
    return useQuery({
        queryKey:['login'],
        queryFn:logout
    })
}