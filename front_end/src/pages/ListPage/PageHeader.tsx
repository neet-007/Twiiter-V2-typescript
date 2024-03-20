import React, { ComponentProps } from 'react'
import { ArrowLeft, JournalText, ThreeDots } from 'react-bootstrap-icons'

export const PageHeader:React.FC<ComponentProps<'header'>> = () => {
  return (
    <header className=' flex justify-between w-full'>
            <ArrowLeft/>
            <input type="text" placeholder='search list'/>
        <div className='flex gap-4'>
            <JournalText/>
            <ThreeDots/>
        </div>
    </header>
  )
}
