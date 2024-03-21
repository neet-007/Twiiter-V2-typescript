import React, { ComponentProps, useEffect, useRef, useState } from 'react'
import { Button } from '../Button/Button'
import { ProfileIcon } from '../ProfileIcon/ProfileIcon'
import { EmojiSmile, GeoAlt, Image } from 'react-bootstrap-icons'
import { useMakePostComment, useMakeTweet } from '../../../lib/ReactQuery'

interface TweetInputProps extends ComponentProps<'div'>{
  mobile?:boolean
  tweetId?:number
}

function adjustHeight(textarea?:HTMLTextAreaElement){
    if (textarea){
        textarea.style.height = '0px'
        textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

export const TweetInput:React.FC<TweetInputProps> = ({mobile, tweetId ,className}) => {
  const {mutateAsync:tweet, data} = useMakeTweet()
  const {mutate:commentFunc} = useMakePostComment()
  const [value, setValue] = useState<string>('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current){
        adjustHeight(textareaRef.current)
    }
  },[value])

  function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(textareaRef.current){
      console.log(tweetId)
      if(tweetId) return commentFunc({tweetId, text:textareaRef.current.value})
      tweet({text:textareaRef.current?.value})
    }
  }

  return (
    <div className={`flex ${className}`}>
        <ProfileIcon className=' basis-[10%] ' Width='w-[10%]'/>
        <form onSubmit={handleSubmit} className=' basis-[90%] flex flex-col gap-7'>
            <textarea name="" id="" className='w-full outline-none' style={{height:'0px'}}
             placeholder='What is happing ?!'
             value={value} onChange={(e) => setValue(e.target.value)}
             ref={textareaRef}/>
            <div className='flex items-center justify-between'>
                <div className='flex gap-3'>
                    <span><Image/></span>
                    <span>aa</span>
                    <span><EmojiSmile/></span>
                    <span><GeoAlt/></span>
                </div>
                {!mobile &&
                  <Button>post</Button>
                }
            </div>
        </form>
    </div>
  )
}
