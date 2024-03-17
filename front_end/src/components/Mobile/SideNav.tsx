import React, { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

export const SideNav:React.FC<ComponentProps<'nav'>> = () => {
  return (
    <nav>
        <ul>
            <li>
                <Link to={'/profile'}>profile</Link>
            </li>
            <li>
                <Link to={'/lists'}>list</Link>
            </li>
            <li>
                <Link to={'/bookmarks'}>bookmarks</Link>
            </li>
            <li>
                <Link to={'/settings'}>settings</Link>
            </li>
            <li>
                logout
            </li>
        </ul>
    </nav>
  )
}
