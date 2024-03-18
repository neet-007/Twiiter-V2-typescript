import React, { ComponentProps, useEffect, useRef } from 'react'
import { useLogin, useRegister } from '../../../lib/ReactQuery'
import { Button } from '../../../components/Shared/Button/Button'
import { useUserContext } from '../../../context/UserContext'
import { useNavigate } from 'react-router-dom'
 
export const Register:React.FC<ComponentProps<'section'>> = () => {
    const navigate = useNavigate()
    const {isAuthenticated, checkUser} = useUserContext()
    const {mutateAsync:register} = useRegister()
    const {mutateAsync:login} = useLogin()
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const rePasswordRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(isAuthenticated) navigate('/')
    },[isAuthenticated])

    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        if (emailRef.current && passwordRef.current && rePasswordRef.current)
        register({email:emailRef.current?.value, password:passwordRef.current?.value, rePassword:passwordRef.current?.value})
        .then(res => {
            if('error' in res) return console.log(res.error)
            if(emailRef.current && passwordRef.current){
                login({email:emailRef.current.value, password:passwordRef.current.value})
                .then(res => {
                    if('error' in res) return console.log(res.error)
                    checkUser()
                    navigate('/auth/make-profile')
                })
            }
        })
    }
return (
    <section>
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col g-3'>
                <label htmlFor="email">email</label>
                <input type="email" name='email' ref={emailRef}/>
            </div>
            <div className='flex flex-col g-3'>
                <label htmlFor="passoword">password</label>
                <input type="password" name='password' ref={passwordRef}/>
            </div>
            <div className='flex flex-col g-3'>
                <label htmlFor="rePassword">re password</label>
                <input type="password" name='rePassword' ref={rePasswordRef}/>
            </div>
            <Button type='submit'>register</Button>
        </form>
    </section>
  )
}