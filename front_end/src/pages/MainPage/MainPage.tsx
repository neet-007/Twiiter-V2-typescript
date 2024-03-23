import React, { ComponentProps, useState } from 'react'
import { SectionSelector } from '../../components/Shared/SectionSelector/SectionSelector'
import { TweetInput } from '../../components/Shared/TweetInput/TweetInput'
import { Tweet, TweetCard } from '../../components/Shared/TweetCard/TweetCard'
import { TopBar } from './TopBar'
import { useGetMainPageTweets } from '../../lib/ReactQuery'

export const MainPage:React.FC<ComponentProps<'section'>> = ({...props}) => {
  //const {data, isLoading, isError, error} = useGetMainPageTweets()
  //const {data, isLoading, isError, error, fetchNextPage, isFetchingNextPage} = useInfiniteTweets()
  const [section, setSection] = useState<'for-you' | 'following'>('for-you')
  const {data, isLoading, isError, error, fetchNextPage, isFetchingNextPage} = useGetMainPageTweets(section)

  if(isLoading) return<h1>loading...</h1>
  if(isError){
    console.log(error)
    return <h1>error</h1>
  }
  console.log(data)
  return (
    <section {...props}>
      <TopBar section={section} sectionClick={setSection} buttonsArray={['for-you', 'following']} className=' sticky top-0 md:hidden bg-white bg-opacity-75'/>
      <SectionSelector section={section} sectionClick={setSection} buttonsArray={['for-you', 'following']} className=' sticky top-0 hidden md:flex bg-white bg-opacity-75'/>
      <TweetInput className=' mt-[5rem]'/>
      {data?.pages.map(page => page.results.map((tweet:Tweet) => {
        return <TweetCard key={tweet.id} tweet={tweet}/>
      }))}
      <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>load more</button>
    </section>
  )
}
