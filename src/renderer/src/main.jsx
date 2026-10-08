import './assets/main.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Sidebar from './components/Sidebar'
import AdsBar from './components/AdsBar'
import Feed from './components/Feed'
import { OptionsProvider } from './components/Options'
import { applyTheme, defaultTheme } from './themes'

applyTheme(defaultTheme)



// TODO: merge div here with the root div / or even use body
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div style={{ display: "flex", height: "100dvh", alignItems: "stretch" }}>
      <OptionsProvider>
        <Sidebar />
        <Feed ></Feed>
        <AdsBar />
      </OptionsProvider>
    </div>
  </StrictMode>
)
