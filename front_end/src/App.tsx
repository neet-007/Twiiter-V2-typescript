import { Route, Routes } from "react-router-dom"
import { SideNav } from "./components/SideNav/SideNav"
import { MainPage } from "./pages/MainPage/MainPage"
import { SearchPage } from "./pages/SearchPage/SearchPage"
import { NotificationsPage } from "./pages/NotificationsPage/NotificationsPage"
import { UserDetailsPage } from "./pages/UserDetailsPage/UserDetailsPage"
import { ListPage } from "./pages/ListPage/ListPage"

function App() {

  return (
    <main className="h-dvh">
      <SideNav/>
      <Routes>
        <Route path="" element={<MainPage/>}/>
        <Route path="search" element={<SearchPage/>}/>
        <Route path="notification" element={<NotificationsPage/>}/>
        <Route path="profile" element={<UserDetailsPage/>}/>
        <Route path="list" element={<ListPage/>}/>
      </Routes>
    </main>
  )
}

export default App
