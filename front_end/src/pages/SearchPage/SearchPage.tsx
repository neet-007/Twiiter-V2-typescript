import React, { ComponentProps } from 'react'

export const SearchPage:React.FC<ComponentProps<'section'>> = ({...props}) => {
  return (
    <section {...props}>SearchPage</section>
  )
}
