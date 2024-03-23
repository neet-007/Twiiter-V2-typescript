import React, { ComponentProps } from 'react'
import { SearchInput } from '../../pages/SearchPage/SearchInput'
import { UserIcon } from '../Shared/UserIcon/UserIcon'
import { UserInterface } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const user1: UserInterface = {
  id: 9,
  user_name: "john_doe",
  mention: "john_doe",
  bio: "Software engineer passionate about AI and machine learning.",
  following: 150,
  followers: 1000,
  is_verified: true,
  is_followed: false
};

const user2: UserInterface = {
  id: 2,
  user_name: "jane_smith",
  mention: "jane_smith",
  bio: "Coffee lover ☕ | Travel enthusiast ✈️ | Bookworm 📚",
  following: 300,
  followers: 500,
  is_verified: false,
  is_followed: true
};

const user3: UserInterface = {
  id: 3,
  user_name: "alex_jones",
  mention: "alex_jones",
  bio: "Photographer capturing moments around the world.",
  following: 200,
  followers: 700,
  is_verified: true,
  is_followed: true
};

export const SearchBar:React.FC<ComponentProps<'div'>> = ({className}) => {
  const navigate = useNavigate()

  function handleSubmit(e?:React.FormEvent<HTMLFormElement>, debounce?:string){
    e?.preventDefault()
    if(debounce)
    navigate(`/search/?q=${debounce}`)
  }
  const trends = ['tedt', 'tetedsd', 'dsadsadadad', 'dsd']
  return (
    <div className={` ${className} capitalize flex flex-col gap-3`}>
        <SearchInput handleSubmit={handleSubmit}/>
        <h3 className=' font-bold text-2xl'>what's happening</h3>
        <ul>
          {trends.map((trend, index) => {
            return<li key={trend + index} className='flex p-2 bg-slate-400 font-bold text-xl'>
                    <p>
                      #
                    </p>
                    <p>
                      {trend}
                    </p>
                  </li>
          })
          }
        </ul>
        <h3 className=' font-bold text-2xl'>who to follow</h3>
        <div>
            <UserIcon user={user1}/>
            <UserIcon user={user2}/>
            <UserIcon user={user3}/>
        </div>
    </div>
  )
}
