import React, { ComponentProps, useRef } from 'react'
import { useLogin } from '../../../lib/ReactQuery'
import { Button } from '../../../components/Shared/Button/Button'
import { useNavigate } from 'react-router-dom'
import { CSRF } from '../../../components/Shared/CSRFToken/CSRFToken'

export const Login:React.FC<ComponentProps<'section'>> = () => {
   const {mutateAsync:login} = useLogin()
   const emailRef = useRef<HTMLInputElement>(null)
   const passwordRef = useRef<HTMLInputElement>(null)

   const navigate = useNavigate()

   function handleSubmit(){
       if (emailRef.current && passwordRef.current)
       login({email:emailRef.current?.value, password:passwordRef.current?.value})
   }
   return (
    <section>
        <CSRF/>
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col g-3'>
                <label htmlFor="email">email</label>
                <input type="email" name='email' ref={emailRef}/>
            </div>
            <div className='flex flex-col g-3'>
                <label htmlFor="passoword">password</label>
                <input type="password" name='password' ref={passwordRef}/>
            </div>
            <Button type='submit'>login</Button>
        </form>
    </section>
  )
}