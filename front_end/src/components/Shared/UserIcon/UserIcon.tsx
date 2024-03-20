import React, { ComponentProps } from 'react'
import { Button } from '../Button/Button'
import { UserInterface } from '../../../context/UserContext'

interface UserIconProps extends ComponentProps<'div'>{
    user:UserInterface
}

export const UserIcon:React.FC<UserIconProps> = ({user}) => {
  return (
    <div className='flex items-center cursor-pointer'>
      <div className=' basis-[20%]'>{user.user_name}</div>
      <div className=' basis-[65%]'>
        <p>{user.user_name}</p>
        <p>@{user.mention}</p>
      </div>
      <Button className=' basis-[15%]'>follow</Button>
    </div>
  )
}
