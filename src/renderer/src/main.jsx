import './assets/main.css'
import electronLogo from './assets/electron.svg'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Post from './components/Post'
import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
      <Sidebar></Sidebar>
      <Feed></Feed>
      <Sidebar></Sidebar>
    </div>
  </StrictMode>
)
