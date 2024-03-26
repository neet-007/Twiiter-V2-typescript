import React, { ComponentProps, useState } from "react"
import { Button } from "../Shared/Button/Button"
import { UserIcon } from "../Shared/UserIcon/UserIcon"
import { useUserContext } from "../../context/UserContext"
import { Link } from "react-router-dom"
import { ArrowLeft, Bell, Bookmark, HouseDoor, JournalText, Person, Search, TwitterX } from "react-bootstrap-icons"
import { Modal } from "../Shared/Modal/Modal"
import { modalClick } from "../../utils/modalClick"
import { TweetInput } from "../Shared/TweetInput/TweetInput"

export const SideNav:React.FC<ComponentProps<'nav'>> = ({className, ...props}) => {
  const {user} = useUserContext()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <nav className={`flex flex-col justify-between h-full ${className}`} onClick={e => modalClick(e, setIsOpen)} {...props}>
        <ul className="list-none p-1 flex flex-col gap-3 capitalize">
            <li className="p-2">
              <Link to={'/'}>
                <TwitterX size={20}/>
              </Link>
            </li>
            <li>
              <Link to={'/'} className="p-2 flex gap-2 items-center">
                <HouseDoor size={20}/>
                <p className=" hidden md:block">
                  home
                </p>
                </Link>
            </li>
            <li>
              <Link to={'/search'} className=" p-2 flex gap-2 items-center">
                <Search size={20}/>
                <p className=" hidden md:block">
                  explore
                </p>
              </Link>
            </li>
            <li>
              <Link to={''} className=" p-2 flex gap-2 items-center">
                <Bell size={20}/>
                <p className=" hidden md:block">
                  notification
                </p>
                </Link>
            </li>
            <li>
              <Link to={'/lists'} className=" p-2 flex gap-2 items-center">
                <JournalText size={20}/>
                <p className=" hidden md:block">
                  lists
                </p>
              </Link>
            </li>
            <li>
              <Link to={`/profile/${user.mention}`} className=" p-2 flex gap-2 items-center">
                <Person size={20}/>
                <p className=" hidden md:block">
                  profile
                </p>
              </Link>
            </li>
            <li>
              <Link to={'/bookmarks'} className=" p-2 flex gap-2 items-center">
                <Bookmark size={20}/>
                <p className=" hidden md:block">
                  bookmark
                </p>
              </Link>
            </li>
            <Button className="p-0 px-0 py-0 rounded-full h-[3rem] w-[3rem] md:px-4 md:py-2 md:w-full md:h-fit"
            onClick={() => setIsOpen(true)}>
              post
            </Button>
        </ul>
        <Modal isOpen={isOpen} className="flex flex-col gap-4 bg-white ">
            <button onClick={() => setIsOpen(false)}>
              <ArrowLeft/>
            </button>
            <TweetInput/>
        </Modal>
        <UserIcon user={user}/>
    </nav>
  )
}
