import React, { ComponentProps, useRef, useState } from 'react'
import { Button } from '../../../components/Shared/Button/Button'
import { useMakeProfile } from '../../../lib/ReactQuery'

export const MakeProfile:React.FC<ComponentProps<'section'>> = () => {
  const {mutateAsync:makeProfile} = useMakeProfile()
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const imgRef = useRef<HTMLInputElement>()
  const userNameRef = useRef<HTMLInputElement>()
  const bioRef = useRef<HTMLInputElement>()

  function handleSumbilt(){
    if (userNameRef.current && bioRef.current && imgRef.current)
    makeProfile({userName:userNameRef.current.value, mention:userNameRef.current.value, bio:bioRef.current?.value, img:imgRef.current?.value})
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
          <input type="text" />
        </div>
      </div>
      }
      {currentIndex === 2 &&
      <div>
        <div className='flex flex-col gap-4'>
          <label htmlFor="">write you bio</label>
          <input type="text" />
        </div>
      </div>
      }
      {currentIndex > 0 &&
        <Button onClick={() => setCurrentIndex(prev => prev - 1)}>prev</Button>
      }
      {currentIndex < 2 &&
        <Button onClick={() => setCurrentIndex(prev => prev + 1)}>next</Button>
      }
      {currentIndex === 2 &&
        <Button onClick={handleSumbilt}>finish</Button>
      }
    </section>
  )
}