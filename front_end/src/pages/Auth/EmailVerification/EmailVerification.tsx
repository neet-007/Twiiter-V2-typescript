import React, { ComponentProps, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCheckToken } from '../../../lib/ReactQuery'
import { useUserContext } from '../../../context/UserContext'

export const EmailVerification:React.FC<ComponentProps<'section'>> = () => {
  const {hasProfile, emailVerified} = useUserContext()
  const {tokenId} = useParams()
  const {mutateAsync, isPending, isSuccess, isError, error} = useCheckToken()
  const navigate = useNavigate()

  useEffect(() => {
    mutateAsync({token:tokenId!})
  },[])

  useEffect(() => {
    if (hasProfile) navigate('/')
    if (isSuccess || emailVerified) navigate('/auth/make-profile')
  },[hasProfile, emailVerified, isSuccess])

  return (
    <section>
        {isPending ?
        <p>wait why we verify your email</p>
        :
        isError ?
        <>
          <p>error happend click the link below</p>
          <Link to='/auth/reverify'>click here</Link>
        </>
        :
        <p>your account is verified now</p>
        }
    </section>
  )
}
