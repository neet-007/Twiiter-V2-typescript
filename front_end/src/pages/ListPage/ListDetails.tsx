import React, { ComponentProps, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFollowList, useGetListTweets, useGetSingleList } from '../../lib/ReactQuery'
import { List } from './ListPage'
import { Tweet, TweetCard } from '../../components/Shared/TweetCard/TweetCard'
import { Button } from '../../components/Shared/Button/Button'
import { useUserContext } from '../../context/UserContext'
import { Modal } from '../../components/Shared/Modal/Modal'

export const ListDetails:React.FC<ComponentProps<'section'>> = () => {
  const {user} = useUserContext()
  const {listId} = useParams()
  const {mutateAsync:followList} = useFollowList()
  const {data, isLoading, isError, error} = useGetSingleList({listId:Number(listId)})
  const {data:tweets, isLoading:tweetsIsLoading, isError:tweetsIsError, error:tweetsError} = useGetListTweets({listId:Number(listId)})

  const [isOpen, setIsOpen] = useState<boolean>(false)

  if(isLoading) return <h1>Loading...</h1>
  if(isError) {
    console.log(error)
    return <h1>error</h1>
  }
  const list = data as List

  return (
    <section>
        <header>header</header>
        <div className=' flex flex-col items-center'>
            <p>{list.name}</p>
            <p>{list.description}</p>
            <p>{list.list_creator.mention}</p>
            <div className='flex gap-2'>
              <div className=' flex gap-1'>
                <p>
                  members
                </p>
                <p>
                {list.members_num}
                </p>
              </div>
              <div className=' flex gap-2'>
                <p>
                  followers
                </p>
                <p>
                {list.followers_num}
                </p>
              </div>
            </div>
            {list.list_creator.id === user.id ?
            <Button onClick={() => setIsOpen(true)}>edit profile</Button>
            :
            <Button onClick={() => followList({listId:list.id, isFollowed:list.is_followed})}>
              {list.is_followed ?
                'unfollow'
              :
                'follow'
              }
            </Button>
            }
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
        <Modal isOpen={isOpen}>
          <p>111</p>
        </Modal>
    </section>
  )
}
