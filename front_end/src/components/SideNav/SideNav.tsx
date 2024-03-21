import React, { ComponentProps } from "react"
import { Button } from "../Shared/Button/Button"
import { UserIcon } from "../Shared/UserIcon/UserIcon"
import { useUserContext } from "../../context/UserContext"
import { Link } from "react-router-dom"
import { Bell, HouseDoor, JournalText, Person, Search, TwitterX } from "react-bootstrap-icons"

export const SideNav:React.FC<ComponentProps<'nav'>> = ({className, ...props}) => {
  const {user} = useUserContext()
  return (
    <nav className={`flex flex-col justify-between h-full ${className}`} {...props}>
        <ul className="list-none p-1 flex flex-col gap-3 capitalize">
            <li className="p-2">
              <Link to={'/'}>
                <TwitterX size={20}/>
              </Link>
            </li>
            <li>
              <Link to={'/'} className="p-2 flex gap-2 items-center">
                <HouseDoor size={20}/>
                <p>
                  home
                </p>
                </Link>
            </li>
            <li>
              <Link to={'/search'} className=" p-2 flex gap-2 items-center">
                <Search size={20}/>
                <p>
                  explore
                </p>
              </Link>
            </li>
            <li>
              <Link to={''} className=" p-2 flex gap-2 items-center">
                <Bell size={20}/>
                <p>
                  notification
                </p>
                </Link>
            </li>
            <li>
              <Link to={'/lists'} className=" p-2 flex gap-2 items-center">
                <JournalText size={20}/>
                <p>
                  lists
                </p>
              </Link>
            </li>
            <li>
              <Link to={`/profile/${user.id}`} className=" p-2 flex gap-2 items-center">
                <Person size={20}/>
                <p>
                  profile
                </p>
              </Link>
            </li>
            <Button>aa</Button>
        </ul>
        <UserIcon user={user}/>
    </nav>
  )
}
