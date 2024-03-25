import React, { ComponentProps, useState } from 'react'
import { Button } from '../../components/Shared/Button/Button'
import { SectionSelector } from '../../components/Shared/SectionSelector/SectionSelector'
import { Tweet, TweetCard } from '../../components/Shared/TweetCard/TweetCard'
import { useFollowing, useGetUserProfile } from '../../lib/ReactQuery'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserInterface, useUserContext } from '../../context/UserContext'
import { ProfileIcon } from '../../components/Shared/ProfileIcon/ProfileIcon'
import { ArrowLeft } from 'react-bootstrap-icons'

export const UserDetailsPage:React.FC<ComponentProps<'section'>> = ({...props}) => {
  const {user:currentUser} = useUserContext()
  const {userMention} = useParams()
  const [page, setPage] = useState<number>(1)
  const [section, setSection] = useState<'posts' | 'replies' | 'media' | 'likes'>('posts')
  const {data, isLoading, isError, error} = useGetUserProfile({userMention:userMention, page})
  const {mutateAsync:following, isPending} = useFollowing()

  const navigate = useNavigate()

  if(isLoading) return <h1>loading...</h1>
  if(isError){
    console.error(error)
    return <h1>error</h1>
  }
  const user = data.success.user as UserInterface
  console.log(user)
  function handleFollow(){
    if (user.is_followed){
      return following({follower:user.id as number, unfollow:true})
    }
    return following({follower:user.id as number, unfollow:false})
  }
  return (
    <section {...props}>
      <div className=' flex gap-4 p-1 fixed top-0 bg-slate-50 w-full'>
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={20}/>
        </button>
        <div>
          <p>{user.user_name}</p>
          <p>1111posts</p>
        </div>
      </div>
      <div>
        <div className=' mt-[4rem]'>
          <img src="/src/assets/header.jfif" alt="" className=' max-h-[200px] w-full'/>
        </div>
        <div className='flex relative'>
          <ProfileIcon className=' absolute translate-y-[-50%] border-10 border-white max-w-[133px]'/>
          {currentUser.id !== user.id?
          <Button onClick={handleFollow} className=' ml-auto'>
            {user.is_followed ?
            'unfollow'
            :
            'follow'
            }
          </Button>
          :
          <Button className=' ml-auto'>
            edit profile
          </Button>
          }
        </div>
        <div className=' p-2'>
          <div className=' mt-[2rem]'>
            <p className=' font-bold text-2xl capitalize'>{user.user_name}</p>
            <p className=' text-gray-500 capitalize'>@{user.mention}</p>
          </div>
          <p className='mt-2'>{user.bio}</p>
          <div className='flex gap-2'>
            <p>locaiotns</p>
            <p>{data?.success.user.join_date}</p>
          </div>
          <div className='flex gap-2'>
            <Link to={''} className=' flex gap-1'>
              <p className=' font-bold'>
                {user.followers}
              </p>
              <p>
                followers
              </p>
            </Link>
            <Link to={''} className=' flex gap-1'>
              <p className=' font-bold'>
                {user.following}
              </p>
              <p>
                following
              </p>
            </Link>
          </div>
        </div>
      </div>
      <SectionSelector section={section} sectionClick={setSection} buttonsArray={['posts', 'replies', 'media', 'likes']}/>
      {data?.success.results.map((tweet:Tweet) => {
        return <TweetCard key={tweet.id} tweet={tweet}/>
      })}
    </section>
  )
}
