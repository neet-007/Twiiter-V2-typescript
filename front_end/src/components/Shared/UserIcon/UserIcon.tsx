import React, { ComponentProps } from 'react'
import { Button } from '../Button/Button'
import { UserInterface, useUserContext } from '../../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useFollowing } from '../../../lib/ReactQuery'

interface UserIconProps extends ComponentProps<'div'>{
    user:UserInterface
}

export const UserIcon:React.FC<UserIconProps> = ({user}) => {
  const {user:currentuser} = useUserContext()
  const {mutateAsync:follow} = useFollowing()
  const navigate = useNavigate()
  return (
    <div className='flex items-center cursor-pointer' onClick={() => navigate(`/profile/${user.id}`)}>
      <div className=' basis-[20%]'>{user.user_name}</div>
      <div className=' basis-[65%]'>
        <p>{user.user_name}</p>
        <p>@{user.mention}</p>
      </div>
      {user.id !== currentuser.id &&
        <Button className=' basis-[15%]' onClick={() => follow({follower:user.id as number, unfollow:user.is_followed})}>
          {user.is_followed ?
            <p>unfollow</p>
          :
           <p>
            follow
           </p>
          }
          </Button>
      }
    </div>
  )
}
