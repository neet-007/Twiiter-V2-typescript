import axios from 'axios'

const getCookie = (name:string) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const config = {
    headers: {
      'Accept':'application/json',
      'Content-type':'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    }
}

export async function getCSFRToken(){
    try {
        let res = await axios.get('/api/auth/csrf-token')
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function register({email, password, rePassword}:{email:string, password:string, rePassword:string}) {
    try {
        let res = await axios.post('/api/auth/register', {email, password, re_password:rePassword}, config)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function login({email, password}:{email:string, password:string}) {
    try {
        console.log('dsadd')
        let res = await axios.post('/api/auth/login', {email, password}, config)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function makeProfile({userName, mention, bio, img}:{userName:string, mention:string, bio:string, img?:string}) {
    try {
        let res = await axios.post('/api/auth/user-profile/', {user_name:userName, mention, bio}, config)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function getCheckUser(){
    try {
        let res = await axios.get('/api/auth/user-profile/check_user/')
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}


export async function logout() {
    try {
        let res = await axios.get('/api/auth/logout')
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function GetMainPageTweets({pageParam}:{pageParam:number}){
    try {
        let res = await axios.get(`/api/tweets/tweet/?page=${pageParam}`)
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function getMainPageTweets({type, pageParam}:{type:'for-you' | 'following', pageParam?:number}){
    try {
        let res = await axios.get(`/api/tweets/tweet/main_page/?type=${type}&page=${pageParam}`)
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function getSingleTweet({tweetId}:{tweetId:number}){
    try {
        let res = await axios.get(`/api/tweets/tweet/${tweetId}/`)
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function getPostComments({pageParam, tweetId}:{pageParam?:number, tweetId:number}){
    try {
        let res = await axios.get(`/api/tweets/tweet/${tweetId}/comments?=${pageParam}`)
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function makePostComment({tweetId, text}:{tweetId:number, text:string}){
    try {
        console.log('ghhhheererere')
        let res = await axios.post(`/api/tweets/tweet/${tweetId}/comments/`, {text}, config)
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function getUserProfile({userMention, page=1}:{userMention?:string, page:number}) {
    try {
        let res = await axios.get(`/api/tweets/tweet/get_user_profile?page=${page}&${userMention ? `user-mention=${userMention}`: ''}/`)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function Createtweet({text, tags, usersMentioned}:{text:string, tags?:string[], usersMentioned?:string[]}) {
    try {
        let res = await axios.post('/api/tweets/tweet/', {text, tags_:tags, users_mentioned_:usersMentioned}, config)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function likeTweet({tweetId}:{tweetId:number}) {
    try {
        let res = await axios.post(`/api/tweets/like/`, {tweet:tweetId}, config)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function bookmarkTweet({tweetId}:{tweetId:number}) {
    try {
        let res = await axios.post(`/api/tweets/bookmark/`, {tweet:tweetId}, config)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function getUserLists({pageParam}:{pageParam?:number}){
    try {
        let res = await axios.get(`/api/lists/list/user_lists/?page=${pageParam}`)
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function getSingleList({listId}:{listId:number}){
    try {
        let res = await axios.get(`/api/lists/list/${listId}/`)
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function followList({listId, isFollowed}:{listId:number, isFollowed:boolean}){
    try {
        console.log(isFollowed)
        if(isFollowed)
        {
            let res = await axios.post(`/api/lists/list/${listId}/unfollow/`, {}, config)
            console.log(res)
            return res.data
        }
        let res = await axios.post(`/api/lists/list/${listId}/follow/`, {}, config)
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function getListTweets({listId, pageParam=1}:{listId:number, pageParam?:number}){
    try {
        let res = await axios.get(`/api/lists/list/${listId}/tweets/?page=${pageParam}`)
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function search({q, f, src, page=1}:{q:string, f?:'live' | 'users' | 'lists', src?:'typed_query' | 'hashtag_click', page:number}){
    try {
        let res = await axios.get(`/api/search/?q=${q}${f ? `&f=${f}`:''}${src ? `&src=${src}`:''}&page=${page}`)
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function following({follower, unfollow}:{follower:number, unfollow?:boolean}){
    try {
        let res = await axios.post(`/api/following/follow/`, {follower, unfollow}, config)
        console.log(res)
        return res.data
    } catch (error) {
        console.log(error)
    }
}