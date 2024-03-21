import React, { ComponentProps } from 'react'
import { SearchInput } from '../../pages/SearchPage/SearchInput'

export const SearchBar:React.FC<ComponentProps<'div'>> = ({className}) => {
  return (
    <div className={`bg-slate-500 ${className}`}>
        <SearchInput/>
        <div>
            treanding
        </div>
        <div>
            who to follow
        </div>
    </div>
  )
}
