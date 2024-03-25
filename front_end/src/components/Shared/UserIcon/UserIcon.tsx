import React, { ComponentProps } from 'react'
import { Button } from '../Button/Button'
import { UserInterface, useUserContext } from '../../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useFollowing } from '../../../lib/ReactQuery'

type AnyFunction<T = any> = (...args: any[]) => T | void;

interface Option {
  option:'list' | 'other'
  condition?:boolean
}

interface UserIconProps extends ComponentProps<'div'>{
    user:UserInterface
    option?:Option
    handleOption?:AnyFunction
}

export const UserIcon:React.FC<UserIconProps> = ({user, option, handleOption}) => {
  const {user:currentuser} = useUserContext()
  const {mutateAsync:follow} = useFollowing()
  const navigate = useNavigate()

  return (
    <div className='flex items-center'>
      <div className='flex items-center cursor-pointer gap-4 basis-[75%]' onClick={() => navigate(`/profile/${user.mention}`)}>
        <div className=' basis-[20%]'>{user.user_name}</div>
        <div className=' basis-[65%]'>
          <p>{user.user_name}</p>
          <p>@{user.mention}</p>
        </div>
      </div>
      {(user.id !== currentuser.id && !(option && option.option === 'list')) &&
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
      {(option && option.option === 'list') &&
        <Button type='button' className=' basis-[15%]' onClick={(e) => handleOption!(e, user.id, !option.condition)}>
          {option.condition ?
          'add'
          :
          'remove'
          }
        </Button>
      }
    </div>
  )
}
