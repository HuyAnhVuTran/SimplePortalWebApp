import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import Signup from '../screens/Signup.jsx'
import Login from '../screens/login.jsx'
import Forgot from '../screens/Forgot.jsx'

import EmailForgot from '../screens/EmailForgot.jsx'
import Dashboard from '../screens/Dashboard.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //  <MainScreen /> 
  // <App />
  // </StrictMode>,

  <StrictMode>
    <BrowserRouter>
    <App/>

    </BrowserRouter>
    

  </StrictMode>,
  
)
