import React, { ComponentProps, useState } from 'react'
import { Button } from '../../components/Shared/Button/Button'
import { SectionSelector } from '../../components/Shared/SectionSelector/SectionSelector'
import { Tweet, TweetCard } from '../../components/Shared/TweetCard/TweetCard'
import { useGetUserProfile } from '../../lib/ReactQuery'
import { useParams } from 'react-router-dom'

export const UserDetailsPage:React.FC<ComponentProps<'section'>> = ({...props}) => {
  const {userId} = useParams()
  const [page, setPage] = useState<number>(1)
  const {data, isLoading, isError, error} = useGetUserProfile({userId:Number(userId), page})

  if(isLoading) return <h1>loading...</h1>
  if(isError){
    console.error(error)
    return <h1>error</h1>
  }
  return (
    <section {...props}>
      <div>
        <div>header</div>
        <div className='flex justify-between'>
          <div>img</div>
          <Button>follow</Button>
        </div>
        <div>
          <p>{data?.success.user.user_name}</p>
          <p>{data?.success.user.mention}</p>
        </div>
        <p>{data?.success.user.bio}</p>
        <div className='flex gap-2'>
          <p>locaiotns</p>
          <p>{data?.success.user.join_date}</p>
        </div>
        <div className='flex gap-2'>
          <p>followers:{data?.success.user.followers}</p>
          <p>following:{data?.success.user.following}</p>
        </div>
      </div>
      <SectionSelector buttonsArray={['posts', 'replies', 'media', 'likes']} sectionClick={() => {}}/>
      {data?.success.results.map((tweet:Tweet) => {
        return <TweetCard key={tweet.id} tweet={tweet}/>
      })}
    </section>
  )
}
