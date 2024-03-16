import React, { ComponentProps } from 'react'

interface Tweet{
    user:{userName:string, mention:string, img:string}
    text:string
    date:number
    img?:string
    likes:number
    replies:number
    bookmarks:number
}

interface TweetCardProps extends ComponentProps<'article'>{
    tweet:Tweet
}

export const TweetCard:React.FC<TweetCardProps> = ({tweet}) => {
  return (
    <article className='flex gap-2'>
        <div>{tweet.user.img}</div>
        <div className=' bg-slate-600 w-full'>
            <div className='flex gap-2'>
                <p>{tweet.user.userName}</p>
                <p>@{tweet.user.mention}</p>
                <p>{tweet.date}</p>
            </div>
            <div>{tweet.text}</div>
            <div>{tweet.img}</div>
            <div className='flex justify-between'>
                <div>{tweet.replies}</div>
                <div>{tweet.likes}</div>
                <div>{tweet.bookmarks}</div>
            </div>
        </div>
    </article>
  )
}
