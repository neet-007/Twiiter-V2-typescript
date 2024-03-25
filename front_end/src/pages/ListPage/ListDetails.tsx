import React, { ComponentProps, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFollowList, useGetListMembers, useGetListTweets, useGetSingleList, useMemberList, useSearch } from '../../lib/ReactQuery'
import { List } from './ListPage'
import { Button } from '../../components/Shared/Button/Button'
import { UserInterface, useUserContext } from '../../context/UserContext'
import { Modal } from '../../components/Shared/Modal/Modal'
import { ArrowLeft, Search } from 'react-bootstrap-icons'
import { SectionSelector } from '../../components/Shared/SectionSelector/SectionSelector'
import { UserIcon } from '../../components/Shared/UserIcon/UserIcon'
import { useDebounce } from '../../hooks/useDebounce'
import { InfiniteTweets } from '../../components/Shared/InfiniteTweets/InfiniteTweets'
import { UserIconSkeleton } from '../../components/Shared/UserIcon/UserIconSkeleton'

interface SearchInputProps extends ComponentProps<'form'>{
    value:string,
    setValue:React.Dispatch<React.SetStateAction<string>>
    handleSubmit:(e?:React.FormEvent<HTMLFormElement>, debounce?:string) => void
}

const SearchInput:React.FC<SearchInputProps> = ({value, setValue, handleSubmit}) => {
  const debounce = useDebounce(value)

  return (
    <form onSubmit={(e) => handleSubmit(e, debounce)} className='flex items-center bg-slate-400 rounded-[0.75rem] p-2 gap-2 relative'>
        <button type='submit'>
            <Search/>
        </button>
        <input type="search" className='outline-none w-full rounded-[0.75rem] bg-slate-400 text-black' placeholder='search' onChange={e => setValue(e.target.value)} value={value}/>
    </form>
  )
}

interface ListEditMembersProps extends ComponentProps<'div'>{
  listId:number
  setEditPage:React.Dispatch<React.SetStateAction<0 | 1>>
}

export const ListEditMembers:React.FC<ListEditMembersProps> = ({listId, setEditPage}) => {
  const [section, setSection] = useState<'members' | 'suggested'>('members')
  const [value, setValue] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const {data, isLoading, isError, error, fetchNextPage, isFetchingNextPage} = useGetListMembers({listId})
  const {data:searchData, isLoading:searchIsLoading, isError:searchIsError, error:searchError, fetchNextPage:searchFetchNextPage, isFetchingNextPage:searchIsFetchingNextPage} = useSearch({q:value, f:'users', page, src:'typed_query'})
  const {mutateAsync:memberList, isPending} = useMemberList()

  if(isError || searchIsError){
    console.log(error)
    console.log(searchError)
    return <p>error</p>
  }

  function handleSubmit(e?:React.FormEvent<HTMLFormElement>){
    if(e){
      e.preventDefault()
    }
  }

  function handleOption(e:React.MouseEvent<HTMLButtonElement>, userId:number, condition:boolean){
    e.preventDefault()
    if (isPending) return
    memberList({listId, isMember:condition, userId})
  }

  return(
    <div>
      <div className=' flex gap-4 items-center'>
        <button onClick={() => setEditPage(0)}>
          <ArrowLeft/>
        </button>
        <p>manage members</p>
      </div>
      <SectionSelector section={section} sectionClick={setSection} buttonsArray={['members', 'suggested']}/>
      <div>
        {section === 'members' ?
        isLoading ?
        Array(20).fill(0).map((_,index) => {
          return <UserIconSkeleton key={'list-members-skeleton' + listId + index}/>
        })
        :
        data?.pages.map(page => {
          if(page.results.length === 0) return <p>no members</p>
          return page.results.map((user:UserInterface) => {
            return <UserIcon key={listId + user.id!} user={user} option={{option:'list', condition:false}} handleOption={handleOption}/>
          })
        })
        :
        <>
          <SearchInput value={value} setValue={setValue} handleSubmit={handleSubmit}/>
          {searchIsLoading ?
          Array(20).fill(0).map((_, index) => {
            return <UserIconSkeleton key={'list-seatch' + listId + index}/>
          })
          :
          searchData?.pages.map(page => {
            if(page.results.users.length === 0) return <p>no results</p>
            return page.results.users.map((user:UserInterface) => {
              return <UserIcon key={listId + user.id!} user={user} option={{option:'list', condition:true}} handleOption={handleOption}/>
            })
          })
          }
        </>
        }
      </div>
  </div>
  )
}

