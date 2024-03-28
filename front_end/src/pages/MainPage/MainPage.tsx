import React, { ComponentProps, useState } from 'react'
import { SectionSelector } from '../../components/Shared/SectionSelector/SectionSelector'
import { TweetInput } from '../../components/Shared/TweetInput/TweetInput'
import { useGetMainPageTweets } from '../../lib/ReactQuery'
import { InfiniteTweets } from '../../components/Shared/InfiniteTweets/InfiniteTweets'

export const MainPage:React.FC<ComponentProps<'section'>> = ({...props}) => {
  const [section, setSection] = useState<'for-you' | 'following'>('for-you')
  const {data, isLoading, isError, error, fetchNextPage, isFetchingNextPage} = useGetMainPageTweets(section)

  if(isError){
    console.log(error)
    return <h1>error</h1>
  }

  return (
    <section {...props}>
      {/*<TopBar section={section} sectionClick={setSection} buttonsArray={['for-you', 'following']} className=' sticky top-0 md:hidden bg-white bg-opacity-75'/>*/}
      <SectionSelector section={section} sectionClick={setSection} buttonsArray={['for-you', 'following']} className=' fixed w-full sm:w-[80%] lg:w-[50%] top-0 mt-[2rem] md:mt-0 md:flex bg-white bg-opacity-75'/>
      <TweetInput className=' mt-[5rem]'/>
      <InfiniteTweets data={data} isLoading={isLoading} isError={isError} error={error} fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage}/>
      <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>load more</button>
    </section>
  )
}
