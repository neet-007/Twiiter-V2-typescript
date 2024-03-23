import React, { ComponentProps, useEffect, useState } from 'react'
import { Tweet, TweetCard } from '../../components/Shared/TweetCard/TweetCard'
import { List } from '../ListPage/ListPage'
import { ListCard } from '../ListPage/ListCard'
import { useSearch } from '../../lib/ReactQuery'
import { SearchInput } from './SearchInput'
import { SectionSelector } from '../../components/Shared/SectionSelector/SectionSelector'
import { UserIcon } from '../../components/Shared/UserIcon/UserIcon'
import { UserInterface } from '../../context/UserContext'
import { useSearchParams } from 'react-router-dom'

export const SearchPage:React.FC<ComponentProps<'section'>> = ({...props}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const Q = searchParams.get('q') ? searchParams.get('q') as string : ''
  const F = searchParams.get('f') ? searchParams.get('f')! in ['live', 'users', 'lists'] ? searchParams.get('f') as 'live' | 'users' | 'lists' : 'live' : 'live'
  const [q, setQ] = useState<string>(Q)
  const [f, setF] = useState<'live' | 'users' | 'lists'>(F)
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    setSearchParams({q, f})
  },[q, f])

  const {data, isLoading, isError, error, fetchNextPage, isFetchingNextPage} = useSearch({q, f, page})
  if(isError) console.log(error)
  function handleSubmit(e?:React.FormEvent<HTMLFormElement>, debounce?:string){
        if(e && debounce){
            e.preventDefault()
            setQ(debounce)
        }
  }
  return (
    <section {...props}>
      <SearchInput handleSubmit={handleSubmit}/>
      <SectionSelector section={f} sectionClick={setF} buttonsArray={['live', 'users', 'lists']}/>
      {isError&&
        <p>error</p>
        }
        {isLoading || isFetchingNextPage&&
        <p>loading</p>
        }
        {data?.pages[0].count === 0&&
        <p>no results found</p>
        }
        <div>
            {data?.pages.map(page => {
                if ('tweets' in page.results){
                   return page.results.tweets.map((tweet:Tweet) => {
                        return <TweetCard key={tweet.id} tweet={tweet}/>
                    })
                }
                else if('users' in page.results){
                    return page.results.users.map((user:UserInterface) => {
                        return <UserIcon user={user}/>
                    })
                }
                else if('lists' in page.results){
                    return page.results.lists.map((list:List) => {
                        return <ListCard key={list.id} list={list}/>
                    })
                }
                else{
                    return <p>no results found</p>
                }
            })}
        </div>
    </section>
  )
}
