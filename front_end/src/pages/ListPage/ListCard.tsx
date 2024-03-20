import React, { ComponentProps } from 'react'
import { List } from './ListPage'

interface ListCardProps extends ComponentProps<'article'>{
    list:List
}

export const ListCard:React.FC<ListCardProps> = () => {
  return (
    <article className='flex w-full bg-slate-500'>
        <div className='basis-[20%]'>img</div>
        <div className='basis-[70%]'>
            <div className='flex gap-4'>
                <p>title</p>
                <p>members</p>
            </div>
            <div>
                members icons
            </div>
        </div>
        <div className='basis-[10%]'>
            option
        </div>
    </article>
  )
}
