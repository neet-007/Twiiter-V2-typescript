import React, { ComponentProps } from 'react'

export const UserDetailsPage:React.FC<ComponentProps<'section'>> = ({...props}) => {
  return (
    <section {...props}>UserDetailsPage</section>
  )
}
