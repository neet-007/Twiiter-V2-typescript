import React, { ComponentProps } from 'react'
import { Button } from '../Button/Button'

interface UserIconProps extends ComponentProps<'div'>{
    user:{userName:string, img:string, mention:string}
}

export const UserIcon:React.FC<UserIconProps> = ({user}) => {
  return (
    <div className='flex justify-between'>
      <div>{user.img}</div>
      <div>
        <p>{user.userName}</p>
        <p>@{user.mention}</p>
      </div>
      <Button>follow</Button>
    </div>
  )
}
