import { useQuery, useMutation, useInfiniteQuery} from "@tanstack/react-query";
import { register, login, logout, Createtweet, makeProfile, GetMainPageTweets, getUserProfile, likeTweet, bookmarkTweet, getPostComments, makePostComment, getSingleTweet, getSingleList } from "./Axios";
import {queryclient} from '../main'
import { Tweet, TweetCard } from "../components/Shared/TweetCard/TweetCard";

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
/*
export function useGetMainPageTweets(){
    return useQuery({
        queryKey:['main-page-tweets'],
        queryFn:GetMainPageTweets
    })
}
*/
export function useGetUserProfile({userId, page}:{userId?:number, page:number}){
    return useQuery({
        queryKey:['user-profile', userId, page],
        queryFn:() => getUserProfile({userId, page})
    })
}

export function useMakeTweet(){
    return useMutation({
        mutationFn:({text}:{text:string}) => Createtweet({text}),
        onSuccess:() => {queryclient.invalidateQueries({queryKey:['tweets-i']})}
    })
}

export function useLikeTweet(){
    return useMutation({
        mutationFn:({tweetId, tweet}:{tweetId:number, tweet?:Tweet}) => likeTweet({tweetId}),
        onMutate:async ({tweetId, tweet}) => {
            await queryclient.cancelQueries({queryKey:['tweets-i', tweetId]})
            const prevData = queryclient.getQueryData(['tweets-i', tweetId])
            queryclient.setQueryData(['tweets-i', tweetId], tweet)
            return { prevData, tweet}
        }
    })
}

export function useBookmarkTweet(){
    return useMutation({
        mutationFn:({tweetId, tweet}:{tweetId:number, tweet?:Tweet}) => bookmarkTweet({tweetId}),
        onMutate:async ({tweetId, tweet}) => {
            await queryclient.cancelQueries({queryKey:['tweets-i', tweetId]})
            const prevData = queryclient.getQueryData(['tweets-i'])
            console.log(prevData)
            console.log(tweet)
            queryclient.setQueryData(['tweets-i', tweetId], tweet)
            return {prevData, tweet}
        },
        onSettled: ({tweetId}) => {
            queryclient.invalidateQueries({queryKey:['tweets-i', tweetId]})
        }
    })
}

export function useInfiniteTweets(){
    return useInfiniteQuery({
        queryKey:['tweets-i'],
        initialPageParam:1,
        queryFn:GetMainPageTweets,
        getNextPageParam:(lastPage) => lastPage.next,

    })
}

export function useGetSingleTweet({tweetId}:{tweetId:number}){
    return useQuery({
        queryKey:['tweet',tweetId],
        queryFn:() => getSingleTweet({tweetId})
    })
}

export function useGetPostComments({tweetId}:{tweetId:number}){
    return useInfiniteQuery({
        queryKey:['comment', tweetId],
        initialPageParam:1,
        queryFn:() => getPostComments({tweetId}),
        getNextPageParam:(lastPage) => lastPage.next,
    })
}

export function useMakePostComment(){
    return useMutation({
        mutationFn:({tweetId, text}:{tweetId:number, text:string}) => makePostComment({tweetId, text}),
        onSuccess:(data, {tweetId}) => {
            queryclient.invalidateQueries({queryKey:['comment', tweetId]})
        }
    })
}

export function useGetSingleList({listId}:{listId:number}){
    return useQuery({
        queryKey:['list', listId],
        queryFn:() => getSingleList({listId})
    })
}