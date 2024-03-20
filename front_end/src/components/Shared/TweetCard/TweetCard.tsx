import React, { ComponentProps, useState } from 'react'
import { Bookmark, BookmarkFill, Chat, Heart, HeartFill } from 'react-bootstrap-icons'
import { useBookmarkTweet, useLikeTweet } from '../../../lib/ReactQuery'
import { useNavigate } from 'react-router-dom'
import { UserInterface } from '../../../context/UserContext'

export interface Tweet{
    id:number
    user:UserInterface
    text:string
    time:number
    img?:string
    likes:number
    replies:number
    bookmarks:number
}

interface TweetCardProps extends ComponentProps<'article'>{
    tweet:Tweet
}

export const TweetCard:React.FC<TweetCardProps> = ({tweet}) => {
  const {mutate:likeFunc,} = useLikeTweet()
  const {mutateAsync:bookmarkFunc} = useBookmarkTweet()
  const navigate = useNavigate()
  console.log(tweet)
  //const [like, setLike] = useState<{isLike:boolean, pending:boolean, likes:number}>({isLike:false, pending:false, likes:tweet.likes})
  //const [bookmark, setBookmark] = useState<{isBookmark:boolean, pending:boolean, bookmarks:number}>({isBookmark:false, pending:false, bookmarks:tweet.bookmarks})

/*  function handleLike(){
    if(like.pending) return
    setLike(prev => ({...prev, isLike:!prev.isLike, pending:true, likes:prev.isLike ? tweet.likes - 1 : tweet.likes + 1}))
    likeFunc({tweetId:tweet.id})
    .then(res=> {
        if('error' in res) {setLike(prev => ({...prev, pending:false})); return console.error('error like')}
        console.log(res['success'])
        setLike(prev => ({...prev, isLike:res['success'] , pending:false, likes:tweet.likes + 1}))
    })
  }
  function handleBookmark(){
    if(bookmark.pending) return
    setBookmark(prev => ({...prev, isBookmark:!prev.isBookmark, pending:true, bookmarks:prev.isBookmark ? tweet.bookmarks - 1:tweet.bookmarks + 1}))
    bookmarkFunc({tweetId:tweet.id})
    .then(res => {
        if('error' in res) {setBookmark(prev => ({...prev, pending:false})); return console.error('error like')}
        setBookmark(prev => ({...prev, isBookmark:res['success'], pending:false, bookmarks:tweet.bookmarks + 1}))
    })
  }
*/
  return (
    <article className='flex gap-2' onClick={() => navigate(`/post/${tweet.id}`)}>
        <div>{tweet.user.user_name}</div>
        <div className='w-full'>
            <div className='flex gap-2'>
                <p>{tweet.user.user_name}</p>
                <p>@{tweet.user.mention}</p>
                <p>{tweet.time}</p>
            </div>
            <div>{tweet.text}</div>
            <div>{tweet.img}</div>
            <div className='flex justify-between'>
                <div className='flex items-center justify-center gap-2'><Chat/>{tweet.replies}</div>
                <div className='flex items-center justify-center gap-2'>
                    {//like.isLike?
                        <HeartFill fill='red' onClick={() => likeFunc({tweetId:tweet.id, tweet:{...tweet, likes:tweet.likes + 1}})}/>
                    //:
                      //  <Heart onClick={handleLike}/>
                    }
                    {tweet.likes}
                    </div>
                <div className='flex items-center justify-center gap-2'>
                    {//bookmark.isBookmark?
                       <BookmarkFill onClick={() => bookmarkFunc({tweetId:tweet.id, tweet:{...tweet, bookmarks:tweet.bookmarks + 1}})}/>
                    //:
                    //    <Bookmark onClick={handleBookmark}/>
                    }
                    {tweet.bookmarks}
                    </div>
            </div>
        </div>
    </article>
  )
}
