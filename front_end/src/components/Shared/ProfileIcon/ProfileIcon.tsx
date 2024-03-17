import React, { ComponentProps } from 'react'

interface ProfileIconProps extends ComponentProps<'image'>{
    imgSrc?:string
    Width:string
}

export const ProfileIcon:React.FC<ProfileIconProps> = ({imgSrc, className, Width}) => {
  return (
    <img className={` rounded-full ${Width} ${className}`} src={`/src/assets/profile_img.jpg`} alt="" />
  )
}
