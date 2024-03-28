import React, { ComponentProps } from 'react'
import { SearchInput } from '../../pages/SearchPage/SearchInput'
import { UserIcon } from '../Shared/UserIcon/UserIcon'
import { UserInterface } from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { useSearchBar } from '../../lib/ReactQuery';
import { Skeleton } from '../Shared/Skeleton/Skeleton';
import { UserIconSkeleton } from '../Shared/UserIcon/UserIconSkeleton';

export const SearchBar:React.FC<ComponentProps<'div'>> = ({className}) => {
  const navigate = useNavigate()
  const {data, isLoading, isError, error} = useSearchBar()

  function handleSubmit(e?:React.FormEvent<HTMLFormElement>, debounce?:string){
    e?.preventDefault()
    if(debounce)
    navigate(`/search/?q=${debounce}`)
  }

  if(error) console.log(error)
  return (
    <div className={` ${className} capitalize flex flex-col gap-3`}>
        <SearchInput handleSubmit={handleSubmit}/>
        <h3 className=' font-bold text-2xl'>what's happening</h3>
        <ul>
          {isLoading ?
          <div>
            <Skeleton count={5}/>
          </div>
          :
          isError ?
          <p>error happend</p>
          :
          data.trends.map((trend:{id:number, name:string}) => {
            return<Link to={`/search/?q=${trend.name}&f=live&src=hashtag_click`} key={trend.name + trend.id} className='flex p-2 bg-slate-400 font-bold text-xl'>
                    <p>
                      #
                    </p>
                    <p>
                      {trend.name}
                    </p>
                  </Link>
          })
          }
        </ul>
        <h3 className=' font-bold text-2xl'>who to follow</h3>
        <div>
          {isLoading ?
            <UserIconSkeleton/>
          :
          isError ?
            <p>error happend</p>
          :data.users.map((user:UserInterface) => {
            return <UserIcon key={user.id} user={user}/>
          })
          }
        </div>
    </div>
  )
}