export const ListDetails:React.FC<ComponentProps<'section'>> = () => {
  const {user} = useUserContext()
  const {listId} = useParams()
  const {mutateAsync:followList} = useFollowList()
  const {data, isLoading, isError, error} = useGetSingleList({listId:Number(listId)})
  const {data:tweets, isLoading:tweetsIsLoading, isError:tweetsIsError, error:tweetsError, fetchNextPage:TweetFetchNextPage, isFetchingNextPage:TweetIsFetchingNextPage} = useGetListTweets({listId:Number(listId)})

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [editPage, setEditPage] = useState<0 | 1>(0)

  const editListRef = useRef<HTMLDivElement>(null)

  if(isLoading) return <h1>Loading...</h1>
  if(isError) {
    console.log(error)
    return <h1>error</h1>
  }
  const list = data as List

  function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(editListRef.current){
      const a = editListRef.current?.children[0].children[2].children[1] as HTMLInputElement
      const b =editListRef.current.children[0].children[3].children[1] as HTMLInputElement
      console.log(a.value)
      console.log(b.value)
    }
  }

  function handleModalClick(e:React.MouseEvent<HTMLTableSectionElement>){
    if(e.target instanceof HTMLElement && e.target.id === 'modal-overlay')
      setIsOpen(false)
  }

  return (
    <section onClick={handleModalClick}>
        <header>header</header>
        <div className=' flex flex-col items-center'>
            <p>{list.name}</p>
            <p>{list.description}</p>
            <p>{list.list_creator.mention}</p>
            <div className='flex gap-2'>
              <div className=' flex gap-1'>
                <p>
                  members
                </p>
                <p>
                {list.members_num}
                </p>
              </div>
              <div className=' flex gap-2'>
                <p>
                  followers
                </p>
                <p>
                {list.followers_num}
                </p>
              </div>
            </div>
            {list.list_creator.id === user.id ?
            <Button onClick={() => setIsOpen(true)}>edit list</Button>
            :
            <Button onClick={() => followList({listId:list.id, isFollowed:list.is_followed})}>
              {list.is_followed ?
                'unfollow'
              :
                'follow'
              }
            </Button>
            }
        </div>
        {!(tweetsIsLoading || tweetsIsError)&&
        <InfiniteTweets data={tweets} isLoading={tweetsIsLoading} isError={tweetsIsError} error={tweetsError} fetchNextPage={TweetFetchNextPage} isFetchingNextPage={TweetIsFetchingNextPage}/>
        }
        <Modal isOpen={isOpen} className=' bg-white'>
          <div ref={editListRef}>
            {editPage === 0 ?
            <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
              <div className=' flex gap-4 items-center'>
                <button type='button' onClick={() => setIsOpen(false)}>
                  <ArrowLeft/>
                </button>
                <p>edit list</p>
                <Button className=' ml-auto' type='submit'>done</Button>
              </div>
              <div>
                header
              </div>
              <div className=' flex flex-col gap-1'>
                <label htmlFor="">name</label>
                <input type="text" defaultValue={list.name}/>
              </div>
              <div className=' flex flex-col gap-1'>
                <label htmlFor="">description</label>
                <input type="text" defaultValue={list.description}/>
              </div>
              <div className=' flex flex-col justify-center gap-1'>
                <label htmlFor="">make private</label>
                <input type="checkbox"/>
              </div>
              <button type='button' onClick={() => setEditPage(1)}>
                manage members
              </button>
              <button type='button'>
                delete list
              </button>
            </form>
            :
            editPage === 1 ?
          <ListEditMembers listId={list.id} setEditPage={setEditPage}/>
          :
          null
          }
          </div>
        </Modal>
    </section>
  )
}
