import React, { ComponentProps, useEffect, useState } from 'react'
import { Bookmark, BookmarkFill, Chat, Heart, HeartFill } from 'react-bootstrap-icons'
import { useBookmarkTweet, useLikeTweet } from '../../../lib/ReactQuery'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserInterface } from '../../../context/UserContext'
import { twitterStyleTime } from '../../../utils/twiiterStyleTime'

export interface Tweet{
    id:number
    user:UserInterface
    text:string
    time:string
    img?:string
    likes:number
    replies:number
    bookmarks:number
    is_liked:boolean,
    is_bookmarked:boolean
}

interface TweetCardProps extends ComponentProps<'article'>{
    tweet:Tweet
}

export const TweetCard:React.FC<TweetCardProps> = ({tweet}) => {
  const {mutate:likeFunc, isPending:isPendingLike, isError:isErrorLike, isSuccess:isSuccessLike} = useLikeTweet()
  const {mutateAsync:bookmarkFunc, isPending:isPendingBook, isError:isErrorBook, isSuccess:isSuccessBook} = useBookmarkTweet()
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const [like, setLike] = useState<{isLike:boolean, likes:number}>({isLike:tweet.is_liked, likes:tweet.likes})
  const [bookmark, setBookmark] = useState<{isBookmark:boolean, bookmarks:number}>({isBookmark:tweet.is_bookmarked, bookmarks:tweet.bookmarks})

  useEffect(() => {
    if(isErrorLike)setLike(prev => ({...prev, isLike:tweet.is_liked, likes:tweet.likes}))
    if(isErrorBook)setBookmark(prev => ({...prev, isBookmark:tweet.is_bookmarked, bookmarks:tweet.bookmarks}))

  },[isErrorLike, isErrorBook])

  function handleLike(){
    if(isPendingLike) return
    setLike(prev => ({...prev, isLike:!prev.isLike, likes:prev.isLike ? tweet.likes - 1 : tweet.likes + 1}))
    likeFunc({tweetId:tweet.id})
  }
  function handleBookmark(){
    if(isPendingBook) return
    setBookmark(prev => ({...prev, isBookmark:!prev.isBookmark, bookmarks:prev.isBookmark ? tweet.bookmarks - 1:tweet.bookmarks + 1}))
    bookmarkFunc({tweetId:tweet.id})
  }

  return (
    <article className='flex gap-2'>
        <div>{tweet.user.user_name}</div>
        <div className='w-full'>
          <div onClick={() => pathname.includes('/path/') ? () => {} : navigate(`/post/${tweet.id}`)}>
            <div className='flex gap-2'>
                <p>{tweet.user.user_name}</p>
                <p>@{tweet.user.mention}</p>
                <p>{twitterStyleTime(tweet.time)}</p>
            </div>
          </div>
            <div>{tweet.text}</div>
            <div>{tweet.img}</div>
            <div className='flex justify-between'>
                <div className='flex items-center justify-center gap-2'><Chat/>{tweet.replies}</div>
                <div className='flex items-center justify-center gap-2'>
                    {like.isLike?
                        <HeartFill fill='red' onClick={handleLike}/>
                    :
                        <Heart onClick={handleLike}/>
                    }
                    {like.likes}
                    </div>
                <div className='flex items-center justify-center gap-2'>
                    {bookmark.isBookmark?
                       <BookmarkFill onClick={handleBookmark}/>
                    :
                        <Bookmark onClick={handleBookmark}/>
                    }
                    {bookmark.bookmarks}
                    </div>
            </div>
        </div>
    </article>
  )
}


// onClick={() => likeFunc({tweetId:tweet.id, tweet:{...tweet, likes:tweet.likes - 1}})}
//onClick={() => likeFunc({tweetId:tweet.id, tweet:{...tweet, likes:tweet.likes + 1}})}
//onClick={() => bookmarkFunc({tweetId:tweet.id, tweet:{...tweet, bookmarks:tweet.bookmarks - 1}})}
//onClick={() => bookmarkFunc({tweetId:tweet.id, tweet:{...tweet, bookmarks:tweet.bookmarks + 1}})}