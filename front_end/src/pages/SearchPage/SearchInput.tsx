import React, { ComponentProps, useState } from 'react'
import { Search } from 'react-bootstrap-icons'
import { useDebounce } from '../../hooks/useDebounce'
import {UserInterface} from '../../context/UserContext'
import { UserIcon } from '../../components/Shared/UserIcon/UserIcon'
import { useSearch } from '../../lib/ReactQuery'

interface SearchMenuProps extends ComponentProps<'div'>{
  users:UserInterface[]
  isLoading:boolean
  isError:boolean
  error:Error | null
}

export const SearchMenu:React.FC<SearchMenuProps> = ({users, isLoading, isError, error}) => {
  return (
    <div className=' absolute top-full bg-slate-50 w-full'>
      {isLoading ?
      <p>loading</p>
      :
      isError ?
      <p>error happend</p>
      :
      <ul>
        {users.map(user => {
          return <UserIcon user={user}/>
        })}
      </ul>
      }
    </div>
  )
}

interface SearchInputProps extends ComponentProps<'form'>{
    handleSubmit:(e?:React.FormEvent<HTMLFormElement>, debounce?:string) => void
}

export const SearchInput:React.FC<SearchInputProps> = ({handleSubmit}) => {
  const [value, setValue] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const debounce = useDebounce(value)
  const {data, isLoading, isError, error} = useSearch({q:debounce, f:'users', page:1})


  return (
    <form onSubmit={(e) => handleSubmit(e, debounce)} className='flex items-center bg-slate-400 rounded-[0.75rem] p-2 gap-2 relative'>
        <button type='submit'>
            <Search/>
        </button>
        <input type="search" className='outline-none w-full rounded-[0.75rem] bg-slate-400 text-black' placeholder='search' onChange={e => setValue(e.target.value)} value={value} onFocus={() => setIsOpen(true)} onBlur={() => setIsOpen(false)}/>
        {isOpen &&
          <SearchMenu users={data?.pages[0].results.users} isLoading={isLoading} isError={isError} error={error}/>
        }
    </form>
  )
}
