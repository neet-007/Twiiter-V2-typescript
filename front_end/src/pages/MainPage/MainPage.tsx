import React, { ComponentProps, useState } from 'react'
import { SectionSelector } from '../../components/Shared/SectionSelector/SectionSelector'
import { TweetInput } from '../../components/Shared/TweetInput/TweetInput'
import { TweetCard } from '../../components/Shared/TweetCard/TweetCard'
import { UserIcon } from '../../components/Shared/UserIcon/UserIcon'

export const MainPage:React.FC<ComponentProps<'section'>> = ({...props}) => {
  const [section, setSection] = useState<string>('home')
  console.log(section)
  return (
    <section {...props}>
      MainPage
      <SectionSelector section={section} sectionClick={setSection} buttonsArray={['home', 'away']}/>
      <TweetInput/>
    </section>
  )
}
