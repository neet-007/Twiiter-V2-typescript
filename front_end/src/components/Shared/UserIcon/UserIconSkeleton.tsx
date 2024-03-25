import React, { ComponentProps } from 'react'
import { Skeleton } from '../Skeleton/Skeleton'

export const UserIconSkeleton:React.FC<ComponentProps<'div'>> = () => {
  return (
    <div className=' flex gap-2'>
        <Skeleton className=' basis-[15%] rounded-full'/>
        <div className=' basis-[70%] flex flex-col gap-1'>
            <Skeleton count={2}/>
        </div>
        <Skeleton className=' basis-[15%] rounded-full'/>
    </div>
  )
}
