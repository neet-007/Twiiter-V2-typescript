import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverBaseResult } from '@tanstack/react-query'
import React, { ComponentProps } from 'react'
import { TweetCardSkeleton } from '../TweetCard/TweetCardSkeleton'
import { Tweet, TweetCard } from '../TweetCard/TweetCard'

interface InfiniteTweetsProps extends ComponentProps<'div'>{
    data:InfiniteData<any, unknown> | undefined
    isLoading:boolean
    isError:boolean
    error:Error | null
    fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverBaseResult<InfiniteData<any, unknown>, Error>>
    isFetchingNextPage:boolean
}

export const InfiniteTweets:React.FC<InfiniteTweetsProps> = ({data, isLoading, isError, error, fetchNextPage, isFetchingNextPage}) => {
  return (
    <div className=' flex flex-col gap-4'>
        {isLoading ?
        Array(20).fill(0).map((_,index) => {
        return <TweetCardSkeleton key={'tweet-skeletion-main' + index}/>
        })
        :
        data?.pages.map(page => page.results.map((tweet:Tweet) => {
            return <TweetCard key={tweet.id} tweet={tweet}/>
        }))
        }
  </div>
  )
}
