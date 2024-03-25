import React, { ComponentProps } from 'react'
import { Skeleton } from '../../components/Shared/Skeleton/Skeleton'
export const ListCardSkeleton:React.FC<ComponentProps<'div'>> = () => {
  return (
    <div className=' flex'>
        <Skeleton className=' basis-[15%] rounded-full'/>
        <div className=' flex flex-col gap-2 basis-[70%]'>
            <Skeleton/>
            <Skeleton/>
        </div>
        <Skeleton className=' basis-[15%] rounded-full'/>
    </div>
  )
}
