import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { UserContextProvider } from './context/UserContext.tsx'

const queryclient = new QueryClient({defaultOptions:{
  queries:{
    refetchOnWindowFocus:false,
    staleTime:1000 * 5 * 6
}}})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryclient}>
    <BrowserRouter>
      <React.StrictMode>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </React.StrictMode>,
    </BrowserRouter>
  </QueryClientProvider>
)
