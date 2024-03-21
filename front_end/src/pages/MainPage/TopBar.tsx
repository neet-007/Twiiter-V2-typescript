import React, { ComponentProps } from 'react'
import { SectionSelector, SectionSelectorProps } from '../../components/Shared/SectionSelector/SectionSelector'
import { ProfileIcon } from '../../components/Shared/ProfileIcon/ProfileIcon'
import { Gear, TwitterX } from 'react-bootstrap-icons'

interface TopBarProps extends ComponentProps<'div'>, SectionSelectorProps{

}

export const TopBar:React.FC<TopBarProps> = ({section, sectionClick, buttonsArray, className}) => {
  return (
    <div className={`${className}`}>
        <div className='flex justify-between'>
            <ProfileIcon Width='w-[2rem]'/>
            <TwitterX/>
            <Gear/>
        </div>
        <SectionSelector section={section} sectionClick={sectionClick} buttonsArray={buttonsArray}/>
    </div>
  )
}
