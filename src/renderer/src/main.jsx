import './assets/main.css'
import electronLogo from './assets/electron.svg'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Post from './components/Post'
import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import App from './App'

// TODO: merge div here with the root div / or even use body
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div style={{display:"flex",height:"100dvh",alignItems:"stretch"}}>
      <Sidebar/>
      <Feed></Feed>
    </div>
  </StrictMode>
)
