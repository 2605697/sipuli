import './assets/main.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Sidebar from './components/Sidebar'
import AdsBar from './components/AdsBar'
import Feed from './components/Feed'
import { OptionsProvider } from './components/Options'
import { PostsProvider } from './components/PostsProvider'
import { applyTheme, defaultTheme } from './themes'

applyTheme(defaultTheme)

// TODO: merge div here with the root div / or even use body
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div style={{ display: "flex", justifyContent: "space-between", width: "100vw", height: "100dvh", alignItems: "stretch" }}>
      <OptionsProvider>
        <PostsProvider>
          <Sidebar />
          <Feed />
          <AdsBar />
        </PostsProvider>
      </OptionsProvider>
    </div>
  </StrictMode>
)

