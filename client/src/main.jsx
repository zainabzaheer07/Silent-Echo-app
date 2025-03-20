import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LoginProvider } from './contexts/LogingContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
createRoot(document.getElementById('root')).render(

  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLEClientId}>
  <LoginProvider>
<StrictMode>
    <App />
  </StrictMode>,
  </LoginProvider>
  </GoogleOAuthProvider>
)
