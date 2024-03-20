import React, { ComponentProps } from 'react'
import { useParams } from 'react-router-dom'
import { useGetListTweets, useGetSingleList } from '../../lib/ReactQuery'
import { List } from './ListPage'
import { Tweet, TweetCard } from '../../components/Shared/TweetCard/TweetCard'

export const ListDetails:React.FC<ComponentProps<'section'>> = () => {
  const {listId} = useParams()
  const {data, isLoading, isError, error} = useGetSingleList({listId:Number(listId)})
  const {data:tweets, isLoading:tweetsIsLoading, isError:tweetsIsError, error:tweetsError} = useGetListTweets({listId:Number(listId)})

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
        {!(tweetsIsLoading || tweetsIsError)&&
        <div>
            {tweets?.pages[0].count === 0 ?
            <p>no tweets yet</p>
            :
            tweets?.pages.map(page => page.results.map((tweet:Tweet) => {
              return <TweetCard key={tweet.id} tweet={tweet}/>
            }))
            }
        </div>
        }
    </section>
  )
}
