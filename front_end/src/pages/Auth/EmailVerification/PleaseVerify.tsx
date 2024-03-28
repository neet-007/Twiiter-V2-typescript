import React, { ComponentProps, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../../context/UserContext'

export const PleaseVerify:React.FC<ComponentProps<'section'>> = () => {
  const {emailVerified} = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(emailVerified)
    if (emailVerified) navigate('/')
  },[emailVerified])

  return (
    <section>
        check your email for the verification link

        if you need a new token visit this link
        <Link to={'/auth/reverify'}>click here</Link>
    </section>
  )
}
