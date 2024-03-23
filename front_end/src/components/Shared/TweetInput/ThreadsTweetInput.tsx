import React, { ComponentProps, useEffect, useMemo, useState } from 'react'
import { Modal } from '../Modal/Modal'
import { TweetInput, TweetInputProps } from './TweetInput'

interface ThreadsTweetInputProps extends ComponentProps<'div'>{
    isOpen:boolean
}

export const ThreadsTweetInput:React.FC<ThreadsTweetInputProps> = ({isOpen}) => {
    const [numOfTweets, setNumOfTweets] = useState<string[]>([''])
    function handleChange(e:React.ChangeEvent<HTMLTextAreaElement>, index:number){
        setNumOfTweets(prev => prev.map((x, i) => i === index ? e.target.value : x))
    }
    const canPostAll = useMemo(() => {
        return numOfTweets.reduce((acc, curr) => {
            return curr.length > 0
        },false)
    },[numOfTweets])

    return (
    <Modal isOpen={isOpen} className=' bg-white'>
        {numOfTweets.map((Tweet, i) => {
            return <TweetInput modal canPostAll={canPostAll} numOfTweets={numOfTweets} tweetValue={Tweet} handleChange={handleChange} numOfTweetIndex={i} setNumOfTweets={setNumOfTweets}/>
        })}
    </Modal>
  )
}
