import React, { ComponentProps } from 'react'

interface ProfileIconProps extends ComponentProps<'img'>{
    imgSrc?:string
    Width?:string
}

export const ProfileIcon:React.FC<ProfileIconProps> = ({imgSrc, className, Width, ...props}) => {
  return (
    <img className={` rounded-full ${Width} ${className}`} src={`/src/assets/profile_img.jpg`} alt="" {...props}/>
  )
}
