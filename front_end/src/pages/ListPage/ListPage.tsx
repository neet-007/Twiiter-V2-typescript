import React, { ComponentProps } from 'react'

export const ListPage:React.FC<ComponentProps<'section'>> = ({...props}) => {
  return (
    <section {...props}>
        ListPage
    </section>
  )
}
