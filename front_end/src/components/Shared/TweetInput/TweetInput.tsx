import React, { ComponentProps, useEffect, useRef, useState } from 'react'
import { Button } from '../Button/Button'
import { ProfileIcon } from '../ProfileIcon/ProfileIcon'
import { EmojiSmile, GeoAlt, Image, Plus } from 'react-bootstrap-icons'
import { useMakePostComment, useMakeTweet } from '../../../lib/ReactQuery'
import { Modal } from '../Modal/Modal'
import { modalClick } from '../../../utils/modalClick'

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

interface TweetInputProps extends ComponentProps<'div'>{
  mobile?:boolean
  tweetId?:number
  modal?:boolean
}

function adjustHeight(textarea?:HTMLTextAreaElement){
    if (textarea){
        textarea.style.height = '0px'
        textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

export const TweetInput:React.FC<TweetInputProps> = ({mobile, tweetId , modal, className}) => {
  const {mutateAsync:tweet, data} = useMakeTweet()
  const {mutate:commentFunc} = useMakePostComment()
  const [value, setValue] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
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
    <div className={`flex gap-2 ${className}`} onClick={(e) => modalClick(e, setIsOpen)}>
        <div className=' basis-[10%]'>
          <ProfileIcon Width='w-full'/>
        </div>
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
                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-1'>
                  <TweetInputCircle value={value}/>
                  <button onClick={modal ? () => console.log('modal'):() => setIsOpen(true)}>
                    <Plus size={20}/>
                  </button>
                  </div>
                  <Button type='submit'>post</Button>
                </div>
                }
            </div>
        </form>
        <Modal isOpen={isOpen} className=' bg-white'>
            <TweetInput modal/>
        </Modal>
    </div>
  )
}
