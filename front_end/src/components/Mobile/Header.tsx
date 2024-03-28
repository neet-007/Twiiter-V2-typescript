import React, { ComponentProps } from 'react'
import { ProfileIcon } from '../Shared/ProfileIcon/ProfileIcon'
import { ArrowLeft, Gear, TwitterX } from 'react-bootstrap-icons'
import { useLocation, useNavigate } from 'react-router-dom'

interface HeaderProps extends ComponentProps<'header'>{
    setIsMobileNavOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header:React.FC<HeaderProps> = ({setIsMobileNavOpen, className}) => {
  const {pathname} = useLocation()
  const navigate = useNavigate()

  if (pathname === '/lists' || pathname === '/bookmarks' || pathname.includes('auth')) return null

  return (
    <div className={`${className} fixed top-0 z-10 w-full h-[2rem] md:hidden bg-white bg-opacity-75'`}>
        <div className='flex justify-between'>
            {pathname === '/'?
              <ProfileIcon Width='w-[2rem]' onClick={() => setIsMobileNavOpen(true)}/>
            :
              <ArrowLeft size={20} onClick={() => navigate(-1)}/>
            }
            <TwitterX size={20}/>
            <Gear size={20}/>
        </div>
    </div>
  )
}
