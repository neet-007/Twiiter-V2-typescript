import React, { ComponentProps, useEffect, useState } from 'react'
import { Button } from '../../components/Shared/Button/Button'
import { SectionSelector } from '../../components/Shared/SectionSelector/SectionSelector'
import { useFollowing, useGetUserProfile } from '../../lib/ReactQuery'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserInterface, useUserContext } from '../../context/UserContext'
import { ProfileIcon } from '../../components/Shared/ProfileIcon/ProfileIcon'
import { ArrowLeft } from 'react-bootstrap-icons'
import { InfiniteTweets } from '../../components/Shared/InfiniteTweets/InfiniteTweets'
import { Skeleton } from '../../components/Shared/Skeleton/Skeleton'

interface UserHeaderProps extends ComponentProps<'div'> {
  user:UserInterface
  currentUser:UserInterface
  isFollowed:boolean
  handleFollow:() => void
  navigate:(a:number) => void
}

const UserHeader:React.FC<UserHeaderProps> = ({user, currentUser, isFollowed, handleFollow, navigate}) => {
  return(
    <div>
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
          {isFollowed ?
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
          <p>date</p>
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
  </div>
  )
}

const UserHeaderSkeleton:React.FC<ComponentProps<'div'>> = () => {
  return(
    <div>
    <div className=' flex gap-4 p-1 fixed top-0 bg-slate-50 w-full'>
        <Skeleton count={2}/>
      <div>
        <Skeleton count={2}/>
      </div>
    </div>
    <div>
      <div className=' mt-[4rem]'>
        <Skeleton className=' h-[200px] w-full'/>
      </div>
      <div className='flex relative'>
        <Skeleton className=' absolute translate-y-[-50%] border-10 border-white w-[133px] h-[133px] rounded-full'/>
        <Skeleton className=' ml-auto'/>
      </div>
      <div className=' p-2'>
        <div className=' mt-[2rem]'>
            <Skeleton count={2}/>
        </div>
        <Skeleton/>
        <div className='flex gap-2'>
          <Skeleton count={2}/>
        </div>
        <div className='flex gap-2'>
          <Skeleton count={2}/>
        </div>
      </div>
    </div>
  </div>
  )
}

export const UserDetailsPage:React.FC<ComponentProps<'section'>> = ({...props}) => {
  const {user:currentUser} = useUserContext()
  const {userMention} = useParams()
  const [section, setSection] = useState<'posts' | 'replies' | 'media' | 'likes'>('posts')
  const {data, isLoading, isError, error, fetchNextPage, isFetchingNextPage} = useGetUserProfile({userMention:userMention, f:section})
  const {mutateAsync:following, isPending, isError:isFollowError} = useFollowing()
  const [isFollowed, setIsFollowed] = useState<boolean>(data?.pages[0].user.is_followed)

  const navigate = useNavigate()

  useEffect(() => {
    if(isFollowError) setIsFollowed(prev => !prev)
  },[isFollowError])


  const user = data?.pages[0].user as UserInterface

  function handleFollow(){
    if(isPending)
    return

    if (isFollowed){
      setIsFollowed(false)
      return following({follower:user.id as number, unfollow:true})
    }

    setIsFollowed(true)
    return following({follower:user.id as number, unfollow:false})
  }
  return (
    <section {...props}>
      {!isLoading?
        <UserHeader user={user} currentUser={currentUser} isFollowed={isFollowed} handleFollow={handleFollow} navigate={navigate}/>
      :
        <UserHeaderSkeleton/>
      }
      <SectionSelector section={section} sectionClick={setSection} buttonsArray={['posts', 'replies', 'media', 'likes']}/>
      <InfiniteTweets data={data} isLoading={isLoading} isError={isError} error={error} fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage}/>
    </section>
  )
}
