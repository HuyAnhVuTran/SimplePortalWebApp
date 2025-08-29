import { useState } from 'react'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import {AuthProvider, useAuth} from './context/AuthContext.jsx'
import Signup from '../screens/Signup.jsx'
import Login from '../screens/login.jsx'
import Forgot from '../screens/Forgot.jsx'
import EmailForgot from '../screens/EmailForgot.jsx'
import Dashboard from '../screens/Dashboard.jsx'



import './App.css'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>; // Show loading spinner
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

// function AppSetup(){
//   return (
//     <>
//     <Routes>
//       <Route index element={<Login/>} />
//       <Route path='/login' element={<Login/>} />
//       <Route path='/signup' element={<Signup/>} />
//       <Route path='/forgot' element={<Forgot/>} />
//       <Route path='/email' element={<EmailForgot/>} />


//       <Route path='/dashboard' element={<Dashboard/>} />
//     </Routes>
   

//     </>
//   )
// }

// function App() {
//   return (
//     <>
//         <AppSetup/>
//     </>
//   )
// }



function AppSetup(){
  return (
    <Routes>
      <Route index element={<PublicRoute><Login/></PublicRoute>} />
      <Route path='/login' element={<PublicRoute><Login/></PublicRoute>} />
      <Route path='/signup' element={<PublicRoute><Signup/></PublicRoute>} />
      <Route path='/forgot' element={<PublicRoute><Forgot/></PublicRoute>} />
      <Route path='/email' element={<PublicRoute><EmailForgot/></PublicRoute>} />

      <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      
        <AppSetup/>
      
    </AuthProvider>
  )
}

export default App
