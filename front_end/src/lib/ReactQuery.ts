import { useQuery, useMutation, useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import { register, login, logout, Createtweet, makeProfile, GetMainPageTweets, getUserProfile, likeTweet, bookmarkTweet, getPostComments, makePostComment, getSingleTweet, getSingleList, getListTweets, search, following, getMainPageTweets } from "./Axios";
import { Tweet } from "../components/Shared/TweetCard/TweetCard";

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
    const queryclient = useQueryClient()
    return useMutation({
        mutationFn:({text}:{text:string}) => Createtweet({text}),
        onSuccess:() => {queryclient.invalidateQueries({queryKey:['tweets-i']})}
    })
}

export function useLikeTweet(){
    const queryclient = useQueryClient()
    return useMutation({
        mutationFn:({tweetId, tweet}:{tweetId:number, tweet?:Tweet}) => likeTweet({tweetId}),
        onSuccess:(data) => {
            queryclient.invalidateQueries({queryKey:['tweet', data.tweet_id]})
        }
    })
}

export function useBookmarkTweet(){
    const queryclient = useQueryClient()
    return useMutation({
        mutationFn:({tweetId, tweet}:{tweetId:number, tweet?:Tweet}) => bookmarkTweet({tweetId}),
        onSuccess: (data) => {
            console.log(data)
            queryclient.invalidateQueries({queryKey:['tweet', data.tweet_id]})
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

export function useGetMainPageTweets(type:'for-you' | 'following'){
    return useInfiniteQuery({
        queryKey:['tweets-main', type],
        initialPageParam:1,
        queryFn: ({queryKey, pageParam}) => getMainPageTweets({type:queryKey[1] as 'for-you' | 'following', pageParam}),
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
    const queryclient = useQueryClient()
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

export function useGetListTweets({listId, pageParam}:{listId:number, pageParam?:number}){
    return useInfiniteQuery({
        queryKey:['list', 'list-tweets', listId],
        initialPageParam:1,
        getNextPageParam:(lastPage) => lastPage.next,
        queryFn:() => getListTweets({listId})
    })
}

export function useSearch({q, f, page}:{q:string, f?:'live' | 'users' | 'lists', page:number}){
    return useInfiniteQuery({
        queryKey:['search', q, f, page],
        initialPageParam:1,
        getNextPageParam:(lastPage) => lastPage.next,
        queryFn:() => search({q, f, page})
    })
}

export function useFollowing(){
    return useMutation({
        mutationFn:({follower, unfollow}:{follower:number, unfollow?:boolean}) => following({follower, unfollow})
    })
}