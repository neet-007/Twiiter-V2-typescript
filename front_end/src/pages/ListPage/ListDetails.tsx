import React, { ComponentProps } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSingleList } from '../../lib/ReactQuery'
import { List } from './ListPage'

export const ListDetails:React.FC<ComponentProps<'section'>> = () => {
  const {listId} = useParams()
  const {data, isLoading, isError, error} = useGetSingleList({listId:Number(listId)})

  if(isLoading) return <h1>Loading...</h1>
  if(isError) {
    console.log(error)
    return <h1>error</h1>
  }
  const list = data as List
  return (
    <section>
        <header>header</header>
        <div>
            {list.name}
            {list.description}
            <div>
                {list.followers_num}
                {list.members_num}
            </div>
            {list.list_creator.mention}
        </div>
        <div>
            tweet
            tweet
            tweet
            tweet
            tweet
            tweet
            tweet
        </div>
    </section>
  )
}
