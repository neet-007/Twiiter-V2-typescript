import React, { ComponentProps } from 'react'
import { Bookmark, BoxArrowLeft, Gear, JournalText, Person, Plus } from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'

interface SideNavProps extends ComponentProps<'div'>{
    isOpen:boolean
}

export const SideNav:React.FC<SideNavProps> = ({isOpen}) => {
  const {user} = useUserContext()
  const navigate = useNavigate()
  if(!isOpen) return null
  return(
    <div>
        <div className=' fixed z-[10] inset-0 bg-[rgba(0,0,0,0.75)]' id='mobile-side-nav'>

        </div>
        <nav className=' bg-slate-400 p-2 fixed left-0 z-10 min-w-[50%] top-0 bottom-0 overflow-scroll'>
            <div className=' flex flex-col gap-3'>
                <div className=' flex items-center justify-between' onClick={() => navigate(`/profile/${user.mention}`)}>
                    <div>
                        img
                    </div>
                    <div>
                        <Plus/>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <Link to={`/profile/${user.mention}`}>{user.user_name}</Link>
                    <Link to={`/profile/${user.mention}`}>@{user.mention}</Link>
                </div>
                <div className=' flex gap-4'>
                    <p>{user.following}following</p>
                    <p>{user.followers}followers</p>
                </div>
            </div>
            <ul>
                <li>
                    <Link to={'/profile'} className=' flex items-center px-2 py-4 gap-2'>
                        <Person size={20}/>
                        <p>
                            profile
                        </p>
                    </Link>
                </li>
                <li>
                    <Link to={'/lists'} className=' flex items-center px-2 py-4 gap-2'>
                        <JournalText size={20}/>
                        <p>
                            list
                        </p>
                    </Link>
                </li>
                <li>
                    <Link to={'/bookmarks'} className=' flex items-center px-2 py-4 gap-2'>
                        <Bookmark size={20}/>
                        <p>
                            bookmarks
                        </p>
                    </Link>
                </li>
                <li>
                    <Link to={'/settings'} className=' flex items-center px-2 py-4 gap-2'>
                        <Gear size={20}/>
                        <p>
                            settings
                        </p>
                    </Link>
                </li>
                <li>
                    <div className=' flex items-center px-2 py-4 gap-2'>
                        <BoxArrowLeft size={20}/>
                        <p>
                            logout
                        </p>
                    </div>
                </li>
            </ul>
        </nav>
    </div>
  )
}
