import React, { ComponentProps } from 'react'
import { List } from './ListPage'
import { useNavigate } from 'react-router-dom'

interface ListCardProps extends ComponentProps<'article'>{
    list:List
}

export const ListCard:React.FC<ListCardProps> = ({list}) => {
  const navigate = useNavigate()

  return (
    <article className='flex w-full bg-slate-500 cursor-pointer' onClick={() => navigate(`/list/${list.id}`)}>
        <div className='basis-[20%]'>img</div>
        <div className='basis-[70%]'>
            <div className='flex gap-4'>
                <p>{list.name}</p>
                <p>{list.members_num}</p>
            </div>
            <div>
                {list.followers_num}
            </div>
        </div>
        <div className='basis-[10%]'>
            option
        </div>
    </article>
  )
}
