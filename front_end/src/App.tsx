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

function App() {

  return (
    <div className=" flex relative">
      <SideNav className="fixed"/>
      <main className="h-dvh relative ml-[20%]">
        <Routes>
          <Route path="" element={<MainPage/>}/>
          <Route path="search" element={<SearchPage/>}/>
          <Route path="notification" element={<NotificationsPage/>}/>
          <Route path="profile/:userId" element={<UserDetailsPage/>}/>
          <Route path="lists" element={<ListPage/>}/>
          <Route path="list/:listId" element={<ListDetails/>}/>
          <Route path="post/:tweetId" element={<PostPage/>}/>
            <Route path="auth/register" element={<Register/>}/>
            <Route path="auth/login" element={<Login/>}/>
            <Route path="auth/make-profile" element={<MakeProfile/>}/>
        </Routes>
        {/*<BottomBar/>*/}
      </main>
      <SearchBar className=" left-[72%] fixed right-0 hidden lg:flex"/>
    </div>
  )
}

export default App
