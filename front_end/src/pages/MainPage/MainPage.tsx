import React, { ComponentProps } from 'react'

export const MainPage:React.FC<ComponentProps<'section'>> = ({...props}) => {
  return (
    <section {...props}>MainPage</section>
  )
}
