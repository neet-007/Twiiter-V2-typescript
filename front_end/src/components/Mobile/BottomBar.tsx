import React, { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

export const BottomBar:React.FC<ComponentProps<'div'>> = () => {
  return (
    <div className='flex justify-between fixed bottom-0 left-0 right-0'>
        <Link to={'/'} className=' py-2 px-4 bg-slate-600 flex items-center justify-center'>home</Link>
        <Link to={'/search'} className=' py-2 px-4 bg-slate-600 flex items-center justify-center'>search</Link>
        <Link to={'/notification'} className=' py-2 px-4 bg-slate-600 flex items-center justify-center'>notification</Link>
        <Link to={'/not'} className=' py-2 px-4 bg-slate-600 flex items-center justify-center'>mesage</Link>
    </div>
  )
}
