import React, { ComponentProps } from 'react'

interface SkeletonProps extends ComponentProps<'div'>{
    count?:number
    round?:boolean
}

export const Skeleton:React.FC<SkeletonProps> = ({round, className, count=1}) => {
  return (
    <>
        {Array(count).fill(0).map((_, index) => {
            return <div key={'skeleton' + index} className={` bg-slate-400 p-2 flex-1 ${className ? className : ''} animate-pulse ${round ? ' rounded-full': ''}`}></div>
        })
        }
    </>
  )
}
