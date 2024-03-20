import React, { ComponentProps, useState } from 'react'
import { Tweet, TweetCard } from '../../components/Shared/TweetCard/TweetCard'
import { List } from '../ListPage/ListPage'
import { ListCard } from '../ListPage/ListCard'
import { useSearch } from '../../lib/ReactQuery'
import { SearchInput } from './SearchInput'
import { SectionSelector } from '../../components/Shared/SectionSelector/SectionSelector'
import { UserIcon } from '../../components/Shared/UserIcon/UserIcon'
import { UserInterface } from '../../context/UserContext'

export const SearchPage:React.FC<ComponentProps<'section'>> = ({...props}) => {
  const [q, setQ] = useState<string>('')
  const [f, setF] = useState<string>('live')
  const [page, setPage] = useState<number>(1)

  const {data, isLoading, isError, error, fetchNextPage, isFetchingNextPage} = useSearch({q, f, page})
  if(isError) console.log(error)

  return (
    <section {...props}>
      <SearchInput setQ={setQ}/>
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
