import React, { ComponentProps, useRef } from 'react'
import { useRegister } from '../../../lib/ReactQuery'
import { Button } from '../../../components/Shared/Button/Button'

export const Register:React.FC<ComponentProps<'section'>> = () => {
   const {mutateAsync:register} = useRegister()
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const rePasswordRef = useRef<HTMLInputElement>(null)
    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        if (emailRef.current && passwordRef.current && rePasswordRef.current)
        register({email:emailRef.current?.value, password:passwordRef.current?.value, rePassword:passwordRef.current?.value})
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