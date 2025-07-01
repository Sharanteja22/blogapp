import React from 'react'
import Header from './common/Header.jsx'
import Footer from './common/Footer.jsx'
import { Outlet } from 'react-router-dom'
import {ClerkProvider} from '@clerk/clerk-react'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}


function RootLayout() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
        <Header />
        <div  style={{
            flex: 1,
            display: 'flex',          
            justifyContent: 'center', 
            alignItems: 'center'  
          }}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </ClerkProvider>
  )
}

export default RootLayout