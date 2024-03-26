import { Route, Routes } from "react-router-dom"
import { SideNav } from "./components/SideNav/SideNav"
import { MainPage } from "./pages/MainPage/MainPage"
import { SearchPage } from "./pages/SearchPage/SearchPage"
import { NotificationsPage } from "./pages/NotificationsPage/NotificationsPage"
import { UserDetailsPage } from "./pages/UserDetailsPage/UserDetailsPage"
import { ListPage } from "./pages/ListPage/ListPage"
import { Register } from "./pages/Auth/Register/Register"
import { Login } from "./pages/Auth/Login/Login"
import { MakeProfile } from "./pages/Auth/MakeProfile/MakeProfile"
import { BottomBar } from "./components/Mobile/BottomBar"
import { PostPage } from "./pages/PostPage/PostPage"
import { ListDetails } from "./pages/ListPage/ListDetails"
import { SearchBar } from "./components/SearchBar/SearchBar"
import { SideNav as MobileSideNav } from "./components/Mobile/SideNav"
import React, { useState } from "react"
import { Header } from "./components/Mobile/Header"
import { BookmarkPage } from "./pages/BookmarkPage/BookmarkPage"
function App() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false)

  function handleMobileSideNav(e:React.MouseEvent<HTMLElement>){
    const E = e.target as HTMLElement
    if(E.id === 'mobile-side-nav') setIsMobileNavOpen(false)
  }

  return (
    <div className=" flex relative" onClick={handleMobileSideNav}>
      <Header setIsMobileNavOpen={setIsMobileNavOpen}/>
      <MobileSideNav isOpen={isMobileNavOpen}/>
      <SideNav className="fixed hidden sm:flex"/>
      <main className="h-dvh relative ml-[0%] sm:ml-[20%] w-full lg:w-[50%]">
        <Routes>
          <Route path="" element={<MainPage/>}/>
          <Route path="search" element={<SearchPage/>}/>
          <Route path="notification" element={<NotificationsPage/>}/>
          <Route path="profile/:userMention" element={<UserDetailsPage/>}/>
          <Route path="lists" element={<ListPage/>}/>
          <Route path="bookmarks" element={<BookmarkPage/>}/>
          <Route path="list/:listId" element={<ListDetails/>}/>
          <Route path="post/:tweetId" element={<PostPage/>}/>
            <Route path="auth/register" element={<Register/>}/>
            <Route path="auth/login" element={<Login/>}/>
            <Route path="auth/make-profile" element={<MakeProfile/>}/>
        </Routes>
        <BottomBar className=" flex sm:hidden"/>
      </main>
      <SearchBar className=" left-[72%] fixed right-0 hidden lg:flex"/>
    </div>
  )
}

export default App
