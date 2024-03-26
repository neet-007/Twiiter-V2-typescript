import React, { ComponentProps } from 'react'
import { ProfileIcon } from '../Shared/ProfileIcon/ProfileIcon'
import { Gear, TwitterX } from 'react-bootstrap-icons'

interface HeaderProps extends ComponentProps<'header'>{
    setIsMobileNavOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header:React.FC<HeaderProps> = ({setIsMobileNavOpen, className}) => {

  return (
    <div className={`${className} fixed top-0 z-10 w-full h-[2rem] md:hidden bg-white bg-opacity-75'`}>
        <div className='flex justify-between'>
            <ProfileIcon Width='w-[2rem]' onClick={() => setIsMobileNavOpen(true)}/>
            <TwitterX size={20}/>
            <Gear size={20}/>
        </div>
    </div>
  )
}
