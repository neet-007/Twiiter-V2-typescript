import React, { ComponentProps, useEffect } from 'react'
import { useReVerify } from '../../../lib/ReactQuery'
import { useUserContext } from '../../../context/UserContext'
import { useNavigate } from 'react-router-dom'

export const Revirifaction:React.FC<ComponentProps<'section'>> = () => {
  const {emailVerified, hasProfile} = useUserContext()
  const {isLoading, isError, error} = useReVerify()
  const navigate = useNavigate()

  useEffect(() => {
    if(hasProfile) navigate('/')
    if(emailVerified) navigate('/auth/make-profile')
  },[emailVerified, hasProfile])

  return (
    <section>
        {isLoading ?
        <p>wait while we send you the email</p>
        :
        isError ?
        <p>error happend</p>
        :
        <p>check your email</p>
        }
    </section>
  )
}
