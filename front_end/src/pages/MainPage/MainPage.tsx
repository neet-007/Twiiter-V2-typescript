import React, { ComponentProps, useState } from 'react'
import { SectionSelector } from '../../components/Shared/SectionSelector/SectionSelector'
import { TweetInput } from '../../components/Shared/TweetInput/TweetInput'
import { TopBar } from './TopBar'
import { useGetMainPageTweets } from '../../lib/ReactQuery'
import { InfiniteTweets } from '../../components/Shared/InfiniteTweets/InfiniteTweets'
import { UserIconSkeleton } from '../../components/Shared/UserIcon/UserIconSkeleton'

export const MainPage:React.FC<ComponentProps<'section'>> = ({...props}) => {
  //const {data, isLoading, isError, error} = useGetMainPageTweets()
  //const {data, isLoading, isError, error, fetchNextPage, isFetchingNextPage} = useInfiniteTweets()
  const [section, setSection] = useState<'for-you' | 'following'>('for-you')
  const {data, isLoading, isError, error, fetchNextPage, isFetchingNextPage} = useGetMainPageTweets(section)

  if(isError){
    console.log(error)
    return <h1>error</h1>
  }

  return (
    <section {...props}>
      <TopBar section={section} sectionClick={setSection} buttonsArray={['for-you', 'following']} className=' sticky top-0 md:hidden bg-white bg-opacity-75'/>
      <SectionSelector section={section} sectionClick={setSection} buttonsArray={['for-you', 'following']} className=' sticky top-0 hidden md:flex bg-white bg-opacity-75'/>
      <TweetInput className=' mt-[5rem]'/>
      <UserIconSkeleton/>
      <InfiniteTweets data={data} isLoading={isLoading} isError={isError} error={error} fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage}/>
      <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>load more</button>
    </section>
  )
}
