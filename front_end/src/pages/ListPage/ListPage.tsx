import React, { ComponentProps } from 'react'
import { PageHeader } from './PageHeader'
import { ListCard } from './ListCard'
import { UserInterface } from '../../context/UserContext'
import { useGetUserLists } from '../../lib/ReactQuery'
import { ListCardSkeleton } from './ListCardSkeleton'

export interface List {
  id:number
  name:string
  description:string
  followers_num:number
  members_num:number
  is_followed:boolean
  list_creator:UserInterface
}

export const ListPage:React.FC<ComponentProps<'section'>> = ({...props}) => {
  const {data, isLoading, isError, error, fetchNextPage, isFetchingNextPage} = useGetUserLists()

  if (isError){
    console.log(error)
    return <h1>error</h1>
  }
  console.log(data)
  return (
    <section {...props}>
        <PageHeader/>
        <h2>your lists</h2>
        {isLoading ?
        Array(20).fill(0).map((_, index) => {
          return <ListCardSkeleton key={'list-page' + index}/>
        })
        :
        data?.pages.map(page => {
          if (page.results.length === 0) return <p>no lists</p>
          return page.results.map((list:List) => {
            return <ListCard key={list.id} list={list}/>
          })
        })
        }
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>load more</button>
    </section>
  )
}
