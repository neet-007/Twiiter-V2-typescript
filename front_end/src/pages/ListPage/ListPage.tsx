import React, { ComponentProps } from 'react'
import { PageHeader } from './PageHeader'
import { ListCard } from './ListCard'
import { UserInterface } from '../../context/UserContext'

export interface List {
  id:number
  name:string
  description:string
  followers_num:number
  members_num:number
  list_creator:UserInterface
}

export const ListPage:React.FC<ComponentProps<'section'>> = ({...props}) => {
  return (
    <section {...props}>
        <PageHeader/>
        <h2>your lists</h2>
        <ListCard/>
    </section>
  )
}
