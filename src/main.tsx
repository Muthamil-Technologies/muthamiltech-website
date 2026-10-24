import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './lib/auth'
import { isJapanOne } from './lib/brand'

if (isJapanOne) {
  document.title = 'JapanOne | Gateway to Japan: learn, travel, work'
  document.querySelector('link[rel="icon"]')?.setAttribute('href', '/japanone_logo_64.png')
  const apple = document.createElement('link')
  apple.rel = 'apple-touch-icon'
  apple.href = '/japanone_logo_180.png'
  document.head.appendChild(apple)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
