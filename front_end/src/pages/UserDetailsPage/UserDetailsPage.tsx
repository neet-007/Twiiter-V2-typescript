import React, { ComponentProps, useEffect } from 'react'
import { Button } from '../../components/Shared/Button/Button'
import { SectionSelector } from '../../components/Shared/SectionSelector/SectionSelector'
import { TweetCard } from '../../components/Shared/TweetCard/TweetCard'
import {CSRF} from '../../components/Shared/CSRFToken/CSRFToken'
import { getCSFRToken } from '../../lib/Axios'

export const UserDetailsPage:React.FC<ComponentProps<'section'>> = ({...props}) => {
  useEffect(() => {
    getCSFRToken()
      
  },[])
  return (
    <section {...props}>
      <CSRF/>
      <div>
        <div>header</div>
        <div className='flex justify-between'>
          <div>img</div>
          <Button>follow</Button>
        </div>
        <div>
          <p>username</p>
          <p>mention</p>
        </div>
        <p>bio</p>
        <div className='flex gap-2'>
          <p>locaiotns</p>
          <p>jin date</p>
        </div>
        <div className='flex gap-2'>
          <p>followers</p>
          <p>following</p>
        </div>
      </div>
      <SectionSelector buttonsArray={['posts', 'replies', 'media', 'likes']} sectionClick={() => {}}/>
    </section>
  )
}
