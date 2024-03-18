import React, { ComponentProps, useEffect, useRef, useState } from 'react'
import { Button } from '../../../components/Shared/Button/Button'
import { useMakeProfile } from '../../../lib/ReactQuery'
import { useUserContext } from '../../../context/UserContext'
import { redirect, useNavigate } from 'react-router-dom'

export const MakeProfile:React.FC<ComponentProps<'section'>> = () => {
  const {isLoading, hasProfile, checkUser, isAuthenticated} = useUserContext()
  const navigate = useNavigate()
  const {mutateAsync:makeProfile} = useMakeProfile()
  const [profileState, setProfileState] = useState<{userName:string, bio:string, mention:string}>({userName:'', mention:'', bio:''})
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const imgRef = useRef<HTMLInputElement>(null)
  const userNameRef = useRef<HTMLInputElement>(null)
  const mentionRef = useRef<HTMLInputElement>(null)
  const bioRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
   if(!isAuthenticated && !isLoading) navigate('/auth/login')
   if(hasProfile && !isLoading) navigate('/')
  },[isAuthenticated, isLoading, hasProfile])

  function handleSumbilt(){
    if (bioRef.current)
    makeProfile({userName:profileState.userName, mention:profileState.mention, bio:bioRef.current.value, img:''})
    .then(res => {
      checkUser()
    })
  }

  function next(){
    setCurrentIndex(prev => prev + 1)
    if (currentIndex === 1 && userNameRef.current && mentionRef.current) return setProfileState(prev => ({...prev, userName:userNameRef.current!.value, mention:mentionRef.current!.value}) )
  }

  return (
    <section>
      {currentIndex === 0 &&
      <div>
        <div className='flex flex-col gap-4'>
          <label htmlFor="">pick you image</label>
          <input type="text" />
        </div>
      </div>
      }
      {currentIndex === 1 &&
      <div>
        <div className='flex flex-col gap-4'>
          <label htmlFor="">choose your username</label>
          <input type="text" ref={userNameRef}/>
          <label htmlFor="">choose your mention</label>
          <input type="text" ref={mentionRef}/>
        </div>
      </div>
      }
      {currentIndex === 2 &&
      <div>
        <div className='flex flex-col gap-4'>
          <label htmlFor="">write you bio</label>
          <input type="text" ref={bioRef}/>
        </div>
      </div>
      }
      {currentIndex > 0 &&
        <Button onClick={() => setCurrentIndex(prev => prev - 1)}>prev</Button>
      }
      {currentIndex < 2 &&
        <Button onClick={next}>next</Button>
      }
      {currentIndex === 2 &&
        <Button onClick={handleSumbilt}>finish</Button>
      }
    </section>
  )
}