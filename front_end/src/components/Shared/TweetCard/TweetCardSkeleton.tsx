import React, { ComponentProps } from 'react'
import { Skeleton } from '../Skeleton/Skeleton'

export const TweetCardSkeleton:React.FC<ComponentProps<'div'>> = () => {
  return (
    <div className=' flex flex-col gap-2'>
        <div className='flex gap-2 w-[30%]'>
            <Skeleton count={3} />
        </div>
        <div className='flex flex-col gap-2'>
            <Skeleton count={2} className=' flex-1'/>
        </div>
        <Skeleton className=' p-10'/>
        <div className='flex gap-2 justify-between'>
            <Skeleton count={3}/>
        </div>
    </div>
  )
}
