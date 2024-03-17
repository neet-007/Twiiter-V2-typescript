import { useQuery, useMutation } from "@tanstack/react-query";
import { register, login, logout, Createtweet, makeProfile, GetMainPageTweets, getUserProfile, likeTweet, bookmarkTweet } from "./Axios";

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

export function useGetMainPageTweets(){
    return useQuery({
        queryKey:['main-page-tweets'],
        queryFn:GetMainPageTweets
    })
}

export function useGetUserProfile({userId, page}:{userId?:number, page:number}){
    return useQuery({
        queryKey:['user-profile', userId, page],
        queryFn:() => getUserProfile({userId, page})
    })
}

export function useMakeTweet(){
    return useMutation({
        mutationFn:({text}:{text:string}) => Createtweet({text})
    })
}

export function useLikeTweet(){
    return useMutation({
        mutationFn:({tweetId}:{tweetId:number}) => likeTweet({tweetId})
    })
}

export function useBookmarkTweet(){
    return useMutation({
        mutationFn:({tweetId}:{tweetId:number}) => bookmarkTweet({tweetId})
    })
}