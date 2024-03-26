import React, { ComponentProps } from 'react'
import { ArrowLeft } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import { useGetUserBookmarks } from '../../lib/ReactQuery'
import { InfiniteTweets } from '../../components/Shared/InfiniteTweets/InfiniteTweets'

export const BookmarkPage:React.FC<ComponentProps<'div'>> = () => {
  const {user} = useUserContext()
  const {data, isLoading, isError, error, fetchNextPage, isFetchingNextPage} = useGetUserBookmarks({userMention:user.mention})
  const navigate = useNavigate()
  return (
    <section>
        <div className=' flex items-center w-full gap-10 p-2'>
            <ArrowLeft onClick={() => navigate(-1)}/>
            <div>
                <p>Bookmakrs</p>
                <p>@{user.mention}</p>
            </div>
        </div>
        <InfiniteTweets data={data} isLoading={isLoading} isError={isError} error={error} fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage}/>
    </section>
  )
}
