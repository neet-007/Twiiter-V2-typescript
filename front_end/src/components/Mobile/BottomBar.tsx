import React, { ComponentProps } from 'react'
import { Bell, BellFill, Envelope, EnvelopeFill, HouseDoor, HouseDoorFill, Search } from 'react-bootstrap-icons'
import { Link, useLocation } from 'react-router-dom'

export const BottomBar:React.FC<ComponentProps<'div'>> = ({className}) => {
  const {pathname} = useLocation()

  return (
    <div className={`flex justify-between fixed bottom-0 left-0 right-0 bg-white ${className}`}>
        <Link to={'/'} className=' py-2 px-4 flex items-center justify-center'>
          {pathname === '/' ?
            <HouseDoorFill size={30}/>
          :
            <HouseDoor size={30}/>
          }
        </Link>
        <Link to={'/search'} className=' py-2 px-4 flex items-center justify-center'>
          {pathname === '/search' ?
            <Search size={30} fontWeight={20}/>
          :
            <Search size={30}/>
          }
        </Link>
        <Link to={'/notification'} className=' py-2 px-4 flex items-center justify-center'>
          {pathname === '/notification' ?
            <BellFill size={30}/>
          :
            <Bell size={30}/>
          }
        </Link>
        <Link to={'/not'} className=' py-2 px-4 flex items-center justify-center'>
          {pathname === '/not' ?
            <EnvelopeFill size={30}/>
          :
            <Envelope size={30}/>
          }
        </Link>
    </div>
  )
}
