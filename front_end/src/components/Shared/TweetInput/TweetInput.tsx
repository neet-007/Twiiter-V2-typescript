import React, { ComponentProps, useEffect, useRef, useState } from 'react'
import { Button } from '../Button/Button'
import { ProfileIcon } from '../ProfileIcon/ProfileIcon'
import { EmojiSmile, GeoAlt, Image, Plus, X } from 'react-bootstrap-icons'
import { useMakePostComment, useMakeTweet } from '../../../lib/ReactQuery'
import { modalClick } from '../../../utils/modalClick'
import { ThreadsTweetInput } from './ThreadsTweetInput'

interface TweetInputCircleProps extends ComponentProps<'div'>{
  value:string
}

export const TweetInputCircle:React.FC<TweetInputCircleProps> = ({value}) => {
  return (
    <div className=' w-[1.5rem] h-[1.5rem] rounded-full flex items-center justify-center'
        style={{background:`conic-gradient(rgb(56 189 248) ${(value.length / 240) * 100 }%, white 0%)`}}>
      <div className=' bg-white w-[1rem] h-[1rem] rounded-full'>
      </div>
    </div>
  );
}

export interface TweetInputProps extends ComponentProps<'div'>{
  mobile?:boolean
  tweetId?:number
  modal?:boolean
  numOfTweets?:string[]
  numOfTweetIndex?:number
  tweetValue?:string
  canPostAll?:boolean
  handleChange?:(e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => void
  setNumOfTweets?:React.Dispatch<React.SetStateAction<string[]>>
}

function adjustHeight(textarea?:HTMLTextAreaElement){
    if (textarea){
        textarea.style.height = '0px'
        textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

export const TweetInput:React.FC<TweetInputProps> = ({mobile, tweetId , modal, canPostAll, numOfTweets, tweetValue, handleChange, numOfTweetIndex, setNumOfTweets, className}) => {
  const {mutateAsync:tweet, isSuccess:tweetIsSuccess} = useMakeTweet()
  const {mutate:commentFunc, isSuccess:commentIsSuccess} = useMakePostComment()
  const [value, setValue] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current){
        adjustHeight(textareaRef.current)
    }
  },[value, tweetValue])

  useEffect(() => {
    if (textareaRef.current)
    setValue('')
  },[tweetIsSuccess, commentIsSuccess])

  function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(textareaRef.current){
      if(tweetId) return commentFunc({tweetId, text:textareaRef.current.value})

      const additions = textareaRef.current.value.split(' ').reduce((acc:string[][], curr) => {
        if(curr.startsWith('#')) acc[0].push(curr.replace('#', ''))
        else if(curr.startsWith('@')) acc[1].push(curr.replace('@', ''))
        return acc
      },[[], []])

      tweet({text:textareaRef.current?.value, tags:additions[0], usersMentioned:additions[1]})
    }
  }

  function handleAllSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    console.log(numOfTweets)
  }

  return (
    <div className={`flex gap-2 ${className}`} onClick={(e) => modalClick(e, setIsOpen)}>
        <div className=' basis-[10%]'>
          <ProfileIcon Width='w-full'/>
        </div>
        <form onSubmit={modal ? handleAllSubmit: handleSubmit} className=' basis-[90%] flex flex-col gap-7'>
          <div className=' flex items-start'>
            <textarea name="" id="" className='w-full outline-none' style={{height:'0px'}}
             placeholder='What is happing ?!'
             value={modal ? tweetValue:value} onChange={modal ? (e) => handleChange!(e, numOfTweetIndex!):(e) => setValue(e.target.value)}
             ref={textareaRef}/>
             {(modal && numOfTweets!.length > 1) &&
              <button type='button' onClick={() => setNumOfTweets!(prev => prev.filter((x, i) => numOfTweetIndex !== i))}>
                <X/>
              </button>
             }
          </div>
            <div className='flex items-center justify-between'>
                <div className='flex gap-3'>
                    <span><Image/></span>
                    <span>aa</span>
                    <span><EmojiSmile/></span>
                    <span><GeoAlt/></span>
                </div>
                {!mobile &&
                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-1'>
                  <TweetInputCircle value={modal ? tweetValue!: value}/>
                  <button type='button' onClick={modal ? () => setNumOfTweets!(prev => [...prev, '']):() => setIsOpen(true)}>
                    <Plus size={20}/>
                  </button>
                  </div>
                  {!modal ?
                    <Button type='submit'>post</Button>
                  :
                  <button type='submit' disabled={!canPostAll}>post all</button>
                  }
                </div>
                }
            </div>
        </form>
        <ThreadsTweetInput isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  )
}
