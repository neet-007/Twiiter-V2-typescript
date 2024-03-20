import React, { ComponentProps, useState } from 'react'
import { Search } from 'react-bootstrap-icons'
import { useDebounce } from '../../hooks/useDebounce'

interface SearchInputProps extends ComponentProps<'form'>{
    setQ:React.Dispatch<React.SetStateAction<string>>
}

export const SearchInput:React.FC<SearchInputProps> = ({setQ}) => {
  const [value, setValue] = useState<string>('')
  const debounce = useDebounce(value)
  console.log(debounce)

  function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    setQ(value)
  }
  return (
    <form onSubmit={handleSubmit} className='flex items-center bg-slate-400 rounded-[0.75rem] p-2 gap-2'>
        <button>
            <Search/>
        </button>
        <input type="search" className='outline-none w-full rounded-[0.75rem] bg-slate-400 text-black' placeholder='search' onChange={e => setValue(e.target.value)} value={value}/>

    </form>
  )
}
