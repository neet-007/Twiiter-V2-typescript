import React, { ComponentProps } from "react"
import { Button } from "../Shared/Button/Button"
import { UserIcon } from "../Shared/UserIcon/UserIcon"

export const SideNav:React.FC<ComponentProps<'nav'>> = ({...props}) => {
  return (
    <nav className="flex flex-col justify-between h-full" {...props}>
        <ul className="list-none p-1 flex flex-col gap-3">
            <li>a</li>
            <li>da</li>
            <li>dads</li>
            <li>ad</li>
            <Button>aa</Button>
        </ul>
        <UserIcon user="user"/>
    </nav>
  )
}
