import React, { ComponentProps } from 'react'

interface UserIconProps extends ComponentProps<'div'>{
    user:string
}

export const UserIcon:React.FC<UserIconProps> = ({user}) => {
  return (
    <div>{user}</div>
  )
}
