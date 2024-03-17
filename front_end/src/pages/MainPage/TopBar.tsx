import React, { ComponentProps } from 'react'
import { SectionSelector } from '../../components/Shared/SectionSelector/SectionSelector'
import { ProfileIcon } from '../../components/Shared/ProfileIcon/ProfileIcon'
import { Gear, TwitterX } from 'react-bootstrap-icons'

export const TopBar:React.FC<ComponentProps<'div'>> = () => {
  return (
    <div>
        <div className='flex justify-between'>
            <ProfileIcon Width='w-[2rem]'/>
            <TwitterX/>
            <Gear/>
        </div>
        <SectionSelector sectionClick={() => {}} buttonsArray={['for you', 'following']}/>
    </div>
  )
}
