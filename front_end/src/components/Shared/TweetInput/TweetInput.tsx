import React, { ComponentProps, useEffect, useRef, useState } from 'react'
import { Button } from '../Button/Button'

function adjustHeight(textarea?:HTMLTextAreaElement){
    if (textarea){
        textarea.style.height = '0px'
        textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

export const TweetInput:React.FC<ComponentProps<'div'>> = () => {
  const [value, setValue] = useState<string>('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current){
        adjustHeight(textareaRef.current)
    }
  },[value])
  return (
    <div className='flex'>
        <div className=' basis-[10%]'>img</div>
        <div className=' basis-[90%]'>
            <textarea name="" id="" className='w-full outline-none' style={{height:'0px'}}
             placeholder='What is happing ?!'
             value={value} onChange={(e) => setValue(e.target.value)}
             ref={textareaRef}/>
            <div className='flex align-middle justify-between'>
                <div className='flex gap-3'>
                    <span>a</span>
                    <span>b</span>
                    <span>c</span>
                    <span>d</span>
                </div>
                <Button>post</Button>
            </div>
        </div>
    </div>
  )
}
