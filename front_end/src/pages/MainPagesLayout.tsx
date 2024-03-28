import React, { ComponentProps, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'

export const MainPagesLayout:React.FC<ComponentProps<'section'>> = () => {
  const {hasProfile, isAuthenticated} = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    if(!hasProfile || !isAuthenticated) navigate('/auth/register')

  },[hasProfile, isAuthenticated])
  return (
    <Outlet/>
  )
}
