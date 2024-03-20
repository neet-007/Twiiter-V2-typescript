import React, { ComponentProps, useState } from 'react'
import { SectionSelector } from '../../components/Shared/SectionSelector/SectionSelector'
import { TweetInput } from '../../components/Shared/TweetInput/TweetInput'
import { Tweet, TweetCard } from '../../components/Shared/TweetCard/TweetCard'
import { UserIcon } from '../../components/Shared/UserIcon/UserIcon'
import { TweetPage } from '../../components/Mobile/TweetPage'
import { BottomBar } from '../../components/Mobile/BottomBar'
import { SideNav } from '../../components/Mobile/SideNav'
import { TopBar } from './TopBar'
import { useInfiniteTweets } from '../../lib/ReactQuery'

export const MainPage:React.FC<ComponentProps<'section'>> = ({...props}) => {
  //const {data, isLoading, isError, error} = useGetMainPageTweets()
  const {data, isLoading, isError, error, fetchNextPage, isFetchingNextPage} = useInfiniteTweets()
  const [section, setSection] = useState<string>('home')

  if(isLoading) return<h1>loading...</h1>
  if(isError){
    console.log(error)
    return <h1>error</h1>
  }
  console.log(data)
  return (
    <section {...props}>
      <TopBar/>
      <SectionSelector section={section} sectionClick={setSection} buttonsArray={['home', 'away']}/>
      <TweetInput/>
      {data?.pages.map(page => page.results.map((tweet:Tweet) => {
        return <TweetCard key={tweet.id} tweet={tweet}/>
      }))}
      <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>load more</button>
    </section>
  )
}
