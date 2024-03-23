import React, { ComponentProps, useMemo, useState } from 'react'
import { Modal } from '../Modal/Modal'
import { TweetInput } from './TweetInput'
import { ArrowLeft } from 'react-bootstrap-icons'

interface ThreadsTweetInputProps extends ComponentProps<'div'>{
    isOpen:boolean
    setIsOpen?:React.Dispatch<React.SetStateAction<boolean>>
}

export const ThreadsTweetInput:React.FC<ThreadsTweetInputProps> = ({isOpen, setIsOpen}) => {
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
    <>
        <Modal isOpen={isOpen} allClassName='hidden md:block' className='bg-white'>
            {numOfTweets.map((tweet, i) => {
                return <TweetInput key={tweet + i} modal canPostAll={canPostAll} numOfTweets={numOfTweets} tweetValue={tweet} handleChange={handleChange} numOfTweetIndex={i} setNumOfTweets={setNumOfTweets}/>
            })}
        </Modal>
        {isOpen &&
        <div className=' block md:hidden absolute inset-0 bg-white'>
            <div>
                <button type='button' onClick={() => setIsOpen!(false)}>
                    <ArrowLeft size={20}/>
                </button>
            </div>
            {numOfTweets.map((tweet, i) => {
                return <TweetInput key={tweet + i} modal canPostAll={canPostAll} numOfTweets={numOfTweets} tweetValue={tweet} handleChange={handleChange} numOfTweetIndex={i} setNumOfTweets={setNumOfTweets}/>
            })}
        </div>
        }
    </>
  )
}
