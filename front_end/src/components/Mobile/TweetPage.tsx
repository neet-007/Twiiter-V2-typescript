import React, { ComponentProps } from 'react'
import { TweetInput } from '../Shared/TweetInput/TweetInput'
import { Button } from '../Shared/Button/Button'

export const TweetPage:React.FC<ComponentProps<'section'>> = () => {

  return (
    <section>
        <div className='flex'>
            <div>back</div>
            <div className=' ml-auto flex'>
                <Button>draft</Button>
                <Button>post</Button>
            </div>
        </div>
        <TweetInput mobile/>
    </section>
  )
}
